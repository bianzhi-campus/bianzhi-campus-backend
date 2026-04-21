import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteShopAction } from "@/app/admin/shop/actions/commerce";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessPlatformConsole, getConsoleAuth } from "@/server/admin-auth";

type ShopRow = {
  id: string;
  name: string;
  created_at: string;
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function PlatformShopsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirect("/admin/portal?error=forbidden");

  const { shops } = await adminGraphqlExecute<{ shops: ShopRow[] }>(`
    query PlatformShopsList {
      shops(order_by: { id: desc }) {
        id
        name
        created_at
      }
    }
  `);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-900">店铺</h1>
        <Link
          href="/admin/platform/shops/new"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          新建店铺
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-600">
        商品与订单由<strong className="text-zinc-800">店铺管理员</strong>在「店铺后台」维护；平台侧仅管理店名、扩展配置与成员。
      </p>

      {sp.error === "delete" && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          删除失败：请先处理该店下的商品、订单等关联数据。
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">名称</th>
              <th className="px-4 py-3 font-medium">创建时间</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {shops.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  暂无店铺，请先新建。
                </td>
              </tr>
            ) : (
              shops.map((s) => (
                <tr key={s.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-mono text-zinc-600">{s.id}</td>
                  <td className="px-4 py-3 text-zinc-900">{s.name}</td>
                  <td className="px-4 py-3 text-zinc-500">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/platform/shops/${s.id}/edit`}
                        className="text-emerald-700 hover:underline"
                      >
                        编辑
                      </Link>
                      <Link
                        href={`/admin/platform/shops/${s.id}/admins`}
                        className="text-zinc-700 hover:underline"
                      >
                        成员与管理员
                      </Link>
                      <form action={deleteShopAction} className="inline">
                        <input type="hidden" name="_ctx" value="platform" />
                        <input type="hidden" name="id" value={s.id} />
                        <button type="submit" className="text-red-600 hover:underline">
                          删除
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
