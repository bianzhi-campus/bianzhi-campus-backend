"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import {
  ADMIN_ACTIVE_CAMPUS_COOKIE,
  ADMIN_ACTIVE_SHOP_COOKIE,
} from "@/server/admin-console-scope";
import { getConsoleAuth } from "@/server/admin-auth";

const SCOPE_COOKIE_MAX_AGE = 7 * 24 * 3600;

function scopeCookieOptions() {
  return {
    /** 与 JWT 一致用 `/`，以便将来同一 Cookie 被 `/api/admin/*` 读取 */
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: SCOPE_COOKIE_MAX_AGE,
  };
}

async function persistDefaultCampus(userId: string, campusId: string): Promise<void> {
  await adminGraphqlExecute<{
    update_users_by_pk: { id: string } | null;
  }>(
    `
    mutation SetUserDefaultCampus($id: bigint!, $cid: bigint!) {
      update_users_by_pk(pk_columns: { id: $id }, _set: { default_campus_id: $cid }) {
        id
      }
    }
  `,
    { id: userId, cid: campusId }
  );
}

async function persistDefaultShop(userId: string, shopId: string): Promise<void> {
  await adminGraphqlExecute<{
    update_users_by_pk: { id: string } | null;
  }>(
    `
    mutation SetUserDefaultShop($id: bigint!, $sid: bigint!) {
      update_users_by_pk(pk_columns: { id: $id }, _set: { default_shop_id: $sid }) {
        id
      }
    }
  `,
    { id: userId, sid: shopId }
  );
}

/** 从门户、选择页或侧栏进入/切换站点后台当前学校 */
export async function enterSiteCampusAction(formData: FormData): Promise<void> {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");

  const campusId = String(formData.get("campus_id") ?? "").trim();
  if (!campusId) redirect("/admin/site/scope-pick?error=invalid");

  if (
    auth.mode === "jwt" &&
    !auth.access.campusAdminIds.some((id) => String(id).trim() === String(campusId).trim())
  ) {
    redirect("/admin/portal?error=forbidden");
  }

  const setAsDefault = formData.get("set_as_default") === "on";

  const store = await cookies();
  store.set(ADMIN_ACTIVE_CAMPUS_COOKIE, campusId, scopeCookieOptions());

  if (auth.mode === "jwt" && setAsDefault) {
    try {
      await persistDefaultCampus(auth.access.userId, campusId);
    } catch {
      /* GraphQL 权限不足时仍完成 Cookie 切换 */
    }
  }

  redirect("/admin/site");
}

/** 在站点后台侧栏切换当前学校 */
export async function switchSiteCampusAction(formData: FormData): Promise<void> {
  await enterSiteCampusAction(formData);
}

/** 从门户、选择页或侧栏进入/切换店铺后台当前店铺 */
export async function enterShopScopeAction(formData: FormData): Promise<void> {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");

  const shopId = String(formData.get("shop_id") ?? "").trim();
  if (!shopId) redirect("/admin/shop/scope-pick?error=invalid");

  if (
    auth.mode === "jwt" &&
    !auth.access.shopAdminIds.some((id) => String(id).trim() === String(shopId).trim())
  ) {
    redirect("/admin/portal?error=forbidden");
  }

  const setAsDefault = formData.get("set_as_default") === "on";

  const store = await cookies();
  store.set(ADMIN_ACTIVE_SHOP_COOKIE, shopId, scopeCookieOptions());

  if (auth.mode === "jwt" && setAsDefault) {
    try {
      await persistDefaultShop(auth.access.userId, shopId);
    } catch {
      /* GraphQL 权限不足时仍完成 Cookie 切换 */
    }
  }

  redirect("/admin/shop");
}

export async function switchShopScopeAction(formData: FormData): Promise<void> {
  await enterShopScopeAction(formData);
}
