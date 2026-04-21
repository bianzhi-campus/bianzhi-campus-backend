import Link from "next/link";
import { redirect } from "next/navigation";

import { PosCheckout, type PosCatalogProduct } from "./PosCheckout";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveShopScope } from "@/server/admin-console-scope";
import { canAccessShopConsole, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  searchParams: Promise<{ shopId?: string; error?: string; ok?: string }>;
};

function errorMessage(code: string | undefined): string | null {
  if (!code) return null;
  const map: Record<string, string> = {
    need_jwt: "线下收银需登录账号（JWT），请使用正常登录而非仅开发密码会话。",
    forbidden: "无当前店铺的操作权限。",
    no_shop: "未选择店铺。",
    lines_json: "订单行数据异常，请刷新页面后重试。",
    empty_cart: "请至少添加一件商品。",
    sku_mismatch: "部分商品已变更，请刷新页面后重试。",
    not_shelved: "存在未上架的规格，无法收银。",
    stock: "库存不足，请减少数量后重试。",
    invalid_pay: "实收金额无效，请输入大于 0 的数字。",
    insert_failed: "创建订单失败（可能为网络或数据约束）。已尝试回滚库存，请核对后重试。",
  };
  return map[code] ?? `错误：${code}`;
}

type PosCatalogQueryRow = {
  id: string;
  name: string;
  cover_image_url: string | null;
  product_skus: Array<{
    id: string;
    name: string;
    price: string;
    stock: string;
    image_url: string | null;
  }>;
};

export default async function ShopPosPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessShopConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  const shopScope = await resolveShopScope(auth);
  if ("redirect" in shopScope) {
    redirect(shopScope.redirect);
  }

  let lockedShop: { id: string; name: string } | null = null;
  let legacyShopSwitchHint = false;

  if (shopScope.kind === "full") {
    const { shops } = await adminGraphqlExecute<{
      shops: Array<{ id: string; name: string }>;
    }>(`
      query PosShopList {
        shops(order_by: { id: asc }) {
          id
          name
        }
      }
    `);
    legacyShopSwitchHint = shops.length > 1;
    const q = sp.shopId?.trim();
    const sid = q && shops.some((s) => s.id === q) ? q : (shops[0]?.id ?? "");
    lockedShop = sid ? shops.find((s) => s.id === sid) ?? null : null;
  } else {
    const sid = shopScope.shopIds[0] ?? "";
    if (sid) {
      const { shops_by_pk } = await adminGraphqlExecute<{
        shops_by_pk: { id: string; name: string } | null;
      }>(
        `
        query PosLockedShop($id: bigint!) {
          shops_by_pk(id: $id) {
            id
            name
          }
        }
      `,
        { id: sid }
      );
      lockedShop = shops_by_pk;
    }
  }

  if (!lockedShop) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">收银台</h1>
        <p className="mt-2 text-zinc-600">未解析到可用店铺，请先确认店铺范围。</p>
      </div>
    );
  }

  const { products } = await adminGraphqlExecute<{
    products: PosCatalogQueryRow[];
  }>(
    `
    query PosCatalog($shopId: bigint!) {
      products(
        where: { shop_shops: { _eq: $shopId }, is_shelved: { _eq: true } }
        order_by: { sort_order: desc }
      ) {
        id
        name
        cover_image_url
        product_skus(
          where: { is_shelved: { _eq: true } }
          order_by: { sort_order: desc }
        ) {
          id
          name
          price
          stock
          image_url
        }
      }
    }
  `,
    { shopId: lockedShop.id }
  );

  const catalog: PosCatalogProduct[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    cover_image_url: p.cover_image_url,
    skus: p.product_skus.map((s) => ({
      id: s.id,
      name: s.name,
      price: s.price,
      stock: s.stock,
      image_url: s.image_url,
    })),
  }));

  const errMsg = errorMessage(sp.error);
  const showOk = sp.ok === "1";

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/shop" className="text-sm text-emerald-700 hover:underline">
          ← 店铺概览
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">收银台</h1>
        <p className="mt-1 text-sm text-zinc-600">
          当前店铺：<span className="font-medium text-zinc-800">{lockedShop.name}</span>
          <span className="text-zinc-400">（id: {lockedShop.id}）</span>
        </p>
        {legacyShopSwitchHint && (
          <p className="mt-2 text-sm text-amber-800">
            开发会话下有多店铺时，可通过 URL 参数 <code className="rounded bg-amber-100 px-1">?shopId=</code>{" "}
            切换。
          </p>
        )}
      </div>

      {showOk && (
        <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          订单已创建，库存已扣减。
        </p>
      )}
      {errMsg && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errMsg}</p>
      )}

      <PosCheckout shopId={lockedShop.id} shopName={lockedShop.name} catalog={catalog} />
    </div>
  );
}
