"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import {
  canWriteCampus,
  getConsoleAuth,
  type ConsoleAuth,
} from "@/server/admin-auth";

function redirectForbidden() {
  redirect("/admin/portal?error=forbidden");
}

async function requireAuth(): Promise<ConsoleAuth> {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  return auth;
}

function assertPlatformOnly(auth: ConsoleAuth): void {
  if (auth.mode === "legacy_full") return;
  if (auth.access.isPlatformAdmin) return;
  redirectForbidden();
}

function assertCampusWrite(auth: ConsoleAuth, campusId: string): void {
  if (auth.mode === "legacy_full") return;
  if (canWriteCampus(auth.access, campusId)) return;
  redirectForbidden();
}

/** Hasura bigint：非负整数字符串，非法则 0 */
function parseSortOrderBigint(raw: unknown): string {
  const t = String(raw ?? "").trim();
  if (!t) return "0";
  if (!/^\d+$/.test(t)) return "0";
  return t;
}

/** 表单可选 `_ctx=platform`，用于平台后台与站点后台共用同一 action 时的跳转与提示路径 */
function campusPathsFromForm(formData: FormData): { list: string; newPage: string } {
  const platform = String(formData.get("_ctx") ?? "").trim() === "platform";
  return platform
    ? { list: "/admin/platform/campuses", newPage: "/admin/platform/campuses/new" }
    : { list: "/admin/site", newPage: "/admin/site" };
}

async function campusIdOfBuilding(buildingId: string): Promise<string | null> {
  const { buildings_by_pk } = await adminGraphqlExecute<{
    buildings_by_pk: { campus_campuses: string } | null;
  }>(
    `
    query B($id: bigint!) {
      buildings_by_pk(id: $id) {
        campus_campuses
      }
    }
  `,
    { id: buildingId }
  );
  return buildings_by_pk?.campus_campuses ?? null;
}

async function campusIdOfRoom(roomId: string): Promise<string | null> {
  const { building_rooms_by_pk } = await adminGraphqlExecute<{
    building_rooms_by_pk: { building_buildings: string } | null;
  }>(
    `
    query R($id: bigint!) {
      building_rooms_by_pk(id: $id) {
        building_buildings
      }
    }
  `,
    { id: roomId }
  );
  const bid = building_rooms_by_pk?.building_buildings;
  if (!bid) return null;
  return campusIdOfBuilding(bid);
}

export async function createCampusAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  assertPlatformOnly(auth);

  const paths = campusPathsFromForm(formData);
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    redirect(`${paths.newPage}?error=name`);
  }
  const province = String(formData.get("province") ?? "").trim() || null;
  const city = String(formData.get("city") ?? "").trim() || null;
  const district = String(formData.get("district") ?? "").trim() || null;

  await adminGraphqlExecute<{
    insert_campuses_one: { id: string } | null;
  }>(
    `
    mutation InsertCampus($object: campuses_insert_input!) {
      insert_campuses_one(object: $object) {
        id
      }
    }
  `,
    {
      object: {
        name,
        province,
        city,
        district,
      },
    }
  );

  revalidatePath("/admin/site");
  revalidatePath("/admin/site/members");
  revalidatePath("/admin/platform/campuses");
  redirect(paths.list);
}

export async function updateCampusAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const paths = campusPathsFromForm(formData);
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) {
    redirect(`${paths.list}?error=invalid`);
  }
  if (auth.mode !== "legacy_full" && !auth.access.isPlatformAdmin) {
    assertCampusWrite(auth, id);
  }

  const province = String(formData.get("province") ?? "").trim() || null;
  const city = String(formData.get("city") ?? "").trim() || null;
  const district = String(formData.get("district") ?? "").trim() || null;

  await adminGraphqlExecute(
    `
    mutation UpdateCampus($id: bigint!, $set: campuses_set_input!) {
      update_campuses_by_pk(pk_columns: { id: $id }, _set: $set) {
        id
      }
    }
  `,
    {
      id,
      set: { name, province, city, district },
    }
  );

  revalidatePath("/admin/site");
  revalidatePath("/admin/site/members");
  revalidatePath("/admin/platform/campuses");
  redirect(paths.list);
}

export async function deleteCampusAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  assertPlatformOnly(auth);

  const paths = campusPathsFromForm(formData);
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await adminGraphqlExecute(
      `
      mutation DeleteCampus($id: bigint!) {
        delete_campuses_by_pk(id: $id) {
          id
        }
      }
    `,
      { id }
    );
  } catch {
    redirect(`${paths.list}?error=delete`);
  }

  revalidatePath("/admin/site");
  revalidatePath("/admin/site/members");
  revalidatePath("/admin/platform/campuses");
  redirect(paths.list);
}

export async function createBuildingAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  const campus_campuses = String(formData.get("campus_campuses") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim() || null;
  const zone = String(formData.get("zone") ?? "").trim() || null;
  if (!campus_campuses) {
    redirect("/admin/site/buildings/new?error=campus");
  }
  if (!name) {
    redirect("/admin/site/buildings/new?error=name");
  }
  assertCampusWrite(auth, campus_campuses);

  const sort_order = parseSortOrderBigint(formData.get("sort_order"));

  try {
    await adminGraphqlExecute(
      `
      mutation InsertBuilding($object: buildings_insert_input!) {
        insert_buildings_one(object: $object) {
          id
        }
      }
    `,
      {
        object: {
          campus_campuses,
          name,
          type,
          zone,
          sort_order,
        },
      }
    );
  } catch {
    redirect("/admin/site/buildings/new?error=dup");
  }

  revalidatePath("/admin/site/buildings");
  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}

