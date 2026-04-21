"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import {
  canAccessPlatformConsole,
  getConsoleAuth,
  ROLE_PLATFORM_ADMIN,
  ROLE_PLATFORM_USER,
  ROLE_SCOPE_ADMIN,
  ROLE_SCOPE_VISITOR,
} from "@/server/admin-auth";
import { normalizeMobile } from "@/server/phone-password-auth";

function redirectForbidden() {
  redirect("/admin/portal?error=forbidden");
}

async function requirePlatformConsoleAuth() {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirectForbidden();
  return auth;
}

export async function updatePlatformUserRoleAction(formData: FormData): Promise<void> {
  await requirePlatformConsoleAuth();

  const userId = String(formData.get("user_id") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const back =
    String(formData.get("back") ?? "").trim() || `/admin/platform/users/${userId}/edit`;

  if (!userId || (role !== ROLE_PLATFORM_ADMIN && role !== ROLE_PLATFORM_USER)) {
    redirect(`${back}?error=invalid`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateUserRole($id: bigint!, $role: String!) {
        update_users_by_pk(pk_columns: { id: $id }, _set: { role: $role }) {
          id
        }
      }
    `,
      { id: userId, role }
    );
  } catch {
    redirect(`${back}?error=update`);
  }

  revalidatePath("/admin/platform/users");
  revalidatePath(`/admin/platform/users/${userId}/edit`);
  redirect(`${back}?ok=1`);
}

export async function addCampusAdminByMobileAction(formData: FormData): Promise<void> {
  await requirePlatformConsoleAuth();

  const campusId = String(formData.get("campus_id") ?? "").trim();
  const mobileRaw = String(formData.get("mobile") ?? "");
  const mobile = normalizeMobile(mobileRaw);
  const base = `/admin/platform/campuses/${campusId}/admins`;

  if (!campusId || !mobile) {
    redirect(`${base}?error=invalid`);
  }

  const { users } = await adminGraphqlExecute<{
    users: Array<{ id: string }>;
  }>(
    `
    query UserByMobile($mobile: String!) {
      users(where: { mobile: { _eq: $mobile } }, limit: 1) {
        id
      }
    }
  `,
    { mobile }
  );

  const u = users[0];
  if (!u) {
    redirect(`${base}?error=not_found`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpsertCampusAdmin($campus: bigint!, $user: bigint!, $role: String!) {
        insert_campus_users_one(
          object: {
            campus_campuses: $campus
            user_users: $user
            role: $role
          }
          on_conflict: {
            constraint: campus_users_campus_campuses_user_users_key
            update_columns: [role]
          }
        ) {
          id
        }
      }
    `,
      { campus: campusId, user: u.id, role: ROLE_SCOPE_ADMIN }
    );
  } catch {
    redirect(`${base}?error=save`);
  }

  revalidatePath(base);
  revalidatePath("/admin/platform/campuses");
  redirect(`${base}?ok=1`);
}

export async function updateCampusUserRoleAction(formData: FormData): Promise<void> {
  await requirePlatformConsoleAuth();

  const rowId = String(formData.get("campus_user_id") ?? "").trim();
  const campusId = String(formData.get("campus_id") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const base = `/admin/platform/campuses/${campusId}/admins`;

  if (!rowId || !campusId || (role !== ROLE_SCOPE_ADMIN && role !== ROLE_SCOPE_VISITOR)) {
    redirect(`${base}?error=invalid`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateCampusUser($id: bigint!, $role: String!) {
        update_campus_users_by_pk(pk_columns: { id: $id }, _set: { role: $role }) {
          id
        }
      }
    `,
      { id: rowId, role }
    );
  } catch {
    redirect(`${base}?error=update`);
  }

  revalidatePath(base);
  redirect(`${base}?ok=1`);
}

export async function removeCampusUserAction(formData: FormData): Promise<void> {
  await requirePlatformConsoleAuth();

  const rowId = String(formData.get("campus_user_id") ?? "").trim();
  const campusId = String(formData.get("campus_id") ?? "").trim();
  const base = `/admin/platform/campuses/${campusId}/admins`;

  if (!rowId || !campusId) {
    redirect(`${base}?error=invalid`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation RemoveCampusUser($id: bigint!) {
        delete_campus_users_by_pk(id: $id) {
          id
        }
      }
    `,
      { id: rowId }
    );
  } catch {
    redirect(`${base}?error=delete`);
  }

  revalidatePath(base);
  redirect(`${base}?ok=1`);
}

export async function addShopAdminByMobileAction(formData: FormData): Promise<void> {
  await requirePlatformConsoleAuth();

  const shopId = String(formData.get("shop_id") ?? "").trim();
  const mobileRaw = String(formData.get("mobile") ?? "");
  const mobile = normalizeMobile(mobileRaw);
  const base = `/admin/platform/shops/${shopId}/admins`;

  if (!shopId || !mobile) {
    redirect(`${base}?error=invalid`);
  }

  const { users } = await adminGraphqlExecute<{
    users: Array<{ id: string }>;
  }>(
    `
    query UserByMobile($mobile: String!) {
      users(where: { mobile: { _eq: $mobile } }, limit: 1) {
        id
      }
    }
  `,
    { mobile }
  );

  const u = users[0];
  if (!u) {
    redirect(`${base}?error=not_found`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpsertShopAdmin($shop: bigint!, $user: bigint!, $role: String!) {
        insert_shop_users_one(
          object: {
            shop_shops: $shop
            user_users: $user
            role: $role
          }
          on_conflict: {
            constraint: shop_users_shop_shops_user_users_key
            update_columns: [role]
          }
        ) {
          id
        }
      }
    `,
      { shop: shopId, user: u.id, role: ROLE_SCOPE_ADMIN }
    );
  } catch {
    redirect(`${base}?error=save`);
  }

  revalidatePath(base);
  revalidatePath("/admin/platform/shops");
  redirect(`${base}?ok=1`);
}

export async function updateShopUserRoleAction(formData: FormData): Promise<void> {
  await requirePlatformConsoleAuth();

  const rowId = String(formData.get("shop_user_id") ?? "").trim();
  const shopId = String(formData.get("shop_id") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const base = `/admin/platform/shops/${shopId}/admins`;

  if (!rowId || !shopId || (role !== ROLE_SCOPE_ADMIN && role !== ROLE_SCOPE_VISITOR)) {
    redirect(`${base}?error=invalid`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateShopUser($id: bigint!, $role: String!) {
        update_shop_users_by_pk(pk_columns: { id: $id }, _set: { role: $role }) {
          id
        }
      }
    `,
      { id: rowId, role }
    );
  } catch {
    redirect(`${base}?error=update`);
  }

  revalidatePath(base);
  redirect(`${base}?ok=1`);
}

export async function removeShopUserAction(formData: FormData): Promise<void> {
  await requirePlatformConsoleAuth();

  const rowId = String(formData.get("shop_user_id") ?? "").trim();
  const shopId = String(formData.get("shop_id") ?? "").trim();
  const base = `/admin/platform/shops/${shopId}/admins`;

  if (!rowId || !shopId) {
    redirect(`${base}?error=invalid`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation RemoveShopUser($id: bigint!) {
        delete_shop_users_by_pk(id: $id) {
          id
        }
      }
    `,
      { id: rowId }
    );
  } catch {
    redirect(`${base}?error=delete`);
  }

  revalidatePath(base);
  redirect(`${base}?ok=1`);
}
