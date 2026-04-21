import { NextResponse, type NextRequest } from "next/server";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessSiteConsole, getConsoleAuth } from "@/server/admin-auth";

export const dynamic = "force-dynamic";

const SEARCH_LIMIT = 25;

function campusAllowedForSiteAdmin(
  auth: NonNullable<Awaited<ReturnType<typeof getConsoleAuth>>>,
  campusId: string
): boolean {
  if (auth.mode === "legacy_full") return true;
  const want = String(campusId).trim();
  return auth.access.campusAdminIds.some((c) => String(c).trim() === want);
}

function safeIlikePattern(q: string): string {
  const t = q.trim().slice(0, 60).replace(/%/g, "").replace(/_/g, "");
  if (!t) return "";
  return `%${t}%`;
}

/**
 * 站点后台：按名称搜索店铺，或按 id 解析店名（配置首页跳转用）。
 * Query: campusId（必填）、q（名称关键字，1 字以上）、id（店铺 id，单独解析）
 */
export async function GET(req: NextRequest) {
  const auth = await getConsoleAuth();
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!canAccessSiteConsole(auth)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const campusId = (url.searchParams.get("campusId") ?? "").trim();
  if (!campusId) {
    return NextResponse.json({ error: "campusId_required" }, { status: 400 });
  }
  if (!campusAllowedForSiteAdmin(auth, campusId)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const idLook = (url.searchParams.get("id") ?? "").trim();
  if (idLook) {
    const { shops_by_pk } = await adminGraphqlExecute<{
      shops_by_pk: { id: string; name: string } | null;
    }>(
      `
      query SiteAdminShopById($id: bigint!) {
        shops_by_pk(id: $id) {
          id
          name
        }
      }
    `,
      { id: idLook }
    );
    return NextResponse.json({
      shops: shops_by_pk ? [{ id: String(shops_by_pk.id), name: shops_by_pk.name }] : [],
    });
  }

  const q = (url.searchParams.get("q") ?? "").trim();
  const pat = safeIlikePattern(q);
  if (!pat) {
    return NextResponse.json({ shops: [] });
  }

  const { shops } = await adminGraphqlExecute<{
    shops: Array<{ id: string; name: string }>;
  }>(
    `
    query SiteAdminShopSearch($pat: String!, $lim: Int!) {
      shops(
        where: { name: { _ilike: $pat } }
        order_by: { name: asc }
        limit: $lim
      ) {
        id
        name
      }
    }
  `,
    { pat, lim: SEARCH_LIMIT }
  );

  return NextResponse.json({
    shops: shops.map((s) => ({ id: String(s.id), name: s.name })),
  });
}
