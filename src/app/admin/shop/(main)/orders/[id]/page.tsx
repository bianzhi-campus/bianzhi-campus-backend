import Link from "next/link";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveShopScopeForWorkspace } from "@/server/admin-console-scope";
import {
  canAccessShopConsole,
  canWriteShop,
  getConsoleAuth,
  type ConsoleAuth,
} from "@/server/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
};

type OrderItemRow = {
  id: string;
  product_name: string;
  product_sku_name: string;
  product_sku_price: string;
  quantity: string;
  product_cover_image_url: string;
};

type ShopOrderRow = {
  id: string;
  fulfillment_type: string;
  pay_status: string;
  ship_status: string;
  order_status: string | null;
  product_amount: string | null;
  delivery_fee: string;
  discount_amount: string;
  settle_amount: string;
  paid_at: string | null;
  buyer_remark: string | null;
  seller_remark: string | null;
  shop_order_items: OrderItemRow[];
};

type UserOrderDetail = {
  id: string;
  created_at: string;
  type: string;
  pay_amount: string;
  shop_shops: string;
  shop: { id: string; name: string };
  user: { id: string; nickname: string | null; mobile: string | null } | null;
  userByCreatedByUsers: { id: string; nickname: string | null } | null;
  shop_orders: ShopOrderRow[];
};

function assertCanViewOrder(auth: ConsoleAuth, shopId: string): void {
  if (auth.mode === "legacy_full") return;
  if (canWriteShop(auth.access, shopId)) return;
  redirect("/admin/shop/orders?error=forbidden");
}

function typeLabel(t: string): string {
  if (t === "offline") return "线下";
  if (t === "online") return "线上";
  return t || "—";
}

function fulfillLabel(t: string): string {
  const m: Record<string, string> = {
    campus_delivery: "校园配",
    store_express: "快递",
    store_pickup: "门店自提",
    store_direct: "门店直购",
    store_delivery: "门店自配",
  };
  return m[t] ?? t;
}

