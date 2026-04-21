import Link from "next/link";
import { redirect } from "next/navigation";

import { createProductAction } from "@/app/admin/shop/actions/commerce";
import { ProductDetailMediasField } from "@/app/admin/shop/components/ProductDetailMediasField";
import { QiniuHiddenUrlField } from "@/app/admin/shop/components/QiniuHiddenUrlField";
import { ProductSkuRowsEditor } from "@/app/admin/shop/(main)/products/ProductSkuRowsEditor";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveShopScopeForWorkspace } from "@/server/admin-console-scope";
import { canAccessShopConsole, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  searchParams: Promise<{ shopId?: string; error?: string }>;
};

export default async function NewProductPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessShopConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  const shopScope = await resolveShopScopeForWorkspace(auth);

  let lockedShop: { id: string; name: string } | null = null;
  let legacyShopSwitchHint = false;

  if (shopScope.kind === "full") {
    const { shops } = await adminGraphqlExecute<{
      shops: Array<{ id: string; name: string }>;
    }>(`
      query NewProductShopList {
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
        query LockedShop($id: bigint!) {
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

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/shop/products" className="text-sm text-emerald-700 hover:underline">
          ← 返回列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">新建商品</h1>
      </div>

      {sp.error === "json" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          详情媒体 JSON 格式不正确，需为合法 JSON（建议数组）。
        </p>
      )}
      {sp.error === "invalid" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">请填写店铺、名称与排序数字。</p>
      )}
      {sp.error === "sku_json" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          规格数据格式不正确，请刷新页面后重试。
        </p>
      )}
      {sp.error === "sku_required" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          请至少添加一条 SKU，并填写规格名称。
        </p>
      )}
      {sp.error === "insert" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          保存失败，请检查规格价格、库存等是否为有效数字后重试。
        </p>
      )}

      {!lockedShop ? (
        <p className="text-zinc-600">
          暂无可关联的店铺。请联系平台管理员在{" "}
          <Link href="/admin/platform/shops/new" className="text-emerald-700 hover:underline">
            平台后台
          </Link>
          创建店铺。
        </p>
      ) : (
        <form
          action={createProductAction}
          className="max-w-2xl space-y-4 rounded-lg border border-zinc-200 bg-white p-6"
        >
          <input type="hidden" name="shop_shops" value={lockedShop.id} />
          <div>
            <p className="block text-sm font-medium text-zinc-700">
              所属店铺 <span className="text-red-500">*</span>
            </p>
            <p className="mt-1 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900">
              {lockedShop.name}
            </p>
            <p className="mt-1 text-xs text-zinc-500">店铺后台仅管理当前店铺，不可更改。</p>
            {legacyShopSwitchHint && (
              <p className="mt-2 text-xs text-zinc-500">
                开发会话下多店铺时，可在 URL 使用{" "}
                <code className="rounded bg-zinc-100 px-1">?shopId=店铺ID</code> 指定店铺（与商品列表筛选一致）。
              </p>
            )}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
              商品名称 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
            />
          </div>
          <QiniuHiddenUrlField name="cover_image_url" label="封面图" accept="image/*" />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
              商品介绍（富文本/HTML）
            </label>
            <textarea id="description" name="description" rows={5} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <p className="block text-sm font-medium text-zinc-700">详情媒体</p>
            <p className="mt-1 text-xs text-zinc-500">按顺序添加图片或视频，七牛直传并自动写入数据。</p>
            <div className="mt-2">
              <ProductDetailMediasField defaultValueJson="[]" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sort_order" className="block text-sm font-medium text-zinc-700">
                排序（越大越靠前）
              </label>
              <input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={0}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm text-zinc-700">
                <input type="checkbox" name="is_shelved" defaultChecked className="rounded border-zinc-300" />
                上架展示
              </label>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-4">
            <h2 className="text-lg font-medium text-zinc-900">SKU 规格</h2>
            <p className="mt-1 text-sm text-zinc-500">新建商品时一并维护规格、价格、库存与单位；下单时按 SKU 维度选择。</p>
            <div className="mt-4">
              <ProductSkuRowsEditor />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              保存
            </button>
            <Link
              href="/admin/shop/products"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              取消
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
