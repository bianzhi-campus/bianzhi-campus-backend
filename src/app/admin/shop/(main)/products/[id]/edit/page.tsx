import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  createProductSkuAction,
  deleteProductSkuAction,
  updateProductAction,
  updateProductSkuAction,
} from "@/app/admin/shop/actions/commerce";
import { ProductDetailMediasField } from "@/app/admin/shop/components/ProductDetailMediasField";
import { QiniuHiddenUrlField } from "@/app/admin/shop/components/QiniuHiddenUrlField";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveShopScopeForWorkspace } from "@/server/admin-console-scope";
import { canAccessShopConsole, canWriteShop, getConsoleAuth } from "@/server/admin-auth";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";
const labelClass = "text-sm font-medium text-zinc-700";
const skuFieldClass =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-2.5 py-2 text-sm text-zinc-900 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";

type SkuRow = {
  id: string;
  name: string;
  price: string;
  stock: string;
  sort_order: string;
  price_unit: string | null;
  image_url: string | null;
  is_shelved: boolean;
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;

  const { products_by_pk: product } = await adminGraphqlExecute<{
    products_by_pk: {
      id: string;
      name: string;
      shop_shops: string;
      cover_image_url: string | null;
      description: string | null;
      detail_medias: unknown;
      is_shelved: boolean;
      sort_order: string;
      product_skus: SkuRow[];
    } | null;
  }>(
    `
    query ProductEdit($id: bigint!) {
      products_by_pk(id: $id) {
        id
        name
        shop_shops
        cover_image_url
        description
        detail_medias
        is_shelved
        sort_order
        product_skus(order_by: { sort_order: desc }) {
          id
          name
          price
          stock
          sort_order
          price_unit
          image_url
          is_shelved
        }
      }
    }
  `,
    { id }
  );

  if (!product) notFound();

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessShopConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }
  if (auth.mode === "jwt" && !canWriteShop(auth.access, product.shop_shops)) {
    redirect("/admin/shop/products");
  }

  const shopScope = await resolveShopScopeForWorkspace(auth);

  let shops: Array<{ id: string; name: string }>;

  if (shopScope.kind === "full") {
    const data = await adminGraphqlExecute<{
      shops: Array<{ id: string; name: string }>;
    }>(`
      query ShopsOptions {
        shops(order_by: { name: asc }) {
          id
          name
        }
      }
    `);
    shops = data.shops;
  } else {
    const ids = shopScope.shopIds;
    const data = await adminGraphqlExecute<{
      shops: Array<{ id: string; name: string }>;
    }>(
      `
      query ShopsScoped($ids: [bigint!]!) {
        shops(where: { id: { _in: $ids } }, order_by: { name: asc }) {
          id
          name
        }
      }
    `,
      { ids }
    );
    shops = data.shops;
  }

  const err = sp.error;
  const skuCount = product.product_skus.length;

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <div className="mb-8">
        <Link
          href="/admin/shop/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
        >
          <span aria-hidden className="text-emerald-600">
            ←
          </span>
          返回商品列表
        </Link>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">编辑商品</h1>
            <p className="mt-1 truncate text-base text-zinc-600" title={product.name}>
              {product.name}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-xs text-zinc-600">
              ID {product.id}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                product.is_shelved
                  ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/15"
                  : "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-300/80"
              }`}
            >
              {product.is_shelved ? "上架中" : "已下架"}
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              {skuCount} 个 SKU
            </span>
          </div>
        </div>
      </div>

      {err === "json" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-800 shadow-sm">
          <span className="mt-0.5 text-red-500" aria-hidden>
            !
          </span>
          <span>详情媒体数据格式不正确，请检查后重试。</span>
        </div>
      )}
      {(err === "sku_insert" || err === "sku_update" || err === "sku_delete") && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-800 shadow-sm">
          <span className="mt-0.5 text-red-500" aria-hidden>
            !
          </span>
          <span>SKU 操作失败，请检查数据或稍后重试。</span>
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-zinc-950/5">
        <div className="border-b border-zinc-100 bg-gradient-to-r from-emerald-50/90 via-white to-white px-6 py-5 sm:px-8">
          <h2 className="text-lg font-semibold text-zinc-900">基本信息</h2>
          <p className="mt-1 text-sm text-zinc-500">店铺归属、名称、封面、介绍与详情素材</p>
        </div>
        <div className="p-6 sm:p-8">
          <form action={updateProductAction} className="space-y-6">
            <input type="hidden" name="id" value={product.id} />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="shop_shops" className={labelClass}>
                  所属店铺 <span className="text-red-500">*</span>
                </label>
                <select
                  id="shop_shops"
                  name="shop_shops"
                  required
                  defaultValue={product.shop_shops}
                  className={fieldClass}
                >
                  {shops.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>
                  商品名称 <span className="text-red-500">*</span>
                </label>
                <input id="name" name="name" required defaultValue={product.name} className={fieldClass} />
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-zinc-200/80 bg-zinc-50/40 p-4 sm:p-5">
              <QiniuHiddenUrlField
                name="cover_image_url"
                label="封面图"
                defaultUrl={product.cover_image_url}
                accept="image/*"
              />
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                商品介绍
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                defaultValue={product.description ?? ""}
                className={`${fieldClass} resize-y leading-relaxed`}
                placeholder="支持富文本或 HTML"
              />
            </div>

            <div>
              <p className={labelClass}>详情媒体</p>
              <p className="mt-1 text-xs text-zinc-500">图片与视频将按列表顺序展示，支持七牛直传。</p>
              <div className="mt-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 sm:p-5">
                <ProductDetailMediasField
                  defaultValueJson={JSON.stringify(product.detail_medias ?? [])}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-zinc-100 pt-6 sm:grid-cols-2">
              <div>
                <label htmlFor="sort_order" className={labelClass}>
                  排序
                </label>
                <p className="mt-0.5 text-xs text-zinc-500">数值越大越靠前</p>
                <input
                  id="sort_order"
                  name="sort_order"
                  type="number"
                  defaultValue={product.sort_order}
                  className={fieldClass}
                />
              </div>
              <div className="flex items-end">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 text-sm text-zinc-800 transition hover:bg-zinc-100">
                  <input
                    type="checkbox"
                    name="is_shelved"
                    defaultChecked={product.is_shelved}
                    className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>
                    <span className="font-medium">上架展示</span>
                    <span className="mt-0.5 block text-xs font-normal text-zinc-500">关闭后顾客端不可见</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-zinc-100 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                保存商品信息
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">SKU 规格</h2>
            <p className="mt-1 text-sm text-zinc-500">价格、库存与规格图；顾客下单时选择其一。</p>
          </div>
        </div>

        <div className="space-y-5">
          {product.product_skus.map((sku, idx) => (
            <article
              key={sku.id}
              className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-zinc-950/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-800">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-zinc-800">规格</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      sku.is_shelved ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-600"
                    }`}
                  >
                    {sku.is_shelved ? "上架" : "下架"}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <form action={updateProductSkuAction} className="space-y-5">
                  <input type="hidden" name="id" value={sku.id} />
                  <input type="hidden" name="product_id" value={product.id} />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">规格名</label>
                      <input name="name" required defaultValue={sku.name} className={skuFieldClass} />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">价格（元）</label>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        required
                        defaultValue={sku.price}
                        className={skuFieldClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">单位</label>
                      <input
                        name="price_unit"
                        defaultValue={sku.price_unit ?? ""}
                        placeholder="份"
                        className={skuFieldClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">库存</label>
                      <input
                        name="stock"
                        type="number"
                        required
                        defaultValue={sku.stock}
                        className={skuFieldClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">排序</label>
                      <input
                        name="sort_order"
                        type="number"
                        required
                        defaultValue={sku.sort_order}
                        className={skuFieldClass}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
                    <QiniuHiddenUrlField
                      name="image_url"
                      label="规格图"
                      defaultUrl={sku.image_url}
                      accept="image/*"
                      compact
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                      <input
                        type="checkbox"
                        name="is_shelved"
                        defaultChecked={sku.is_shelved}
                        className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      此规格上架销售
                    </label>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                    >
                      保存此规格
                    </button>
                  </div>
                </form>

                <form action={deleteProductSkuAction} className="mt-3 border-t border-zinc-100 pt-3">
                  <input type="hidden" name="id" value={sku.id} />
                  <input type="hidden" name="product_id" value={product.id} />
                  <button
                    type="submit"
                    className="text-sm font-medium text-red-600 transition hover:text-red-700 hover:underline"
                  >
                    删除此 SKU
                  </button>
                </form>
              </div>
            </article>
          ))}

          <div className="overflow-hidden rounded-2xl border-2 border-dashed border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 to-white p-5 shadow-sm ring-1 ring-emerald-600/5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                +
              </span>
              <div>
                <h3 className="text-base font-semibold text-zinc-900">新增 SKU</h3>
                <p className="text-xs text-zinc-500">补充新的价格与库存档位</p>
              </div>
            </div>
            <form action={createProductSkuAction} className="space-y-5">
              <input type="hidden" name="product_products" value={product.id} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">规格名</label>
                  <input name="name" required className={skuFieldClass} placeholder="例如：大份" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">价格（元）</label>
                  <input name="price" type="number" step="0.01" defaultValue={0} className={skuFieldClass} />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">单位</label>
                  <input name="price_unit" defaultValue="份" className={skuFieldClass} />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">库存</label>
                  <input name="stock" type="number" defaultValue={0} className={skuFieldClass} />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-zinc-500">排序</label>
                  <input name="sort_order" type="number" defaultValue={0} className={skuFieldClass} />
                </div>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-white/80 p-4">
                <QiniuHiddenUrlField name="image_url" label="规格图（可选）" accept="image/*" compact />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-emerald-100/80 pt-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    name="is_shelved"
                    defaultChecked
                    className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  创建后上架
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2"
                >
                  添加规格
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
