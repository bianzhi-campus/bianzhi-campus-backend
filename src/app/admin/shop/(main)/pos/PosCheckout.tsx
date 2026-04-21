"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  createOfflinePosOrderAction,
  lookupMemberByMobileForPosAction,
} from "@/app/admin/shop/actions/pos";

export type PosCatalogSku = {
  id: string;
  name: string;
  price: string;
  stock: string;
  image_url: string | null;
};

export type PosCatalogProduct = {
  id: string;
  name: string;
  cover_image_url: string | null;
  skus: PosCatalogSku[];
};

type Props = {
  shopId: string;
  shopName: string;
  catalog: PosCatalogProduct[];
};

function PosSubmitButton({ cartEmpty }: { cartEmpty: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || cartEmpty}
      className="w-full rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "提交中…" : "确认收款并下单"}
    </button>
  );
}

function parseStock(raw: string): number {
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function parsePrice(raw: string): number {
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

function maskMobile(m: string): string {
  const d = m.replace(/\D/g, "");
  if (d.length < 8) return m;
  return `${d.slice(0, 3)}****${d.slice(-4)}`;
}

export function PosCheckout({ shopId, shopName, catalog }: Props) {
  const linesHiddenRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [clientError, setClientError] = useState<string | null>(null);
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPick, setMemberPick] = useState<{
    userId: string;
    nickname: string | null;
    mobile: string;
  } | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupPending, setLookupPending] = useState(false);
  /** 顾客实付（元），购物车金额变化时默认同步为标价合计 */
  const [actualPayInput, setActualPayInput] = useState("");

  const sellable = useMemo(() => {
    return catalog.filter((p) => p.skus.length > 0);
  }, [catalog]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sellable;
    return sellable.filter((p) => {
      if (p.name.toLowerCase().includes(q)) return true;
      return p.skus.some((s) => s.name.toLowerCase().includes(q));
    });
  }, [sellable, query]);

  const cartLines = useMemo(() => {
    const rows: Array<{
      skuId: string;
      productName: string;
      skuName: string;
      price: number;
      qty: number;
      stock: number;
    }> = [];
    for (const p of catalog) {
      for (const s of p.skus) {
        const qty = cart[s.id] ?? 0;
        if (qty < 1) continue;
        rows.push({
          skuId: s.id,
          productName: p.name,
          skuName: s.name,
          price: parsePrice(s.price),
          qty,
          stock: parseStock(s.stock),
        });
      }
    }
    return rows;
  }, [catalog, cart]);

  const totalYuan = useMemo(
    () => cartLines.reduce((sum, r) => sum + r.price * r.qty, 0),
    [cartLines]
  );

  useEffect(() => {
    setActualPayInput(totalYuan.toFixed(2));
  }, [totalYuan]);

  /** 标价 − 实收：&gt;0 让利，&lt;0 多收 */
  const priceAdjust = useMemo(() => {
    const a = parseFloat(actualPayInput.trim());
    if (!Number.isFinite(a) || totalYuan <= 0) {
      return { delta: 0 as number, label: "none" as const };
    }
    const delta = Math.round((totalYuan - a) * 100) / 100;
    if (Math.abs(delta) < 0.005) return { delta: 0, label: "none" as const };
    if (delta > 0) return { delta, label: "discount" as const };
    return { delta, label: "surcharge" as const };
  }, [actualPayInput, totalYuan]);

  const displayActualPay = useMemo(() => {
    const p = parseFloat(actualPayInput.trim());
    if (Number.isFinite(p) && p >= 0) return p.toFixed(2);
    return totalYuan.toFixed(2);
  }, [actualPayInput, totalYuan]);

  function setQty(skuId: string, next: number, maxStock: number) {
    setClientError(null);
    const q = Math.max(0, Math.min(Math.floor(next), maxStock));
    setCart((prev) => {
      const nextMap = { ...prev };
      if (q < 1) delete nextMap[skuId];
      else nextMap[skuId] = q;
      return nextMap;
    });
  }

  function addOne(skuId: string, maxStock: number) {
    const cur = cart[skuId] ?? 0;
    if (cur >= maxStock) {
      setClientError("已达该规格库存上限。");
      return;
    }
    setQty(skuId, cur + 1, maxStock);
  }

  async function handleLookupMember() {
    setLookupError(null);
    setLookupPending(true);
    try {
      const r = await lookupMemberByMobileForPosAction(shopId, memberPhone);
      if (r.ok) {
        setMemberPick({
          userId: r.userId,
          nickname: r.nickname,
          mobile: r.mobile,
        });
      } else {
        setMemberPick(null);
        setLookupError(r.message);
      }
    } catch {
      setMemberPick(null);
      setLookupError("查询失败，请稍后重试");
    } finally {
      setLookupPending(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setClientError(null);
    const lines = Object.entries(cart)
      .filter(([, q]) => q > 0)
      .map(([product_sku_id, quantity]) => ({ product_sku_id, quantity }));
    if (lines.length === 0) {
      e.preventDefault();
      setClientError("请先添加至少一件商品。");
      return;
    }
    const pay = parseFloat(actualPayInput.trim());
    if (!Number.isFinite(pay) || pay <= 0) {
      e.preventDefault();
      setClientError("请输入有效的实收金额。");
      return;
    }
    if (linesHiddenRef.current) {
      linesHiddenRef.current.value = JSON.stringify(lines);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="block flex-1 text-sm text-zinc-700">
            <span className="mb-1 block font-medium text-zinc-800">搜索商品 / 规格</span>
            <input
              type="search"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              placeholder="输入名称过滤…"
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </label>
        </div>

        {sellable.length === 0 ? (
          <p className="rounded-md border border-dashed border-zinc-200 bg-zinc-50 px-4 py-8 text-center text-sm text-zinc-600">
            当前店铺没有可售的上架商品与规格，请先在「商品」中上架商品与 SKU。
          </p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                    {p.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.cover_image_url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                        无图
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-medium text-zinc-900">{p.name}</h2>
                    <ul className="mt-2 space-y-2">
                      {p.skus.map((s) => {
                        const stock = parseStock(s.stock);
                        const qty = cart[s.id] ?? 0;
                        const price = parsePrice(s.price);
                        return (
                          <li
                            key={s.id}
                            className="flex flex-wrap items-center gap-2 rounded-md bg-zinc-50 px-2 py-2 text-sm"
                          >
                            <span className="min-w-0 flex-1 text-zinc-800">
                              {s.name}
                              <span className="ml-2 text-zinc-500">
                                ¥{price.toFixed(2)} · 库存 {stock}
                              </span>
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={qty <= 0}
                                onClick={() => setQty(s.id, qty - 1, stock)}
                                className="h-8 w-8 rounded border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 disabled:opacity-40"
                              >
                                −
                              </button>
                              <span className="w-8 text-center tabular-nums">{qty}</span>
                              <button
                                type="button"
                                disabled={stock <= 0 || qty >= stock}
                                onClick={() => addOne(s.id, stock)}
                                className="h-8 w-8 rounded border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 disabled:opacity-40"
                              >
                                +
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {filtered.length === 0 && sellable.length > 0 && (
          <p className="mt-4 text-sm text-zinc-500">没有匹配「{query.trim()}」的商品，请换个关键词。</p>
        )}
      </div>

      <aside className="lg:sticky lg:top-4 h-fit space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">结算</h2>
          <p className="mt-1 text-xs text-zinc-500">
            {shopName}（#{shopId}）
          </p>
        </div>

        {clientError && (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">{clientError}</p>
        )}

        <div className="max-h-64 space-y-2 overflow-y-auto text-sm">
          {cartLines.length === 0 ? (
            <p className="text-zinc-500">购物车为空，请在左侧添加商品。</p>
          ) : (
            cartLines.map((r) => (
              <div key={r.skuId} className="flex justify-between gap-2 border-b border-zinc-200/80 pb-2 last:border-0">
                <span className="min-w-0 text-zinc-700">
                  <span className="block truncate font-medium">{r.productName}</span>
                  <span className="text-xs text-zinc-500">
                    {r.skuName} × {r.qty}
                  </span>
                </span>
                <span className="shrink-0 tabular-nums text-zinc-900">
                  ¥{(r.price * r.qty).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="space-y-2 border-t border-zinc-200 pt-3 text-sm">
          <div className="flex justify-between text-zinc-700">
            <span>商品标价合计</span>
            <span className="tabular-nums">¥{totalYuan.toFixed(2)}</span>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700" htmlFor="pos_actual_pay">
              实收金额（可改）
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              可低于标价（让利）或高于标价（多收/凑整）。改价差额 = 标价合计 − 实收，写入订单的店铺优惠字段（多收时为负数）。
            </p>
            <input
              id="pos_actual_pay"
              type="text"
              inputMode="decimal"
              value={actualPayInput}
              onChange={(ev) => setActualPayInput(ev.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base font-medium tabular-nums text-zinc-900"
            />
          </div>
          {priceAdjust.label === "none" && (
            <div className="flex justify-between text-zinc-500">
              <span>改价差额</span>
              <span className="tabular-nums">¥0.00</span>
            </div>
          )}
          {priceAdjust.label === "discount" && (
            <div className="flex justify-between text-zinc-600">
              <span>店铺让利（自动）</span>
              <span className="tabular-nums text-amber-800">
                −¥{priceAdjust.delta.toFixed(2)}
              </span>
            </div>
          )}
          {priceAdjust.label === "surcharge" && (
            <div className="flex justify-between text-zinc-600">
              <span>多收 / 凑整（自动）</span>
              <span className="tabular-nums text-blue-800">
                +¥{(-priceAdjust.delta).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex items-baseline justify-between border-t border-zinc-200 pt-2">
            <span className="font-medium text-zinc-800">实收合计</span>
            <span className="text-xl font-semibold tabular-nums text-emerald-800">¥{displayActualPay}</span>
          </div>
        </div>

        <form action={createOfflinePosOrderAction} onSubmit={handleSubmit} className="space-y-3">
          <input type="hidden" name="shop_shops" value={shopId} />
          <input ref={linesHiddenRef} type="hidden" name="lines_json" value="" />
          <input type="hidden" name="actual_pay_amount" value={actualPayInput.trim()} />
          <input type="hidden" name="user_users" value={memberPick?.userId ?? ""} />

          <div>
            <span className="block text-xs font-medium text-zinc-700">会员（可选）</span>
            <p className="mt-0.5 text-xs text-zinc-500">输入手机号查询，系统将自动关联会员；匿名顾客不填即可。</p>
            <div className="mt-1 flex gap-2">
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                id="pos_member_phone"
                value={memberPhone}
                onChange={(ev) => {
                  setMemberPhone(ev.target.value);
                  setMemberPick(null);
                  setLookupError(null);
                }}
                className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
                placeholder="会员手机号"
              />
              <button
                type="button"
                disabled={lookupPending}
                onClick={() => void handleLookupMember()}
                className="shrink-0 rounded-md border border-emerald-700 bg-white px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 disabled:opacity-50"
              >
                {lookupPending ? "查询中…" : "查询"}
              </button>
            </div>
            {lookupError && (
              <p className="mt-1 text-xs text-red-600">{lookupError}</p>
            )}
            {memberPick && (
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-md bg-emerald-50/80 px-3 py-2 text-xs text-emerald-950">
                <span>
                  已选择：{memberPick.nickname?.trim() || `用户 #${memberPick.userId}`} ·{" "}
                  {maskMobile(memberPick.mobile)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMemberPick(null);
                    setMemberPhone("");
                    setLookupError(null);
                  }}
                  className="font-medium text-emerald-800 underline hover:no-underline"
                >
                  清除
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700" htmlFor="pos_buyer_remark">
              买家备注
            </label>
            <input
              id="pos_buyer_remark"
              name="buyer_remark"
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700" htmlFor="pos_seller_remark">
              商家备注
            </label>
            <input
              id="pos_seller_remark"
              name="seller_remark"
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            />
          </div>

          <PosSubmitButton cartEmpty={cartLines.length === 0} />
        </form>
      </aside>
    </div>
  );
}
