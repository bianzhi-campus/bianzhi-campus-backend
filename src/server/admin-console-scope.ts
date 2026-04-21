import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { ConsoleAuth } from "@/server/admin-auth";

/** 多校管理员进入站点后台时，当前正在管理的学校（会话级，优先于用户表 default） */
export const ADMIN_ACTIVE_CAMPUS_COOKIE = "admin_active_campus";

/** 多店管理员进入店铺后台时，当前正在管理的店铺 */
export const ADMIN_ACTIVE_SHOP_COOKIE = "admin_active_shop";

export type ResolvedSiteScope =
  | { kind: "full" }
  | { kind: "scoped"; campusIds: string[] }
  /** 多校且未设置会话 Cookie、用户表也无可用默认时需先选择 */
  | { kind: "need_campus_pick"; campusIds: string[] };

export type ResolvedShopScope =
  | { kind: "full" }
  | { kind: "scoped"; shopIds: string[] }
  | { kind: "need_shop_pick"; shopIds: string[] };

export type ScopeRedirect = { redirect: string };

function idInScopeList(ids: string[], value: string | undefined | null): boolean {
  if (value == null || value === "") return false;
  const n = String(value).trim();
  return ids.some((id) => String(id).trim() === n);
}

/**
 * 站点后台数据范围：仅开发会话可看全量；JWT 一律按 campus_users（admin）过滤。
 * 多校时：Cookie > users.default_campus_id（须在可管列表内）> 需先选择。
 */
export async function resolveSiteScope(auth: ConsoleAuth): Promise<ResolvedSiteScope | ScopeRedirect> {
  if (auth.mode === "legacy_full") return { kind: "full" };

  const ids = auth.mode === "jwt" ? auth.access.campusAdminIds : [];
  if (ids.length === 0) return { redirect: "/admin/portal?error=forbidden" };
  if (ids.length === 1) return { kind: "scoped", campusIds: ids };

  const raw = (await cookies()).get(ADMIN_ACTIVE_CAMPUS_COOKIE)?.value;
  if (raw && idInScopeList(ids, raw)) return { kind: "scoped", campusIds: [String(raw).trim()] };

  const def = auth.mode === "jwt" ? auth.access.defaultCampusId : null;
  if (def && idInScopeList(ids, def)) return { kind: "scoped", campusIds: [String(def).trim()] };

  return { kind: "need_campus_pick", campusIds: ids };
}

/**
 * 店铺后台：多店时 Cookie > users.default_shop_id > 需先选择。
 */
export async function resolveShopScope(auth: ConsoleAuth): Promise<ResolvedShopScope | ScopeRedirect> {
  if (auth.mode === "legacy_full") return { kind: "full" };

  const ids = auth.mode === "jwt" ? auth.access.shopAdminIds : [];
  if (ids.length === 0) return { redirect: "/admin/portal?error=forbidden" };
  if (ids.length === 1) return { kind: "scoped", shopIds: ids };

  const raw = (await cookies()).get(ADMIN_ACTIVE_SHOP_COOKIE)?.value;
  if (raw && idInScopeList(ids, raw)) return { kind: "scoped", shopIds: [String(raw).trim()] };

  const def = auth.mode === "jwt" ? auth.access.defaultShopId : null;
  if (def && idInScopeList(ids, def)) return { kind: "scoped", shopIds: [String(def).trim()] };

  return { kind: "need_shop_pick", shopIds: ids };
}

export type ActiveSiteScope = Exclude<ResolvedSiteScope, { kind: "need_campus_pick" }>;

/** 业务页使用：已解析为 full / scoped，否则重定向到选择页 */
export async function resolveSiteScopeForWorkspace(auth: ConsoleAuth): Promise<ActiveSiteScope> {
  const s = await resolveSiteScope(auth);
  if ("redirect" in s) redirect(s.redirect);
  if (s.kind === "need_campus_pick") redirect("/admin/site/scope-pick");
  return s;
}

export type ActiveShopScope = Exclude<ResolvedShopScope, { kind: "need_shop_pick" }>;

export async function resolveShopScopeForWorkspace(auth: ConsoleAuth): Promise<ActiveShopScope> {
  const s = await resolveShopScope(auth);
  if ("redirect" in s) redirect(s.redirect);
  if (s.kind === "need_shop_pick") redirect("/admin/shop/scope-pick");
  return s;
}
