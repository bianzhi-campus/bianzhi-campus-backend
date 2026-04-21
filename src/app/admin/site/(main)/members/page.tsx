import Link from "next/link";
import { redirect } from "next/navigation";

import {
  addSiteCampusMemberByMobileAction,
  removeSiteCampusUserAction,
  updateSiteCampusUserRoleAction,
} from "@/app/admin/site/actions/campus-members";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveSiteScopeForWorkspace } from "@/server/admin-console-scope";
import { canAccessSiteConsole, canWriteCampus, getConsoleAuth, ROLE_SCOPE_ADMIN, ROLE_SCOPE_VISITOR } from "@/server/admin-auth";

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
  searchParams: Promise<{ campusId?: string; error?: string; ok?: string }>;
};

export default async function SiteCampusMembersPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessSiteConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  const siteScope = await resolveSiteScopeForWorkspace(auth);

  let campusId: string;
  let legacyCampusOptions: Array<{ id: string; name: string }> = [];

  if (siteScope.kind === "full") {
    const { campuses } = await adminGraphqlExecute<{
      campuses: Array<{ id: string; name: string }>;
    }>(`
      query SiteMembersCampusList {
        campuses(order_by: { id: asc }) {
          id
          name
        }
      }
    `);
    legacyCampusOptions = campuses;
    const q = sp.campusId?.trim();
    campusId =
      q && campuses.some((c) => c.id === q) ? q : (campuses[0]?.id ?? "");
    if (!campusId) {
      return (
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">本校成员</h1>
          <p className="mt-4 text-sm text-zinc-600">暂无学校数据。请先在平台后台创建学校。</p>
        </div>
      );
    }
  } else {
    campusId = siteScope.campusIds[0] ?? "";
    if (!campusId) {
      redirect("/admin/site/scope-pick");
    }
  }

  if (auth.mode === "jwt" && !canWriteCampus(auth.access, campusId)) {
    redirect("/admin/portal?error=forbidden");
  }

  const data = await adminGraphqlExecute<{
    campuses_by_pk: { id: string; name: string } | null;
    campus_users: MemberRow[];
  }>(
    `
    query SiteCampusMembers($cid: bigint!) {
      campuses_by_pk(id: $cid) {
        id
        name
      }
      campus_users(
        where: { campus_campuses: { _eq: $cid } }
        order_by: { id: asc }
      ) {
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
    { cid: campusId }
  );

  if (!data.campuses_by_pk) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">本校成员</h1>
        <p className="mt-4 text-sm text-red-700">未找到该学校。</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/site" className="text-sm text-emerald-700 hover:underline">
          ← 概览
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">本校成员 · {data.campuses_by_pk.name}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          校名与地址由平台管理员在平台后台维护。此处仅维护与本校关联的用户及本校角色（admin / visitor）。
        </p>
      </div>

      {siteScope.kind === "full" && legacyCampusOptions.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
          <span className="text-zinc-600">切换学校：</span>
          {legacyCampusOptions.map((c) => (
            <Link
              key={c.id}
              href={`/admin/site/members?campusId=${encodeURIComponent(c.id)}`}
              className={`rounded-md px-2 py-1 ${
                c.id === campusId ? "bg-emerald-100 font-medium text-emerald-900" : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

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
        <h2 className="text-sm font-semibold text-zinc-900">添加成员</h2>
        <p className="mt-1 text-xs text-zinc-500">输入已注册用户的手机号，并选择本校角色。</p>
        <form action={addSiteCampusMemberByMobileAction} className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <input type="hidden" name="campus_id" value={campusId} />
          <div className="min-w-[180px] flex-1">
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
          <div className="min-w-[140px]">
            <label htmlFor="role" className="block text-sm font-medium text-zinc-700">
              本校角色
            </label>
            <select
              id="role"
              name="role"
              defaultValue={ROLE_SCOPE_VISITOR}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            >
              <option value={ROLE_SCOPE_VISITOR}>visitor（成员）</option>
              <option value={ROLE_SCOPE_ADMIN}>admin（可进站点后台）</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            添加
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
              <th className="px-4 py-3 font-medium">本校角色</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {data.campus_users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  暂无成员，请添加。
                </td>
              </tr>
            ) : (
              data.campus_users.map((row) => (
                <tr key={row.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-mono text-zinc-600">{row.user.id}</td>
                  <td className="px-4 py-3">{row.user.mobile ?? "—"}</td>
                  <td className="px-4 py-3">{row.user.nickname ?? "—"}</td>
                  <td className="px-4 py-3">
                    <form action={updateSiteCampusUserRoleAction} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="campus_user_id" value={row.id} />
                      <input type="hidden" name="campus_id" value={campusId} />
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
                    <form action={removeSiteCampusUserAction} className="inline">
                      <input type="hidden" name="campus_user_id" value={row.id} />
                      <input type="hidden" name="campus_id" value={campusId} />
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
