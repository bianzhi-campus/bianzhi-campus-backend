import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/admin/login/actions";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import {
  canAccessPlatformConsole,
  canAccessSiteConsole,
  canAccessShopConsole,
  getConsoleAuth,
} from "@/server/admin-auth";

type Props = {
  searchParams: Promise<{ error?: string; welcome?: string; pick?: string }>;
};

export default async function AdminPortalChooserPage({ searchParams }: Props) {
  const sp = await searchParams;
  const auth = await getConsoleAuth();
  if (!auth) {
    redirect("/admin/login");
  }

  const showPlatform = canAccessPlatformConsole(auth);
  const showSite = canAccessSiteConsole(auth);
  const showShop = canAccessShopConsole(auth);
  const count = [showPlatform, showSite, showShop].filter(Boolean).length;

  const label =
    auth.mode === "legacy_full"
      ? "开发会话"
      : auth.access.nickname?.trim() || `用户 #${auth.access.userId}`;

  let campusOptions: Array<{ id: string; name: string }> = [];
  let shopOptions: Array<{ id: string; name: string }> = [];

  if (auth.mode === "jwt") {
    const cids = auth.access.campusAdminIds;
    if (cids.length > 0) {
      const d = await adminGraphqlExecute<{
        campuses: Array<{ id: string; name: string }>;
      }>(
        `
        query PortalCampuses($ids: [bigint!]!) {
          campuses(where: { id: { _in: $ids } }, order_by: { id: asc }) {
            id
            name
          }
        }
      `,
        { ids: cids }
      );
      campusOptions = d.campuses;
    }
    const sids = auth.access.shopAdminIds;
    if (sids.length > 0) {
      const d = await adminGraphqlExecute<{
        shops: Array<{ id: string; name: string }>;
      }>(
        `
        query PortalShops($ids: [bigint!]!) {
          shops(where: { id: { _in: $ids } }, order_by: { id: asc }) {
            id
            name
          }
        }
      `,
        { ids: sids }
      );
      shopOptions = d.shops;
    }
  }

  const jwt = auth.mode === "jwt" ? auth.access : null;
  const siteNeedsPick = jwt && jwt.campusAdminIds.length > 1;
  const shopNeedsPick = jwt && jwt.shopAdminIds.length > 1;

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">植得校园</p>
            <h1 className="text-2xl font-semibold text-zinc-900">选择后台</h1>
            <p className="mt-1 text-sm text-zinc-500">
              下方仅展示您当前账号<strong className="text-zinc-700">有权进入</strong>的后台入口；若您管理多所学校或多间店铺，请先选择要进入的那一所。
            </p>
            {count > 0 && (
              <p className="mt-2 text-xs text-zinc-400">共 {count} 类后台可进入</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="truncate text-sm text-zinc-600" title={label}>
              {label}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                退出
              </button>
            </form>
          </div>
        </header>

        {sp.welcome === "1" && (
          <p className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            登录成功，请选择要进入的后台。
          </p>
        )}

        {sp.error === "forbidden" && (
          <p className="mb-6 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
            无权访问该后台或执行该操作，已返回选择页。
          </p>
        )}

        {sp.pick === "site" && (
          <p className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
            您担任多所学校管理员。进入站点后台时将优先使用账号中的<strong>默认学校</strong>；未设置时会引导选择。进入后可在侧栏切换或更新默认。
          </p>
        )}
        {sp.pick === "shop" && (
          <p className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
            您担任多间店铺管理员。进入店铺后台时将优先使用账号中的<strong>默认店铺</strong>；未设置时会引导选择。进入后可在侧栏切换或更新默认。
          </p>
        )}

        {auth.mode === "jwt" && (
          <p className="mb-6 text-sm text-zinc-600">
            {auth.access.isPlatformAdmin && (
              <span className="text-zinc-800">平台管理员（users.role=admin）</span>
            )}
            {auth.access.campusAdminIds.length > 0 && (
              <span className={auth.access.isPlatformAdmin ? "ml-2 text-zinc-800" : "text-zinc-800"}>
                学校管理员（campus_users.role=admin）· {auth.access.campusAdminIds.length} 校
              </span>
            )}
            {auth.access.shopAdminIds.length > 0 && (
              <span className="ml-2 text-zinc-800">
                店铺管理员（shop_users.role=admin）· {auth.access.shopAdminIds.length} 店
              </span>
            )}
          </p>
        )}
        {auth.mode === "legacy_full" && (
          <p className="mb-6 text-sm text-amber-800">当前为旧版会话（全量权限），仅建议开发环境使用。</p>
        )}

        <h2 className="mb-4 text-sm font-medium text-zinc-500">可进入的后台</h2>
        <ul className="grid gap-4 sm:grid-cols-1">
          {showPlatform && (
            <li>
              <Link
                href="/admin/platform"
                className="block rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-zinc-900">平台后台</h3>
                <p className="mt-2 text-sm text-zinc-600">
                  需 users.role 为 admin。管理平台用户、学校、店铺及指派管理员等。
                </p>
                <p className="mt-3 text-sm font-medium text-emerald-700">进入 →</p>
              </Link>
            </li>
          )}
          {showSite && (
            <li className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">站点后台</h3>
              <p className="mt-2 text-sm text-zinc-600">
                需在本校 campus_users 中为 admin。维护学校、楼栋、房间等。
              </p>

              {auth.mode === "legacy_full" && (
                <div className="mt-4">
                  <Link
                    href="/admin/site"
                    className="inline-block text-sm font-medium text-emerald-700 hover:underline"
                  >
                    进入站点后台 →
                  </Link>
                </div>
              )}

              {auth.mode === "jwt" && campusOptions.length === 1 && (
                <div className="mt-4">
                  <Link
                    href="/admin/site"
                    className="inline-block text-sm font-medium text-emerald-700 hover:underline"
                  >
                    进入站点后台 — {campusOptions[0].name} →
                  </Link>
                </div>
              )}

              {auth.mode === "jwt" && siteNeedsPick && (
                <div className="mt-4">
                  <Link
                    href="/admin/site"
                    className="inline-block text-sm font-medium text-emerald-700 hover:underline"
                  >
                    进入站点后台 →
                  </Link>
                  <p className="mt-2 text-xs text-zinc-500">
                    优先使用用户表中的默认学校；无默认时将打开选择页。进入后可在侧栏切换，并可勾选「设为下次登录默认」。
                  </p>
                </div>
              )}
            </li>
          )}
          {showShop && (
            <li className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">店铺后台</h3>
              <p className="mt-2 text-sm text-zinc-600">
                需在本店 shop_users 中为 admin。维护店铺资料、商品等。
              </p>

              {auth.mode === "legacy_full" && (
                <div className="mt-4">
                  <Link
                    href="/admin/shop"
                    className="inline-block text-sm font-medium text-emerald-700 hover:underline"
                  >
                    进入店铺后台 →
                  </Link>
                </div>
              )}

              {auth.mode === "jwt" && shopOptions.length === 1 && (
                <div className="mt-4">
                  <Link
                    href="/admin/shop"
                    className="inline-block text-sm font-medium text-emerald-700 hover:underline"
                  >
                    进入店铺后台 — {shopOptions[0].name} →
                  </Link>
                </div>
              )}

              {auth.mode === "jwt" && shopNeedsPick && (
                <div className="mt-4">
                  <Link
                    href="/admin/shop"
                    className="inline-block text-sm font-medium text-emerald-700 hover:underline"
                  >
                    进入店铺后台 →
                  </Link>
                  <p className="mt-2 text-xs text-zinc-500">
                    优先使用用户表中的默认店铺；无默认时将打开选择页。进入后可在侧栏切换，并可勾选「设为下次登录默认」。
                  </p>
                </div>
              )}
            </li>
          )}
        </ul>

        {!showPlatform && !showSite && !showShop && (
          <p className="text-sm text-red-700">当前账号无任何后台入口，请退出后联系管理员配置权限。</p>
        )}

        <p className="mt-10 text-center text-sm text-zinc-500">
          <Link href="/" className="text-emerald-700 hover:underline">
            返回网站首页
          </Link>
        </p>
      </div>
    </div>
  );
}
