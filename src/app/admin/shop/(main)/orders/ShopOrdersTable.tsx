"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Shop = { id: string; name: string };

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

type ApiOk = {
  platformOrLegacy?: boolean;
  shops: Shop[];
  showShopTabs: boolean;
  effectiveShopId: string | null;
  orders: OrderRow[];
  total: number;
  page: number;
  pageSize: number;
};

function typeLabel(t: string): string {
  if (t === "offline") return "线下";
  if (t === "online") return "线上";
  return t || "—";
}

function buildQuery(base: Record<string, string | number | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(base)) {
    if (v === undefined || v === "" || v === null) continue;
    p.set(k, String(v));
  }
  return p.toString();
}

export function ShopOrdersTable() {
  const router = useRouter();
  const sp = useSearchParams();

  const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(sp.get("pageSize") ?? "20", 10) || 20));
  const shopId = (sp.get("shopId") ?? "").trim();
  const kind = (sp.get("kind") ?? "").trim();
  const q = (sp.get("q") ?? "").trim();

  const [data, setData] = useState<ApiOk | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qDraft, setQDraft] = useState(q);

  useEffect(() => {
    setQDraft(q);
  }, [q]);

  const apiUrl = useMemo(() => {
    const qs = buildQuery({ page, pageSize, shopId, kind, q });
    return `/api/admin/shop/orders${qs ? `?${qs}` : ""}`;
  }, [page, pageSize, shopId, kind, q]);

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
    router.replace(`/admin/shop/orders${s ? `?${s}` : ""}`);
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  const kindFilter: "online" | "offline" | null =
    kind === "online" || kind === "offline" ? kind : null;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">订单</h1>
          <p className="mt-1 text-sm text-zinc-600">
            用户订单（shop_userorders）列表；数据由浏览器请求受保护接口拉取，支持分页与筛选。
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={() => pushParams({ kind: undefined, page: "1" })}
            className={`rounded-md px-3 py-1.5 ${!kindFilter ? "bg-emerald-100 text-emerald-900" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}
          >
            全部类型
          </button>
          <button
            type="button"
            onClick={() => pushParams({ kind: "online", page: "1" })}
            className={`rounded-md px-3 py-1.5 ${kindFilter === "online" ? "bg-emerald-100 text-emerald-900" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}
          >
            线上
          </button>
          <button
            type="button"
            onClick={() => pushParams({ kind: "offline", page: "1" })}
            className={`rounded-md px-3 py-1.5 ${kindFilter === "offline" ? "bg-emerald-100 text-emerald-900" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}
          >
            线下
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex min-w-[12rem] flex-1 flex-col gap-1">
          <label htmlFor="order-search" className="text-xs font-medium text-zinc-500">
            搜索（订单号 / 手机 / 昵称）
          </label>
          <div className="flex gap-2">
            <input
              id="order-search"
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

      {data?.showShopTabs && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
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

      {loading && !data && (
        <p className="mt-8 text-center text-sm text-zinc-500">加载中…</p>
      )}

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
                  <th className="px-4 py-3">订单号</th>
                  <th className="px-4 py-3">时间</th>
                  <th className="px-4 py-3">类型</th>
                  <th className="px-4 py-3">店铺</th>
                  <th className="px-4 py-3 text-right">实付</th>
                  <th className="px-4 py-3">会员</th>
                  <th className="px-4 py-3">店铺单数</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-zinc-500">
                      暂无订单数据。
                    </td>
                  </tr>
                ) : (
                  data.orders.map((o) => {
                    const soCount = o.shop_orders_aggregate.aggregate?.count ?? 0;
                    const member =
                      o.user?.nickname?.trim() ||
                      (o.user?.mobile ? `尾号 ${o.user.mobile.slice(-4)}` : null);
                    return (
                      <tr key={o.id} className="hover:bg-zinc-50/80">
                        <td className="px-4 py-3 font-mono font-medium text-zinc-900">#{o.id}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-zinc-700">
                          {new Date(o.created_at).toLocaleString("zh-CN", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="px-4 py-3">{typeLabel(o.type)}</td>
                        <td className="max-w-[10rem] truncate px-4 py-3 text-zinc-800">{o.shop.name}</td>
                        <td className="px-4 py-3 text-right tabular-nums font-medium text-emerald-800">
                          ¥{parseFloat(o.pay_amount).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-zinc-700">{member ?? "匿名"}</td>
                        <td className="px-4 py-3 tabular-nums text-zinc-700">{soCount}</td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/admin/shop/orders/${o.id}`}
                            className="font-medium text-emerald-700 hover:underline"
                          >
                            详情
                          </Link>
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
