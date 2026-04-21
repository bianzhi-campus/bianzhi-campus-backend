import { NextResponse, type NextRequest } from "next/server";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { loadShopConsoleScopeForApi } from "@/server/shop-console-scope-api";
import { canAccessShopConsole, getConsoleAuth } from "@/server/admin-auth";

export const dynamic = "force-dynamic";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

type OrderRow = {
  id: string;
  created_at: string;
  type: string;
  pay_amount: string;
  shop_shops: string;
  shop: { name: string };
  user: { nickname: string | null; mobile: string | null } | null;
  userByCreatedByUsers: { nickname: string | null } | null;
  shop_orders_aggregate: { aggregate: { count: number } | null };
};

function parsePageParams(req: NextRequest): {
  page: number;
  pageSize: number;
  shopId: string;
  kind: string;
  q: string;
} {
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const rawSize = parseInt(url.searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE), 10);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, Number.isFinite(rawSize) ? rawSize : DEFAULT_PAGE_SIZE));
  const shopId = (url.searchParams.get("shopId") ?? "").trim();
  const kind = (url.searchParams.get("kind") ?? url.searchParams.get("orderKind") ?? "").trim();
  const q = (url.searchParams.get("q") ?? "").trim();
  return { page, pageSize, shopId, kind, q };
}

function buildOrderWhere(args: {
  shopWhere: { _eq: string } | { _in: string[] };
  typeFilter: "online" | "offline" | null;
  q: string;
}): Record<string, unknown> {
  const { shopWhere, typeFilter, q } = args;
  const shopPart = { shop_shops: shopWhere };
  const parts: Record<string, unknown>[] = [shopPart];

  if (typeFilter) {
    parts.push({ type: { _eq: typeFilter } });
  }

  const trimmed = q.trim().slice(0, 80);
  if (trimmed) {
    if (/^\d+$/.test(trimmed)) {
      parts.push({ id: { _eq: trimmed } });
    } else {
      const safe = trimmed.replace(/%/g, "").replace(/_/g, "");
      if (safe.length > 0) {
        const pattern = `%${safe}%`;
        parts.push({
          _or: [
            { user: { mobile: { _ilike: pattern } } },
            { user: { nickname: { _ilike: pattern } } },
          ],
        });
      }
    }
  }

  if (parts.length === 1) return parts[0] as Record<string, unknown>;
  return { _and: parts };
}

export async function GET(req: NextRequest) {
  const auth = await getConsoleAuth();
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!canAccessShopConsole(auth)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const scopePack = await loadShopConsoleScopeForApi(auth);
  if (!scopePack.ok) {
    return NextResponse.json({ error: scopePack.error }, { status: scopePack.status });
  }

  const { platformOrLegacy, scopedIds, shops } = scopePack.scope;
  const { page, pageSize, shopId: shopIdParam, kind, q } = parsePageParams(req);

  /** URL 与 GraphQL bigint 在 JSON 中可能是 string/number 混用，须统一成 string 再比 */
  let shopId = String(shopIdParam ?? "").trim();
  if (!shopId && scopedIds && scopedIds.length === 1) {
    shopId = String(scopedIds[0]).trim();
  }

  const typeFilter: "online" | "offline" | null =
    kind === "online" || kind === "offline" ? kind : null;

  const allowedShopIds = new Set(shops.map((s) => String(s.id).trim()));
  if (shopId && !allowedShopIds.has(shopId)) {
    return NextResponse.json({ error: "invalid_shop" }, { status: 400 });
  }

  let shopWhere: { _eq: string } | { _in: string[] };
  if (shopId) {
    shopWhere = { _eq: shopId };
  } else if (platformOrLegacy) {
    const allIds = shops.map((s) => s.id);
    if (allIds.length === 0) {
      return NextResponse.json({
        platformOrLegacy,
        shops,
        showShopTabs: platformOrLegacy && shops.length > 1,
        effectiveShopId: shopId || null,
        orders: [],
        total: 0,
        page: 1,
        pageSize,
      });
    }
    shopWhere = { _in: allIds };
  } else if (scopedIds && scopedIds.length > 0) {
    shopWhere = { _in: scopedIds };
  } else {
    return NextResponse.json({
      platformOrLegacy,
      shops,
      showShopTabs: platformOrLegacy && shops.length > 1,
      effectiveShopId: shopId || null,
      orders: [],
      total: 0,
      page: 1,
      pageSize,
    });
  }

  const where = buildOrderWhere({ shopWhere, typeFilter, q });
  const offset = (page - 1) * pageSize;

  const { shop_userorders, shop_userorders_aggregate } = await adminGraphqlExecute<{
    shop_userorders: OrderRow[];
    shop_userorders_aggregate: { aggregate: { count: number } | null };
  }>(
    `
    query ShopOrdersApi($where: shop_userorders_bool_exp!, $limit: Int!, $offset: Int!) {
      shop_userorders(
        where: $where
        order_by: { created_at: desc }
        limit: $limit
        offset: $offset
      ) {
        id
        created_at
        type
        pay_amount
        shop_shops
        shop {
          name
        }
        user {
          nickname
          mobile
        }
        userByCreatedByUsers {
          nickname
        }
        shop_orders_aggregate {
          aggregate {
            count
          }
        }
      }
      shop_userorders_aggregate(where: $where) {
        aggregate {
          count
        }
      }
    }
  `,
    { where, limit: pageSize, offset }
  );

  const total = shop_userorders_aggregate.aggregate?.count ?? 0;

  return NextResponse.json({
    platformOrLegacy,
    shops,
    showShopTabs: platformOrLegacy && shops.length > 1,
    effectiveShopId: shopId || null,
    orders: shop_userorders,
    total,
    page,
    pageSize,
  });
}
