import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  addShopAdminByMobileAction,
  removeShopUserAction,
  updateShopUserRoleAction,
} from "@/app/admin/platform/actions/platform";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessPlatformConsole, getConsoleAuth, ROLE_SCOPE_ADMIN, ROLE_SCOPE_VISITOR } from "@/server/admin-auth";

type MemberRow = {
  id: string;
  role: string;
  user: {
    id: string;
    mobile: string | null;
    nickname: string | null;
  };
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; ok?: string }>;
};

export default async function PlatformShopAdminsPage({ params, searchParams }: Props) {
  const { id: shopId } = await params;
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirect("/admin/portal?error=forbidden");

  const data = await adminGraphqlExecute<{
    shops_by_pk: { id: string; name: string } | null;
    shop_users: MemberRow[];
  }>(
    `
    query ShopMembers($sid: bigint!) {
      shops_by_pk(id: $sid) {
        id
        name
      }
      shop_users(where: { shop_shops: { _eq: $sid } }, order_by: { id: asc }) {
        id
        role
        user {
          id
          mobile
          nickname
        }
      }
    }
  `,
    { sid: shopId }
  );

  if (!data.shops_by_pk) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/platform/shops" className="text-sm text-emerald-700 hover:underline">
          ← 店铺列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">店铺成员 · {data.shops_by_pk.name}</h1>
        <p className="mt-1 text-sm text-zinc-500">按手机号添加用户；角色为 admin 时可在店铺后台管理本店。</p>
      </div>

      {sp.error === "not_found" && (
        <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          未找到该手机号对应的用户，请先让用户在小程序完成注册/登录。
        </p>
      )}
      {sp.error === "invalid" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">参数无效。</p>
      )}
      {sp.error === "save" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">保存失败。</p>
      )}
      {sp.error === "update" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">更新失败。</p>
      )}
      {sp.error === "delete" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">移除失败。</p>
      )}
      {sp.ok === "1" && (
        <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">已保存。</p>
      )}

      <div className="mb-8 max-w-xl rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-zinc-900">添加管理员</h2>
        <p className="mt-1 text-xs text-zinc-500">输入已注册用户的手机号，将其设为本店 admin（若已在名单中则改为 admin）。</p>
        <form action={addShopAdminByMobileAction} className="mt-4 flex flex-wrap items-end gap-3">
          <input type="hidden" name="shop_id" value={shopId} />
          <div className="min-w-[200px] flex-1">
            <label htmlFor="mobile" className="block text-sm font-medium text-zinc-700">
              手机号
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              placeholder="11 位手机号"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            添加为管理员
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">用户 ID</th>
              <th className="px-4 py-3 font-medium">手机号</th>
              <th className="px-4 py-3 font-medium">昵称</th>
              <th className="px-4 py-3 font-medium">本店角色</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {data.shop_users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  暂无成员，请添加管理员。
                </td>
              </tr>
            ) : (
              data.shop_users.map((row) => (
                <tr key={row.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-mono text-zinc-600">{row.user.id}</td>
                  <td className="px-4 py-3">{row.user.mobile ?? "—"}</td>
                  <td className="px-4 py-3">{row.user.nickname ?? "—"}</td>
                  <td className="px-4 py-3">
                    <form action={updateShopUserRoleAction} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="shop_user_id" value={row.id} />
                      <input type="hidden" name="shop_id" value={shopId} />
                      <select
                        name="role"
                        defaultValue={row.role}
                        className="rounded-md border border-zinc-300 px-2 py-1 text-sm"
                      >
                        <option value={ROLE_SCOPE_ADMIN}>admin</option>
                        <option value={ROLE_SCOPE_VISITOR}>visitor</option>
                      </select>
                      <button type="submit" className="text-sm text-emerald-700 hover:underline">
                        更新
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <form action={removeShopUserAction} className="inline">
                      <input type="hidden" name="shop_user_id" value={row.id} />
                      <input type="hidden" name="shop_id" value={shopId} />
                      <button type="submit" className="text-sm text-red-600 hover:underline">
                        移除
                      </button>
                    </form>
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
