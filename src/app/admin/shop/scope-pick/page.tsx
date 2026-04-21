import Link from "next/link";
import { redirect } from "next/navigation";

import { enterShopScopeAction } from "@/app/admin/scope-actions";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveShopScope } from "@/server/admin-console-scope";
import { getConsoleAuth } from "@/server/admin-auth";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

/** 多店管理员且未设置会话 Cookie、用户表也无可用默认时，先选择要管理的店铺 */
export default async function ShopScopePickPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");

  const shopScope = await resolveShopScope(auth);
  if ("redirect" in shopScope) {
    redirect(shopScope.redirect);
  }
  if (shopScope.kind !== "need_shop_pick") {
    redirect("/admin/shop");
  }

  const ids = shopScope.shopIds;
  const { shops } = await adminGraphqlExecute<{
    shops: Array<{ id: string; name: string }>;
  }>(
    `
    query ScopePickShops($ids: [bigint!]!) {
      shops(where: { id: { _in: $ids } }, order_by: { name: asc }) {
        id
        name
      }
    }
  `,
    { ids }
  );

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">植得校园 · 店铺后台</p>
        <h1 className="mt-1 text-xl font-semibold text-zinc-900">请选择要管理的店铺</h1>
        <p className="mt-2 text-sm text-zinc-600">
          您担任多间店铺管理员。若已在用户资料中设置默认店铺，将自动进入；否则请在此选择。选择后可勾选「设为默认」以保存到账号。
        </p>

        {sp.error === "invalid" && (
          <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">请选择一间店铺。</p>
        )}

        <form action={enterShopScopeAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="shop_id" className="block text-sm font-medium text-zinc-700">
              店铺
            </label>
            <select
              id="shop_id"
              name="shop_id"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900"
              defaultValue=""
            >
              <option value="" disabled>
                请选择
              </option>
              {shops.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              name="set_as_default"
              className="mt-0.5 rounded border-zinc-300"
              defaultChecked
            />
            <span>将所选店铺设为下次登录店铺后台的默认店铺（写入用户表）</span>
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            进入店铺后台
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/admin/portal" className="text-emerald-700 hover:underline">
            返回后台选择
          </Link>
        </p>
      </div>
    </div>
  );
}
