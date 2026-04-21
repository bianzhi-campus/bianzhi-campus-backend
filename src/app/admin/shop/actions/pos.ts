"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { normalizeMobile } from "@/server/phone-password-auth";
import {
  canWriteShop,
  getConsoleAuth,
  type ConsoleAuth,
} from "@/server/admin-auth";

function redirectPosError(code: string): never {
  redirect(`/admin/shop/pos?error=${encodeURIComponent(code)}`);
}

async function requireAuth(): Promise<ConsoleAuth> {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  return auth;
}

function assertShopWrite(auth: ConsoleAuth, shopId: string): void {
  if (auth.mode === "legacy_full") return;
  if (canWriteShop(auth.access, shopId)) return;
  redirectPosError("forbidden");
}

/** 线下收银需记录操作人，开发会话无 JWT 时无法审计 */
function requireJwtActor(auth: ConsoleAuth): string {
  if (auth.mode === "jwt") {
    return auth.access.userId;
  }
  redirectPosError("need_jwt");
}

export type PosMemberLookupResult =
  | { ok: true; userId: string; nickname: string | null; mobile: string }
  | { ok: false; message: string };

/**
 * 收银台：按手机号查 `users.mobile`，解析出会员 id（需具备当前店铺写权限）。
 */
export async function lookupMemberByMobileForPosAction(
  shopId: string,
  phoneRaw: string
): Promise<PosMemberLookupResult> {
  const auth = await requireAuth();
  assertShopWrite(auth, shopId);

  const mobile = normalizeMobile(phoneRaw);
  if (!mobile) {
    return { ok: false, message: "请输入手机号" };
  }
  if (!/^\d{5,20}$/.test(mobile)) {
    return { ok: false, message: "手机号格式不正确" };
  }

  const { users } = await adminGraphqlExecute<{
    users: Array<{ id: string; nickname: string | null; mobile: string | null }>;
  }>(
    `
    query PosMemberByMobile($mobile: String!) {
      users(where: { mobile: { _eq: $mobile } }, limit: 5) {
        id
        nickname
        mobile
      }
    }
  `,
    { mobile }
  );

  if (users.length === 0) {
    return { ok: false, message: "未找到该手机号对应的会员" };
  }
  if (users.length > 1) {
    return { ok: false, message: "存在多条相同手机号记录，请联系平台处理" };
  }

  const u = users[0];
  return {
    ok: true,
    userId: u.id,
    nickname: u.nickname,
    mobile: (u.mobile ?? mobile).trim(),
  };
}

type PosLine = { product_sku_id: string; quantity: number };

function parseLinesJson(raw: string): PosLine[] {
  const t = raw.trim();
  if (!t) throw new Error("empty");
  const v = JSON.parse(t) as unknown;
  if (!Array.isArray(v) || v.length === 0) throw new Error("shape");
  const out: PosLine[] = [];
  for (const row of v) {
    if (typeof row !== "object" || row === null) throw new Error("shape");
    const o = row as Record<string, unknown>;
    const product_sku_id = String(o.product_sku_id ?? "").trim();
    const q = o.quantity;
    const quantity = typeof q === "number" ? q : parseInt(String(q ?? ""), 10);
    if (!product_sku_id || !Number.isFinite(quantity) || quantity < 1) throw new Error("shape");
    out.push({ product_sku_id, quantity });
  }
  return out;
}

/** 合并同一 SKU 多行 */
function aggregateLines(lines: PosLine[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const { product_sku_id, quantity } of lines) {
    m.set(product_sku_id, (m.get(product_sku_id) ?? 0) + quantity);
  }
  return m;
}

function moneyStr(n: number): string {
  return n.toFixed(2);
}