export async function updateBuildingAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!id || !name) {
    redirect("/admin/site/org?error=invalid");
  }

  const oldCampus = await campusIdOfBuilding(id);
  if (!oldCampus) {
    redirect("/admin/site/org?error=invalid");
  }
  assertCampusWrite(auth, oldCampus);

  const type = String(formData.get("type") ?? "").trim() || null;
  const zone = String(formData.get("zone") ?? "").trim() || null;
  const sort_order = parseSortOrderBigint(formData.get("sort_order"));

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateBuilding($id: bigint!, $set: buildings_set_input!) {
        update_buildings_by_pk(pk_columns: { id: $id }, _set: $set) {
          id
        }
      }
    `,
      {
        id,
        set: { name, type, zone, sort_order },
      }
    );
  } catch {
    redirect(`/admin/site/buildings/${id}/edit?error=dup`);
  }

  revalidatePath("/admin/site/buildings");
  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}

export async function deleteBuildingAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const cid = await campusIdOfBuilding(id);
  if (cid) assertCampusWrite(auth, cid);

  try {
    await adminGraphqlExecute(
      `
      mutation DeleteBuilding($id: bigint!) {
        delete_buildings_by_pk(id: $id) {
          id
        }
      }
    `,
      { id }
    );
  } catch {
    redirect("/admin/site/org?error=delete");
  }

  revalidatePath("/admin/site/buildings");
  revalidatePath("/admin/site/rooms");
  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}

export async function createRoomAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const building_buildings = String(formData.get("building_buildings") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const floorRaw = String(formData.get("floor_number") ?? "").trim();
  const floor_number = floorRaw === "" ? 0 : parseInt(floorRaw, 10);
  const zone = String(formData.get("zone") ?? "").trim() || null;
  const sort_order = parseSortOrderBigint(formData.get("sort_order"));

  if (!building_buildings || !name || Number.isNaN(floor_number)) {
    const q = building_buildings
      ? `&buildingId=${encodeURIComponent(building_buildings)}`
      : "";
    redirect(`/admin/site/rooms/new?error=invalid${q}`);
  }

  const cid = await campusIdOfBuilding(building_buildings);
  if (cid) assertCampusWrite(auth, cid);

  try {
    await adminGraphqlExecute(
      `
      mutation InsertRoom($object: building_rooms_insert_input!) {
        insert_building_rooms_one(object: $object) {
          id
        }
      }
    `,
      {
        object: {
          building_buildings,
          name,
          floor_number,
          zone,
          sort_order,
        },
      }
    );
  } catch {
    redirect(
      `/admin/site/rooms/new?error=dup&buildingId=${encodeURIComponent(building_buildings)}`
    );
  }

  revalidatePath("/admin/site/rooms");
  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}

export async function updateRoomAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  const building_buildings = String(formData.get("building_buildings") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const floorRaw = String(formData.get("floor_number") ?? "").trim();
  const floor_number = floorRaw === "" ? 0 : parseInt(floorRaw, 10);
  const zone = String(formData.get("zone") ?? "").trim() || null;
  const sort_order = parseSortOrderBigint(formData.get("sort_order"));

  if (!id || !building_buildings || !name || Number.isNaN(floor_number)) {
    redirect("/admin/site/org?error=invalid");
  }

  const oldCid = await campusIdOfRoom(id);
  const newCid = await campusIdOfBuilding(building_buildings);
  if (oldCid) assertCampusWrite(auth, oldCid);
  if (newCid) assertCampusWrite(auth, newCid);

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateRoom($id: bigint!, $set: building_rooms_set_input!) {
        update_building_rooms_by_pk(pk_columns: { id: $id }, _set: $set) {
          id
        }
      }
    `,
      {
        id,
        set: {
          building_buildings,
          name,
          floor_number,
          zone,
          sort_order,
        },
      }
    );
  } catch {
    redirect(`/admin/site/rooms/${id}/edit?error=update`);
  }

  revalidatePath("/admin/site/rooms");
  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}

/** 组织结构页：仅更新楼栋排序 */
export async function updateBuildingSortOrderAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  const sort_order = parseSortOrderBigint(formData.get("sort_order"));
  if (!id) {
    redirect("/admin/site/org");
  }
  const cid = await campusIdOfBuilding(id);
  if (cid) assertCampusWrite(auth, cid);

  await adminGraphqlExecute(
    `
    mutation UpdateBuildingSort($id: bigint!, $sort: bigint!) {
      update_buildings_by_pk(pk_columns: { id: $id }, _set: { sort_order: $sort }) {
        id
      }
    }
  `,
    { id, sort: sort_order }
  );

  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}

/** 组织结构页：仅更新房间排序 */
export async function updateRoomSortOrderAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  const id = String(formData.get("id") ?? "").trim();
  const sort_order = parseSortOrderBigint(formData.get("sort_order"));
  if (!id) {
    redirect("/admin/site/org");
  }
  const cid = await campusIdOfRoom(id);
  if (cid) assertCampusWrite(auth, cid);

  await adminGraphqlExecute(
    `
    mutation UpdateRoomSort($id: bigint!, $sort: bigint!) {
      update_building_rooms_by_pk(pk_columns: { id: $id }, _set: { sort_order: $sort }) {
        id
      }
    }
  `,
    { id, sort: sort_order }
  );

  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}

export async function deleteRoomAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const cid = await campusIdOfRoom(id);
  if (cid) assertCampusWrite(auth, cid);

  await adminGraphqlExecute(
    `
    mutation DeleteRoom($id: bigint!) {
      delete_building_rooms_by_pk(id: $id) {
        id
      }
    }
  `,
    { id }
  );

  revalidatePath("/admin/site/rooms");
  revalidatePath("/admin/site/org");
  redirect("/admin/site/org");
}
