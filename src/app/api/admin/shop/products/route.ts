import { NextResponse, type NextRequest } from "next/server";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { loadShopConsoleScopeForApi } from "@/server/shop-console-scope-api";
import { canAccessShopConsole, getConsoleAuth } from "@/server/admin-auth";

export const dynamic = "force-dynamic";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

type ProductRow = {
  id: string;
  name: string;
  is_shelved: boolean;
  sort_order: string;
  cover_image_url: string | null;
  shop: { id: string; name: string } | null;
  product_skus_aggregate: { aggregate: { count: number } | null };
};

function parseParams(req: NextRequest): {
  page: number;
  pageSize: number;
  shopId: string;
  q: string;
  shelved: "all" | "on" | "off";
} {
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const rawSize = parseInt(url.searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE), 10);
  const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, Number.isFinite(rawSize) ? rawSize : DEFAULT_PAGE_SIZE));
  const shopId = (url.searchParams.get("shopId") ?? "").trim();
  const q = (url.searchParams.get("q") ?? "").trim();
  const rawShelved = (url.searchParams.get("shelved") ?? "all").trim().toLowerCase();
  const shelved =
    rawShelved === "on" || rawShelved === "true" || rawShelved === "1"
      ? "on"
      : rawShelved === "off" || rawShelved === "false" || rawShelved === "0"
        ? "off"
        : "all";
  return { page, pageSize, shopId, q, shelved };
}

function buildProductWhere(args: {
  shopWhere: { _eq: string } | { _in: string[] } | null;
  q: string;
  shelved: "all" | "on" | "off";
}): Record<string, unknown> | null {
  const { shopWhere, q, shelved } = args;
  const parts: Record<string, unknown>[] = [];

  if (shopWhere) {
    parts.push({ shop_shops: shopWhere });
  }

  if (shelved === "on") {
    parts.push({ is_shelved: { _eq: true } });
  } else if (shelved === "off") {
    parts.push({ is_shelved: { _eq: false } });
  }

  const trimmed = q.trim().slice(0, 80);
  if (trimmed) {
    const safe = trimmed.replace(/%/g, "").replace(/_/g, "");
    if (safe.length > 0) {
      parts.push({ name: { _ilike: `%${safe}%` } });
    }
  }

  if (parts.length === 0) return {};
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
  const { page, pageSize, shopId: shopIdParam, q, shelved } = parseParams(req);

  /** URL 与 GraphQL bigint 在 JSON 中可能是 string/number 混用，须统一成 string 再比 */
  let shopId = String(shopIdParam ?? "").trim();
  if (!shopId && scopedIds && scopedIds.length === 1) {
    shopId = String(scopedIds[0]).trim();
  }

  const allowedShopIds = new Set(shops.map((s) => String(s.id).trim()));
  if (shopId && !allowedShopIds.has(shopId)) {
    return NextResponse.json({ error: "invalid_shop" }, { status: 400 });
  }

  let shopWhere: { _eq: string } | { _in: string[] } | null = null;
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
        products: [],
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
      products: [],
      total: 0,
      page: 1,
      pageSize,
    });
  }

  const where = buildProductWhere({ shopWhere, q, shelved });
  const offset = (page - 1) * pageSize;

  const { products, products_aggregate } = await adminGraphqlExecute<{
    products: ProductRow[];
    products_aggregate: { aggregate: { count: number } | null };
  }>(
    `
    query ShopProductsApi($where: products_bool_exp!, $limit: Int!, $offset: Int!) {
      products(
        where: $where
        order_by: { sort_order: desc }
        limit: $limit
        offset: $offset
      ) {
        id
        name
        is_shelved
        sort_order
        cover_image_url
        shop {
          id
          name
        }
        product_skus_aggregate {
          aggregate {
            count
          }
        }
      }
      products_aggregate(where: $where) {
        aggregate {
          count
        }
      }
    }
  `,
    { where: where ?? {}, limit: pageSize, offset }
  );

  const total = products_aggregate.aggregate?.count ?? 0;

  return NextResponse.json({
    platformOrLegacy,
    shops,
    showShopTabs: platformOrLegacy && shops.length > 1,
    effectiveShopId: shopId || null,
    products,
    total,
    page,
    pageSize,
  });
}