/** 金额按分四舍五入，避免浮点误差 */
function roundMoneyYuan(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * 解析实收金额：空则按标价合计。
 * `discount` = 标价 − 实收，写入 `discount_amount`：为正表示店铺让利，为负表示多收（如凑整、附加费）。
 */
function parseActualPayYuan(
  raw: string | undefined,
  productTotal: number
): { ok: true; actualPay: number; discount: number } | { ok: false; code: "invalid_pay" } {
  const productRounded = roundMoneyYuan(productTotal);
  const t = String(raw ?? "").trim();
  const actualRaw = t === "" ? productRounded : parseFloat(t);
  if (!Number.isFinite(actualRaw) || actualRaw <= 0) {
    return { ok: false, code: "invalid_pay" };
  }
  const actualPay = roundMoneyYuan(actualRaw);
  const discount = roundMoneyYuan(productRounded - actualPay);
  return { ok: true, actualPay, discount };
}

type SkuRow = {
  id: string;
  name: string;
  price: string;
  stock: string;
  image_url: string | null;
  is_shelved: boolean;
  product: {
    id: string;
    name: string;
    cover_image_url: string | null;
    shop_shops: string;
  };
};

async function fetchSkusForShop(
  shopId: string,
  skuIds: string[]
): Promise<Map<string, SkuRow>> {
  const { product_skus } = await adminGraphqlExecute<{
    product_skus: SkuRow[];
  }>(
    `
    query PosSkus($shopId: bigint!, $ids: [bigint!]!) {
      product_skus(
        where: {
          id: { _in: $ids }
          product: { shop_shops: { _eq: $shopId } }
        }
      ) {
        id
        name
        price
        stock
        image_url
        is_shelved
        product {
          id
          name
          cover_image_url
          shop_shops
        }
      }
    }
  `,
    { shopId, ids: skuIds }
  );
  const map = new Map<string, SkuRow>();
  for (const r of product_skus) {
    // 与表单/JSON 中的字符串 id 对齐（Hasura 有时返回 number，Map 中 2 !== "2"）
    map.set(String(r.id), r);
  }
  return map;
}

async function decStockGuarded(skuId: string, qty: number): Promise<boolean> {
  const { update_product_skus } = await adminGraphqlExecute<{
    update_product_skus: { affected_rows: number } | null;
  }>(
    `
    mutation PosDecStock($id: bigint!, $qty: bigint!, $neg: bigint!) {
      update_product_skus(
        where: { _and: [{ id: { _eq: $id } }, { stock: { _gte: $qty } }] }
        _inc: { stock: $neg }
      ) {
        affected_rows
      }
    }
  `,
    { id: skuId, qty: String(qty), neg: String(-qty) }
  );
  return (update_product_skus?.affected_rows ?? 0) === 1;
}

async function incStock(skuId: string, qty: number): Promise<void> {
  await adminGraphqlExecute(
    `
    mutation PosIncStock($id: bigint!, $qty: bigint!) {
      update_product_skus_by_pk(pk_columns: { id: $id }, _inc: { stock: $qty }) {
        id
      }
    }
  `,
    { id: skuId, qty: String(qty) }
  );
}

/**
 * 线下收银：创建 `type=offline` 的用户单 + 单店铺单 + 明细，当场已付、门店直购履约。
 * 先扣库存再写入订单；任一步失败则回滚已扣库存。
 */
export async function createOfflinePosOrderAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  const actorUserId = requireJwtActor(auth);

  const shop_shops = String(formData.get("shop_shops") ?? "").trim();
  if (!shop_shops) redirectPosError("no_shop");

  assertShopWrite(auth, shop_shops);

  let lines: PosLine[];
  try {
    lines = parseLinesJson(String(formData.get("lines_json") ?? ""));
  } catch {
    redirectPosError("lines_json");
  }

  const aggregated = aggregateLines(lines);
  const skuIds = [...aggregated.keys()];
  if (skuIds.length === 0) redirectPosError("empty_cart");

  const skuMap = await fetchSkusForShop(shop_shops, skuIds);
  if (skuMap.size !== skuIds.length) redirectPosError("sku_mismatch");

  for (const id of skuIds) {
    const row = skuMap.get(id);
    if (!row) redirectPosError("sku_mismatch");
    if (!row.is_shelved) redirectPosError("not_shelved");
    const need = aggregated.get(id)!;
    const stock = parseInt(row.stock, 10);
    if (Number.isNaN(stock) || stock < need) redirectPosError("stock");
  }

  const memberRaw = String(formData.get("user_users") ?? "").trim();
  const user_users: string | null = memberRaw ? memberRaw : null;

  const buyer_remark = String(formData.get("buyer_remark") ?? "").trim() || null;
  const seller_remark = String(formData.get("seller_remark") ?? "").trim() || null;

  const decremented: Array<{ skuId: string; qty: number }> = [];

  try {
    for (const [skuId, qty] of aggregated) {
      const ok = await decStockGuarded(skuId, qty);
      if (!ok) {
        throw new Error("stock_dec");
      }
      decremented.push({ skuId, qty });
    }

    let productTotal = 0;
    const itemRows: Array<Record<string, unknown>> = [];
    for (const [skuId, qty] of aggregated) {
      const sku = skuMap.get(skuId);
      if (!sku) throw new Error("sku_missing");
      const unit = parseFloat(sku.price);
      if (Number.isNaN(unit)) throw new Error("price");
      const lineAmount = unit * qty;
      productTotal += lineAmount;

      const cover =
        sku.image_url?.trim() ||
        sku.product.cover_image_url?.trim() ||
        "";

      itemRows.push({
        product_cover_image_url: cover,
        product_name: sku.product.name,
        product_sku_name: sku.name,
        product_sku_price: sku.price,
        product_sku_product_skus: skuId,
        product_sku_image_url: sku.image_url?.trim() || null,
        quantity: String(qty),
      });
    }

    productTotal = roundMoneyYuan(productTotal);

    const payParsed = parseActualPayYuan(
      String(formData.get("actual_pay_amount") ?? ""),
      productTotal
    );
    if (!payParsed.ok) {
      redirectPosError(payParsed.code);
    }
    const { actualPay, discount } = payParsed;

    const delivery_fee = 0;
    const productAmountStr = moneyStr(productTotal);
    const discountStr = moneyStr(discount);
    const settleStr = moneyStr(actualPay);
    const now = new Date().toISOString();

    await adminGraphqlExecute(
      `
      mutation InsertOfflinePos($object: shop_userorders_insert_input!) {
        insert_shop_userorders_one(object: $object) {
          id
        }
      }
    `,
      {
        object: {
          type: "offline",
          pay_amount: settleStr,
          shop_shops: shop_shops,
          created_by_users: actorUserId,
          user_users: user_users,
          shop_orders: {
            data: [
              {
                shop_shops: shop_shops,
                fulfillment_type: "store_direct",
                pay_status: "paid",
                ship_status: "completed",
                order_status: "completed",
                product_amount: productAmountStr,
                delivery_fee: String(delivery_fee),
                discount_amount: discountStr,
                settle_amount: settleStr,
                paid_at: now,
                confirmed_at: now,
                completed_at: now,
                buyer_remark,
                seller_remark,
                user_users: user_users,
                shop_order_items: { data: itemRows },
              },
            ],
          },
        },
      }
    );
  } catch {
    for (const d of decremented.reverse()) {
      try {
        await incStock(d.skuId, d.qty);
      } catch {
        /* best-effort rollback */
      }
    }
    redirectPosError("insert_failed");
  }

  revalidatePath("/admin/shop");
  revalidatePath("/admin/shop/pos");
  revalidatePath("/admin/shop/orders");
  redirect("/admin/shop/pos?ok=1");
}
