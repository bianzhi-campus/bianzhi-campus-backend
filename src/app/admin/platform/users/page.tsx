import Link from "next/link";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessPlatformConsole, getConsoleAuth } from "@/server/admin-auth";

type UserRow = {
  id: string;
  mobile: string | null;
  nickname: string | null;
  role: string;
  created_at: string;
};

type Props = {
  searchParams: Promise<{ error?: string; ok?: string }>;
};

export default async function PlatformUsersPage({ searchParams }: Props) {
  const sp = await searchParams;
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirect("/admin/portal?error=forbidden");

  const { users } = await adminGraphqlExecute<{ users: UserRow[] }>(`
    query PlatformUsersList {
      users(order_by: { id: desc }, limit: 500) {
        id
        mobile
        nickname
        role
        created_at
      }
    }
  `);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">平台用户</h1>
      <p className="mt-2 text-sm text-zinc-600">
        管理平台账号的 <code className="rounded bg-zinc-100 px-1">users.role</code>（平台管理员 / 普通用户）。学校与店铺侧权限请在对应学校的「成员」或店铺的「成员」中维护。
      </p>

      {sp.error === "forbidden" && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">无权限执行此操作。</p>
      )}
      {sp.ok === "1" && (
        <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">已保存。</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">手机号</th>
              <th className="px-4 py-3 font-medium">昵称</th>
              <th className="px-4 py-3 font-medium">平台角色</th>
              <th className="px-4 py-3 font-medium">注册时间</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                  暂无用户。
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-mono text-zinc-600">{u.id}</td>
                  <td className="px-4 py-3 text-zinc-900">{u.mobile ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-700">{u.nickname ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-700">{u.role}</td>
                  <td className="px-4 py-3 text-zinc-500">{new Date(u.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/platform/users/${u.id}/edit`}
                      className="text-emerald-700 hover:underline"
                    >
                      编辑
                    </Link>
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
