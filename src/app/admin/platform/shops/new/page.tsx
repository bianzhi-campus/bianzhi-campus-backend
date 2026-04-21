import Link from "next/link";
import { redirect } from "next/navigation";

import { createShopAction } from "@/app/admin/shop/actions/commerce";
import { canAccessPlatformConsole, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function PlatformNewShopPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirect("/admin/portal?error=forbidden");

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/platform/shops" className="text-sm text-emerald-700 hover:underline">
          ← 返回列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">新建店铺</h1>
      </div>

      {sp.error === "name" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">请填写店铺名称</p>
      )}
      {sp.error === "json" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          JSON 格式错误：扩展店铺 ID、隐藏商品 ID 须为 JSON 数组，例如 [1,2]。
        </p>
      )}

      <form action={createShopAction} className="max-w-2xl space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
        <input type="hidden" name="_ctx" value="platform" />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            店铺名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="extend_shop_ids" className="block text-sm font-medium text-zinc-700">
            扩展店铺 ID 列表（JSON 数组）
          </label>
          <textarea
            id="extend_shop_ids"
            name="extend_shop_ids"
            rows={3}
            placeholder='例如：[2, 3] 表示同时展示这些店铺的商品'
            defaultValue="[]"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm"
          />
        </div>
        <div>
          <label htmlFor="hidden_product_ids" className="block text-sm font-medium text-zinc-700">
            隐藏商品 ID 列表（JSON 数组）
          </label>
          <textarea
            id="hidden_product_ids"
            name="hidden_product_ids"
            rows={3}
            placeholder="在本店（含扩展店来源）中不展示的商品 ID"
            defaultValue="[]"
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            保存
          </button>
          <Link
            href="/admin/platform/shops"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
