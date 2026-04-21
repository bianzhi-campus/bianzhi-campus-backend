import "server-only";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveShopScope } from "@/server/admin-console-scope";
import type { ConsoleAuth } from "@/server/admin-auth";

export type ShopRow = { id: string; name: string };

function normShopRow(s: { id: unknown; name: unknown }): ShopRow {
  return { id: String(s.id ?? "").trim(), name: String(s.name ?? "").trim() || "—" };
}

export type ShopConsoleScopeOk = {
  platformOrLegacy: boolean;
  /** 多店 scoped 时的可访问店铺 id；full 模式为 null（表示不按 scope 列表限制逻辑，由 shops 查询结果驱动） */
  scopedIds: string[] | null;
  shops: ShopRow[];
};

/**
 * 店铺后台 API 用：解析数据范围并拉取店铺列表（不 redirect，供 Route Handler 返回 JSON）。
 */
export async function loadShopConsoleScopeForApi(
  auth: ConsoleAuth
): Promise<{ ok: true; scope: ShopConsoleScopeOk } | { ok: false; status: 401 | 403; error: string }> {
  const s = await resolveShopScope(auth);
  if ("redirect" in s) {
    return { ok: false, status: 403, error: "forbidden" };
  }
  if (s.kind === "need_shop_pick") {
    return { ok: false, status: 403, error: "need_shop_pick" };
  }

  const platformOrLegacy = s.kind === "full";
  const scopedIds = s.kind === "scoped" ? s.shopIds : null;

  if (platformOrLegacy) {
    const { shops: raw } = await adminGraphqlExecute<{ shops: Array<{ id: unknown; name: unknown }> }>(`
      query ShopConsoleScopeShops {
        shops(order_by: { name: asc }) {
          id
          name
        }
      }
    `);
    const shops = raw.map(normShopRow);
    return { ok: true, scope: { platformOrLegacy, scopedIds: null, shops } };
  }

  if (scopedIds && scopedIds.length > 0) {
    const idsNorm = scopedIds.map((id) => String(id).trim());
    const { shops: raw } = await adminGraphqlExecute<{ shops: Array<{ id: unknown; name: unknown }> }>(
      `
      query ShopConsoleScopeShopsScoped($ids: [bigint!]!) {
        shops(where: { id: { _in: $ids } }, order_by: { name: asc }) {
          id
          name
        }
      }
    `,
      { ids: idsNorm }
    );
    const shops = raw.map(normShopRow);
    return { ok: true, scope: { platformOrLegacy: false, scopedIds: idsNorm, shops } };
  }

  return { ok: true, scope: { platformOrLegacy: false, scopedIds: [], shops: [] } };
}