export default async function ShopOrderDetailPage({ params }: Props) {
  const { id: rawId } = await params;
  const id = rawId?.trim();
  if (!id) redirect("/admin/shop/orders");

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessShopConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  await resolveShopScopeForWorkspace(auth);

  const { shop_userorders_by_pk: order } = await adminGraphqlExecute<{
    shop_userorders_by_pk: UserOrderDetail | null;
  }>(
    `
    query ShopUserOrderDetail($id: bigint!) {
      shop_userorders_by_pk(id: $id) {
        id
        created_at
        type
        pay_amount
        shop_shops
        shop {
          id
          name
        }
        user {
          id
          nickname
          mobile
        }
        userByCreatedByUsers {
          id
          nickname
        }
        shop_orders(order_by: { id: asc }) {
          id
          fulfillment_type
          pay_status
          ship_status
          order_status
          product_amount
          delivery_fee
          discount_amount
          settle_amount
          paid_at
          buyer_remark
          seller_remark
          shop_order_items(order_by: { id: asc }) {
            id
            product_name
            product_sku_name
            product_sku_price
            quantity
            product_cover_image_url
          }
        }
      }
    }
  `,
    { id }
  );

  if (!order) {
    return (
      <div>
        <p className="text-zinc-600">订单不存在。</p>
        <Link href="/admin/shop/orders" className="mt-4 inline-block text-emerald-700 hover:underline">
          ← 返回列表
        </Link>
      </div>
    );
  }

  assertCanViewOrder(auth, String(order.shop_shops));

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/shop/orders" className="text-sm text-emerald-700 hover:underline">
          ← 订单列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">
          用户订单（shop_userorders）#{order.id}
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          {order.shop.name} · {typeLabel(order.type)} ·{" "}
          {new Date(order.created_at).toLocaleString("zh-CN")}
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          下方「店铺订单」为 shop_orders，一笔用户单可对应多条（线上一单多店）；线下单通常一条。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">用户侧</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">实付金额</dt>
              <dd className="tabular-nums font-medium text-zinc-900">
                ¥{parseFloat(order.pay_amount).toFixed(2)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">下单会员</dt>
              <dd className="text-right text-zinc-800">
                {order.user ? (
                  <>
                    {order.user.nickname?.trim() || `用户 #${order.user.id}`}
                    {order.user.mobile && (
                      <span className="ml-2 text-zinc-500">({order.user.mobile})</span>
                    )}
                  </>
                ) : (
                  "匿名"
                )}
              </dd>
            </div>
            {order.type === "offline" && order.userByCreatedByUsers && (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">收银操作人</dt>
                <dd className="text-right text-zinc-800">
                  {order.userByCreatedByUsers.nickname?.trim() ||
                    `#${order.userByCreatedByUsers.id}`}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-zinc-900">店铺订单（shop_orders）</h2>
      <div className="mt-3 space-y-6">
        {order.shop_orders.map((so) => (
          <section
            key={so.id}
            className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
          >
            <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm text-zinc-800">店铺单 #{so.id}</span>
                <span className="text-xs text-zinc-600">{fulfillLabel(so.fulfillment_type)}</span>
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
                <div>
                  <dt className="text-zinc-500">支付</dt>
                  <dd>{so.pay_status}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">发货/履约</dt>
                  <dd>{so.ship_status}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">订单状态</dt>
                  <dd>{so.order_status ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">支付时间</dt>
                  <dd>
                    {so.paid_at
                      ? new Date(so.paid_at).toLocaleString("zh-CN")
                      : "—"}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="grid gap-3 border-b border-zinc-100 px-4 py-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <span className="text-zinc-500">商品标价</span>
                <span className="ml-2 tabular-nums">
                  ¥
                  {so.product_amount != null
                    ? parseFloat(so.product_amount).toFixed(2)
                    : "—"}
                </span>
              </div>
              <div>
                <span className="text-zinc-500">运费</span>
                <span className="ml-2 tabular-nums">¥{parseFloat(so.delivery_fee).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-zinc-500">店铺优惠</span>
                <span className="ml-2 tabular-nums">
                  ¥{parseFloat(so.discount_amount).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-medium text-zinc-800">结算</span>
                <span className="ml-2 tabular-nums font-semibold text-emerald-800">
                  ¥{parseFloat(so.settle_amount).toFixed(2)}
                </span>
              </div>
            </div>
            {(so.buyer_remark || so.seller_remark) && (
              <div className="border-b border-zinc-100 px-4 py-2 text-xs text-zinc-600">
                {so.buyer_remark && <p>买家备注：{so.buyer_remark}</p>}
                {so.seller_remark && <p>商家备注：{so.seller_remark}</p>}
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-100 text-sm">
                <thead className="bg-zinc-50 text-left text-xs text-zinc-600">
                  <tr>
                    <th className="px-4 py-2">商品</th>
                    <th className="px-4 py-2">规格</th>
                    <th className="px-4 py-2">单价</th>
                    <th className="px-4 py-2">数量</th>
                    <th className="px-4 py-2">小计</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {so.shop_order_items.map((it) => {
                    const unit = parseFloat(it.product_sku_price);
                    const q = parseInt(it.quantity, 10);
                    const sub = (Number.isFinite(unit) ? unit : 0) * (Number.isFinite(q) ? q : 0);
                    return (
                      <tr key={it.id}>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            {it.product_cover_image_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={it.product_cover_image_url}
                                alt=""
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded bg-zinc-100" />
                            )}
                            <span className="font-medium text-zinc-900">{it.product_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-zinc-700">{it.product_sku_name}</td>
                        <td className="px-4 py-2 tabular-nums">¥{unit.toFixed(2)}</td>
                        <td className="px-4 py-2 tabular-nums">{it.quantity}</td>
                        <td className="px-4 py-2 tabular-nums">¥{sub.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
