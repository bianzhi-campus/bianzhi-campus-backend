import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateShopAction } from "@/app/admin/shop/actions/commerce";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessPlatformConsole, canWriteShop, getConsoleAuth } from "@/server/admin-auth";

function jsonFieldToText(value: unknown): string {
  if (value == null) return "[]";
  return JSON.stringify(value, null, 2);
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

/** 平台管理员编辑店铺配置；商品运营由店铺管理员在店铺后台处理 */
export default async function PlatformEditShopPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;

  const { shops_by_pk: shop } = await adminGraphqlExecute<{
    shops_by_pk: {
      id: string;
      name: string;
      extend_shop_ids: unknown;
      hidden_product_ids: unknown;
    } | null;
  }>(
    `
    query Shop($id: bigint!) {
      shops_by_pk(id: $id) {
        id
        name
        extend_shop_ids
        hidden_product_ids
      }
    }
  `,
    { id }
  );

  if (!shop) notFound();

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }
  if (auth.mode === "jwt" && !canWriteShop(auth.access, shop.id)) {
    redirect("/admin/platform/shops");
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/platform/shops" className="text-sm text-emerald-700 hover:underline">
          ← 返回列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">编辑店铺</h1>
        <p className="mt-1 text-sm text-zinc-500">商品与上架请在店铺后台由店铺管理员维护。</p>
      </div>

      {sp.error === "json" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          JSON 格式错误：扩展店铺 ID、隐藏商品 ID 须为 JSON 数组。
        </p>
      )}

      <form action={updateShopAction} className="max-w-2xl space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
        <input type="hidden" name="_ctx" value="platform" />
        <input type="hidden" name="id" value={shop.id} />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            店铺名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={shop.name}
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
            rows={4}
            defaultValue={jsonFieldToText(shop.extend_shop_ids)}
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
            rows={4}
            defaultValue={jsonFieldToText(shop.hidden_product_ids)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
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
