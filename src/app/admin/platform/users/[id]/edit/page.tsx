import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updatePlatformUserRoleAction } from "@/app/admin/platform/actions/platform";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessPlatformConsole, getConsoleAuth, ROLE_PLATFORM_ADMIN, ROLE_PLATFORM_USER } from "@/server/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; ok?: string }>;
};

export default async function PlatformUserEditPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirect("/admin/portal?error=forbidden");

  const { users_by_pk: user } = await adminGraphqlExecute<{
    users_by_pk: {
      id: string;
      mobile: string | null;
      nickname: string | null;
      role: string;
      created_at: string;
    } | null;
  }>(
    `
    query PlatformUserOne($id: bigint!) {
      users_by_pk(id: $id) {
        id
        mobile
        nickname
        role
        created_at
      }
    }
  `,
    { id }
  );

  if (!user) notFound();

  const backList = "/admin/platform/users";
  const backSelf = `/admin/platform/users/${id}/edit`;

  return (
    <div>
      <div className="mb-6">
        <Link href={backList} className="text-sm text-emerald-700 hover:underline">
          ← 返回列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">编辑平台用户</h1>
        <p className="mt-1 text-sm text-zinc-500">
          ID {user.id} · {user.mobile ?? "无手机号"}
        </p>
      </div>

      {sp.error === "invalid" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">参数无效。</p>
      )}
      {sp.error === "update" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">保存失败，请稍后重试。</p>
      )}
      {sp.ok === "1" && (
        <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">已保存。</p>
      )}

      <div className="max-w-lg space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
        <div>
          <p className="text-sm font-medium text-zinc-700">昵称</p>
          <p className="mt-1 text-zinc-900">{user.nickname ?? "—"}</p>
        </div>
        <form action={updatePlatformUserRoleAction} className="space-y-4">
          <input type="hidden" name="user_id" value={user.id} />
          <input type="hidden" name="back" value={backSelf} />
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-zinc-700">
              平台角色（users.role）
            </label>
            <select
              id="role"
              name="role"
              defaultValue={user.role}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
            >
              <option value={ROLE_PLATFORM_ADMIN}>admin（平台管理员）</option>
              <option value={ROLE_PLATFORM_USER}>user（普通用户）</option>
            </select>
            <p className="mt-1 text-xs text-zinc-500">
              平台管理员可进入本后台；普通用户默认不能进入控制台（仍可通过学校/店铺成员身份进入对应后台）。
            </p>
          </div>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            保存
          </button>
        </form>
      </div>
    </div>
  );
}
