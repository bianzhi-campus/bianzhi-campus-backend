import Link from "next/link";

export default function AdminShopHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">店铺概览</h1>
      <p className="mt-2 text-zinc-600">
        店铺名称与扩展配置等由<strong className="text-zinc-800">平台管理员</strong>在平台后台维护。您作为店铺管理员，在本后台维护
        <strong className="text-zinc-800">当前店铺的商品</strong>与 SKU，并可使用线下收银创建门店订单。
      </p>
      <ul className="mt-8 flex flex-col gap-3 text-sm">
        <li>
          <Link href="/admin/shop/products" className="font-medium text-emerald-700 hover:underline">
            商品
          </Link>
          <span className="text-zinc-500"> — 商品信息与 SKU</span>
        </li>
        <li>
          <Link href="/admin/shop/orders" className="font-medium text-emerald-700 hover:underline">
            订单
          </Link>
          <span className="text-zinc-500"> — 用户订单与明细</span>
        </li>
        <li>
          <Link href="/admin/shop/pos" className="font-medium text-emerald-700 hover:underline">
            收银台
          </Link>
          <span className="text-zinc-500"> — 线下收款、扣库存并生成订单</span>
        </li>
      </ul>
    </div>
  );
}
