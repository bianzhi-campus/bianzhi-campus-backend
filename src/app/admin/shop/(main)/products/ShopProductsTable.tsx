"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { deleteProductAction } from "@/app/admin/shop/actions/commerce";

type Shop = { id: string; name: string };

type ProductRow = {
  id: string;
  name: string;
  is_shelved: boolean;
  sort_order: string;
  cover_image_url: string | null;
  shop: { id: string; name: string } | null;
  product_skus_aggregate: { aggregate: { count: number } | null };
};

type ApiOk = {
  platformOrLegacy?: boolean;
  shops: Shop[];
  showShopTabs: boolean;
  effectiveShopId: string | null;
  products: ProductRow[];
  total: number;
  page: number;
  pageSize: number;
};

function buildQuery(base: Record<string, string | number | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(base)) {
    if (v === undefined || v === "" || v === null) continue;
    p.set(k, String(v));
  }
  return p.toString();
}

export function ShopProductsTable() {
  const router = useRouter();
  const sp = useSearchParams();

  const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(sp.get("pageSize") ?? "20", 10) || 20));
  const shopId = (sp.get("shopId") ?? "").trim();
  const q = (sp.get("q") ?? "").trim();
  const shelvedRaw = (sp.get("shelved") ?? "all").trim().toLowerCase();
  const shelved = shelvedRaw === "on" || shelvedRaw === "off" ? shelvedRaw : "all";

  const err = sp.get("error");

  const [data, setData] = useState<ApiOk | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qDraft, setQDraft] = useState(q);

  useEffect(() => {
    setQDraft(q);
  }, [q]);

  const apiUrl = useMemo(() => {
    const qs = buildQuery({
      page,
      pageSize,
      shopId,
      q,
      shelved: shelved === "all" ? undefined : shelved,
    });
    return `/api/admin/shop/products${qs ? `?${qs}` : ""}`;
  }, [page, pageSize, shopId, q, shelved]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl, { credentials: "include", cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = (await res.json()) as ApiOk & { error?: string };
      if (!res.ok) {
        setError(json.error === "need_shop_pick" ? "请先选择要管理的店铺。" : json.error ?? "加载失败");
        setData(null);
        return;
      }
      setData(json);
    } catch {
      setError("网络错误，请重试。");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    void load();
  }, [load]);

  const pushParams = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === "") next.delete(k);
      else next.set(k, v);
    }
    const s = next.toString();
    router.replace(`/admin/shop/products${s ? `?${s}` : ""}`);
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  const effectiveShopId = data?.effectiveShopId ?? null;
  const newHref = effectiveShopId
    ? `/admin/shop/products/new?shopId=${encodeURIComponent(effectiveShopId)}`
    : "/admin/shop/products/new";

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">商品</h1>
          <p className="mt-1 text-sm text-zinc-600">
            商品列表支持分页、按名称搜索、上架状态筛选；数据由浏览器请求受保护接口拉取。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {data?.showShopTabs && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-zinc-600">店铺</span>
              <button
                type="button"
                onClick={() => pushParams({ shopId: undefined, page: "1" })}
                className={`rounded-md px-2 py-1 ${!shopId ? "bg-emerald-100 text-emerald-900" : "text-zinc-700 hover:bg-zinc-100"}`}
              >
                全部
              </button>
              {data.shops.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => pushParams({ shopId: s.id, page: "1" })}
                  className={`rounded-md px-2 py-1 ${
                    shopId === s.id ? "bg-emerald-100 text-emerald-900" : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
          <Link
            href={newHref}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            新建商品
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="flex min-w-[12rem] flex-1 flex-col gap-1">
          <label htmlFor="product-search" className="text-xs font-medium text-zinc-500">
            搜索商品名称
          </label>
          <div className="flex gap-2">
            <input
              id="product-search"
              value={qDraft}
              onChange={(e) => setQDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  pushParams({ q: qDraft.trim() || undefined, page: "1" });
                }
              }}
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="输入后回车搜索"
            />
            <button
              type="button"
              onClick={() => pushParams({ q: qDraft.trim() || undefined, page: "1" })}
              className="shrink-0 rounded-md bg-zinc-800 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700"
            >
              搜索
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-zinc-500">上架状态</span>
          <select
            value={shelved}
            onChange={(e) =>
              pushParams({
                shelved: e.target.value === "all" ? undefined : e.target.value,
                page: "1",
              })
            }
            className="min-w-[8rem] rounded-md border border-zinc-200 bg-white px-2 py-2 text-sm text-zinc-900"
          >
            <option value="all">全部</option>
            <option value="on">仅上架</option>
            <option value="off">仅下架</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-zinc-500">每页条数</span>
          <select
            value={pageSize}
            onChange={(e) => pushParams({ pageSize: e.target.value, page: "1" })}
            className="rounded-md border border-zinc-200 bg-white px-2 py-2 text-sm text-zinc-900"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {data && data.platformOrLegacy && data.shops.length === 0 && (
        <p className="mt-2 text-sm text-amber-800">
          暂无店铺，请联系平台管理员在{" "}
          <Link href="/admin/platform/shops/new" className="font-medium underline">
            平台后台
          </Link>
          创建店铺。
        </p>
      )}

      {err === "delete" && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">删除失败，请稍后重试。</p>
      )}
      {(err === "sku_invalid" || err === "invalid") && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">参数不合法，请检查表单。</p>
      )}
      {err === "forbidden" && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">无权限执行此操作。</p>
      )}

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
          {error.includes("选择") && (
            <>
              {" "}
              <Link href="/admin/shop/scope-pick" className="font-medium underline">
                去选择
              </Link>
            </>
          )}
        </p>
      )}

      {loading && !data && <p className="mt-8 text-center text-sm text-zinc-500">加载中…</p>}

      {data && (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-600">
            <span>
              共 <strong className="text-zinc-900">{data.total}</strong> 条
              {loading && <span className="ml-2 text-zinc-400">（刷新中…）</span>}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => pushParams({ page: String(page - 1) })}
                className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-zinc-800 hover:bg-zinc-50 disabled:opacity-40"
              >
                上一页
              </button>
              <span className="tabular-nums">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => pushParams({ page: String(page + 1) })}
                className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-zinc-800 hover:bg-zinc-50 disabled:opacity-40"
              >
                下一页
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-100 bg-zinc-50 text-xs font-medium uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3">封面</th>
                  <th className="px-4 py-3">商品</th>
                  <th className="px-4 py-3">店铺</th>
                  <th className="px-4 py-3">上架</th>
                  <th className="px-4 py-3 text-right">SKU 数</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                      暂无商品。
                    </td>
                  </tr>
                ) : (
                  data.products.map((p) => {
                    const skuCount = p.product_skus_aggregate.aggregate?.count ?? 0;
                    return (
                      <tr key={p.id} className="hover:bg-zinc-50/80">
                        <td className="px-4 py-3">
                          <div className="h-12 w-12 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
                            {p.cover_image_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.cover_image_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-zinc-400">
                                无
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="max-w-xs px-4 py-3">
                          <div className="font-medium text-zinc-900">{p.name}</div>
                          <div className="mt-0.5 font-mono text-xs text-zinc-400">#{p.id}</div>
                        </td>
                        <td className="max-w-[10rem] truncate px-4 py-3 text-zinc-700">{p.shop?.name ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded px-1.5 py-0.5 text-xs ${
                              p.is_shelved ? "bg-emerald-100 text-emerald-900" : "bg-zinc-200 text-zinc-700"
                            }`}
                          >
                            {p.is_shelved ? "上架" : "下架"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-zinc-800">{skuCount}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-3">
                            <Link
                              href={`/admin/shop/products/${p.id}/edit`}
                              className="font-medium text-emerald-700 hover:underline"
                            >
                              编辑
                            </Link>
                            <form action={deleteProductAction} className="inline">
                              <input type="hidden" name="id" value={p.id} />
                              <button type="submit" className="text-red-600 hover:underline">
                                删除
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
