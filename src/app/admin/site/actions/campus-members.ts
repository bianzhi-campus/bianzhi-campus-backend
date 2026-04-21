"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import {
  canWriteCampus,
  getConsoleAuth,
  type ConsoleAuth,
  ROLE_SCOPE_ADMIN,
  ROLE_SCOPE_VISITOR,
} from "@/server/admin-auth";
import { normalizeMobile } from "@/server/phone-password-auth";

const MEMBERS_PATH = "/admin/site/members";

function redirectForbidden() {
  redirect("/admin/portal?error=forbidden");
}

async function requireCampusManage(auth: ConsoleAuth, campusId: string): Promise<void> {
  if (auth.mode === "legacy_full") return;
  if (auth.mode === "jwt" && canWriteCampus(auth.access, campusId)) return;
  redirectForbidden();
}

async function requireAuth(): Promise<ConsoleAuth> {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  return auth;
}

/** 按手机号加入或更新本校成员（admin / visitor） */
export async function addSiteCampusMemberByMobileAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  const campusId = String(formData.get("campus_id") ?? "").trim();
  const mobileRaw = String(formData.get("mobile") ?? "");
  const mobile = normalizeMobile(mobileRaw);
  const roleRaw = String(formData.get("role") ?? "").trim();
  const role =
    roleRaw === ROLE_SCOPE_ADMIN || roleRaw === ROLE_SCOPE_VISITOR ? roleRaw : ROLE_SCOPE_VISITOR;

  if (!campusId) {
    redirect(`${MEMBERS_PATH}?error=invalid`);
  }
  await requireCampusManage(auth, campusId);
  if (!mobile) {
    redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&error=invalid`);
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
    redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&error=not_found`);
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpsertCampusMember($campus: bigint!, $user: bigint!, $role: String!) {
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
      { campus: campusId, user: u.id, role }
    );
  } catch {
    redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&error=save`);
  }

  revalidatePath(MEMBERS_PATH);
  revalidatePath(`/admin/platform/campuses/${campusId}/admins`);
  redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&ok=1`);
}

export async function updateSiteCampusUserRoleAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const rowId = String(formData.get("campus_user_id") ?? "").trim();
  const campusId = String(formData.get("campus_id") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();

  await requireCampusManage(auth, campusId);

  if (!rowId || !campusId || (role !== ROLE_SCOPE_ADMIN && role !== ROLE_SCOPE_VISITOR)) {
    redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&error=invalid`);
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
    redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&error=update`);
  }

  revalidatePath(MEMBERS_PATH);
  revalidatePath(`/admin/platform/campuses/${campusId}/admins`);
  redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&ok=1`);
}

export async function removeSiteCampusUserAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();

  const rowId = String(formData.get("campus_user_id") ?? "").trim();
  const campusId = String(formData.get("campus_id") ?? "").trim();

  await requireCampusManage(auth, campusId);

  if (!rowId || !campusId) {
    redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&error=invalid`);
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
    redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&error=delete`);
  }

  revalidatePath(MEMBERS_PATH);
  revalidatePath(`/admin/platform/campuses/${campusId}/admins`);
  redirect(`${MEMBERS_PATH}?campusId=${encodeURIComponent(campusId)}&ok=1`);
}
