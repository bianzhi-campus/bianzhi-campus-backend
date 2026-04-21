import "server-only";

import { cookies } from "next/headers";

import { HasuraJwtToken, type HasuraJwtPayload } from "@/config-lib/hasura/HasuraJwtToken";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { ADMIN_SESSION_COOKIE, verifyAdminCookie } from "@/server/admin-session";

/** Cookie 中存放用户 Hasura JWT（与小程序等登录同一套 token） */
export const ADMIN_JWT_COOKIE = "zd_auth_token";

/**
 * 角色字面量与 `graphql/schema.graphql` 中表注释一致：
 * - users.role：「1、admin（平台管理员）2、user（普通用户）」
 * - campus_users.role：「1、admin（学校管理员，有全部权限）2、visitor（学校的用户）」
 * - shop_users.role：「1、admin（管理员） 2、visitor（访问用户）」
 * 后台入口仅统计 scope 表中 role === admin 的关联。
 */
export const ROLE_PLATFORM_ADMIN = "admin";
export const ROLE_PLATFORM_USER = "user";
export const ROLE_SCOPE_ADMIN = "admin";
/** 学校/店铺侧普通成员，不授予后台管理能力 */
export const ROLE_SCOPE_VISITOR = "visitor";

function isUsersTablePlatformAdmin(role: string): boolean {
  return role.trim() === ROLE_PLATFORM_ADMIN;
}

function isScopeTableAdminRole(role: string): boolean {
  return role.trim() === ROLE_SCOPE_ADMIN;
}

export type AdminAccess = {
  userId: string;
  nickname: string | null;
  isPlatformAdmin: boolean;
  /** 担任「学校管理员」的学校 id */
  campusAdminIds: string[];
  /** 担任「店铺管理员」的店铺 id */
  shopAdminIds: string[];
  /** 用户表偏好：多校时登录站点后台的默认学校 */
  defaultCampusId: string | null;
  /** 用户表偏好：多店时登录店铺后台的默认店铺 */
  defaultShopId: string | null;
};

function userIdFromPayload(payload: HasuraJwtPayload): string | null {
  const claims = payload["https://hasura.io/jwt/claims"];
  const fromClaims = claims?.["x-hasura-user-id"];
  if (fromClaims != null && String(fromClaims).length > 0) return String(fromClaims);
  if (payload.userId != null && String(payload.userId).length > 0) return String(payload.userId);
  return null;
}

async function fetchUserAccess(userId: string): Promise<AdminAccess | null> {
  const { users_by_pk: user } = await adminGraphqlExecute<{
    users_by_pk: {
      id: string;
      nickname: string | null;
      role: string;
      default_campus_id: string | null;
      default_shop_id: string | null;
      campus_users: Array<{ campus_campuses: string; role: string }>;
      shop_users: Array<{ shop_shops: string; role: string }>;
    } | null;
  }>(
    `
    query AdminAccessUser($id: bigint!) {
      users_by_pk(id: $id) {
        id
        nickname
        role
        default_campus_id
        default_shop_id
        campus_users {
          campus_campuses
          role
        }
        shop_users {
          shop_shops
          role
        }
      }
    }
  `,
    { id: userId }
  );

  if (!user) return null;

  const isPlatformAdmin = isUsersTablePlatformAdmin(user.role);
  /** bigint 在 JSON 中可能是 number，统一成 string，避免与表单 string 比较失败 */
  const campusAdminIds = user.campus_users
    .filter((r) => isScopeTableAdminRole(r.role))
    .map((r) => String(r.campus_campuses));
  const shopAdminIds = user.shop_users
    .filter((r) => isScopeTableAdminRole(r.role))
    .map((r) => String(r.shop_shops));

  const canEnter =
    isPlatformAdmin || campusAdminIds.length > 0 || shopAdminIds.length > 0;

  if (!canEnter) return null;

  return {
    userId: user.id,
    nickname: user.nickname,
    isPlatformAdmin,
    campusAdminIds,
    shopAdminIds,
    defaultCampusId: user.default_campus_id != null ? String(user.default_campus_id) : null,
    defaultShopId: user.default_shop_id != null ? String(user.default_shop_id) : null,
  };
}

/** 用请求体里的 JWT 校验并解析权限（登录接口用） */
export async function resolveAccessFromTokenString(token: string): Promise<AdminAccess | null> {
  let payload: HasuraJwtPayload;
  try {
    payload = HasuraJwtToken.verifyToken(token);
  } catch {
    return null;
  }
  const userId = userIdFromPayload(payload);
  if (!userId) return null;
  return fetchUserAccess(userId);
}

export async function loadAdminAccess(): Promise<AdminAccess | null> {
  const store = await cookies();
  const raw = store.get(ADMIN_JWT_COOKIE)?.value;
  if (!raw) return null;

  let payload: HasuraJwtPayload;
  try {
    payload = HasuraJwtToken.verifyToken(raw);
  } catch {
    return null;
  }

  const userId = userIdFromPayload(payload);
  if (!userId) return null;

  return fetchUserAccess(userId);
}

/** 站点相关 mutation 是否允许：学校侧管理员或平台管理员（平台仅在后台 actions 内使用，不用于进入 `/admin/site`） */
export function canUseOrgAdmin(access: AdminAccess): boolean {
  return access.isPlatformAdmin || access.campusAdminIds.length > 0;
}

/** 店铺相关 mutation 是否允许：店铺侧管理员或平台管理员 */
export function canUseShopAdmin(access: AdminAccess): boolean {
  return access.isPlatformAdmin || access.shopAdminIds.length > 0;
}

function idMatchesList(list: string[], id: string): boolean {
  const n = String(id).trim();
  return list.some((x) => String(x).trim() === n);
}

export function canWriteCampus(access: AdminAccess, campusId: string): boolean {
  if (access.isPlatformAdmin) return true;
  return idMatchesList(access.campusAdminIds, campusId);
}

export function canWriteShop(access: AdminAccess, shopId: string): boolean {
  if (access.isPlatformAdmin) return true;
  return idMatchesList(access.shopAdminIds, shopId);
}

/** 控制台登录态：JWT（带范围权限）或旧版仅密码会话（视为全量，仅建议开发/救急） */
export type ConsoleAuth =
  | { mode: "jwt"; access: AdminAccess }
  | { mode: "legacy_full" };

export async function getConsoleAuth(): Promise<ConsoleAuth | null> {
  const store = await cookies();
  const legacyOk = verifyAdminCookie(store.get(ADMIN_SESSION_COOKIE)?.value);
  const access = await loadAdminAccess();

  if (access) return { mode: "jwt", access };
  if (legacyOk) return { mode: "legacy_full" };
  return null;
}

/** `/admin/platform`：仅平台管理员，或开发用密码全量会话 */
export function canAccessPlatformConsole(auth: ConsoleAuth): boolean {
  if (auth.mode === "legacy_full") return true;
  return auth.access.isPlatformAdmin;
}

/**
 * `/admin/site`：仅 **学校侧管理员**（campus_users.role=admin）或开发会话。
 * 平台管理员（users.role=admin）请使用 `/admin/platform`，不进入站点后台。
 */
export function canAccessSiteConsole(auth: ConsoleAuth): boolean {
  if (auth.mode === "legacy_full") return true;
  return auth.mode === "jwt" && auth.access.campusAdminIds.length > 0;
}

/**
 * `/admin/shop`：仅 **店铺侧管理员**（shop_users.role=admin）或开发会话。
 * 平台管理员请使用 `/admin/platform` 管理店铺元数据，不进入店铺运营后台。
 */
export function canAccessShopConsole(auth: ConsoleAuth): boolean {
  if (auth.mode === "legacy_full") return true;
  return auth.mode === "jwt" && auth.access.shopAdminIds.length > 0;
}

