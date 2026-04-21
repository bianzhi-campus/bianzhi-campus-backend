import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteCampusAction } from "@/app/admin/site/actions/org";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessPlatformConsole, getConsoleAuth } from "@/server/admin-auth";

type CampusRow = {
  id: string;
  name: string;
  province: string | null;
  city: string | null;
  district: string | null;
  created_at: string;
};

const campusFields = `
  id
  name
  province
  city
  district
  created_at
`;

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function PlatformCampusesPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirect("/admin/portal?error=forbidden");

  const data = await adminGraphqlExecute<{ campuses: CampusRow[] }>(`
    query PlatformCampusesList {
      campuses(order_by: { id: desc }) {
        ${campusFields}
      }
    }
  `);
  const campuses = data.campuses;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-zinc-900">学校</h1>
        <Link
          href="/admin/platform/campuses/new"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          新建学校
        </Link>
      </div>
      <p className="mt-2 text-sm text-zinc-600">
        楼栋与房间由<strong className="text-zinc-800">学校管理员</strong>在「站点后台」维护；平台侧仅管理校名、省市区与成员。
      </p>

      {sp.error === "delete" && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          删除失败：请先删除该校下属楼栋，或检查是否仍被引用。
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">名称</th>
              <th className="px-4 py-3 font-medium">省</th>
              <th className="px-4 py-3 font-medium">市</th>
              <th className="px-4 py-3 font-medium">区</th>
              <th className="px-4 py-3 font-medium">创建时间</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {campuses.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-zinc-500">
                  暂无学校，请先新建。
                </td>
              </tr>
            ) : (
              campuses.map((c) => (
                <tr key={c.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-mono text-zinc-600">{c.id}</td>
                  <td className="px-4 py-3 text-zinc-900">{c.name}</td>
                  <td className="px-4 py-3 text-zinc-600">{c.province ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-600">{c.city ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-600">{c.district ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-500">{new Date(c.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/platform/campuses/${c.id}/edit`}
                        className="text-emerald-700 hover:underline"
                      >
                        编辑
                      </Link>
                      <Link
                        href={`/admin/platform/campuses/${c.id}/admins`}
                        className="text-zinc-700 hover:underline"
                      >
                        成员与管理员
                      </Link>
                      <form action={deleteCampusAction} className="inline">
                        <input type="hidden" name="_ctx" value="platform" />
                        <input type="hidden" name="id" value={c.id} />
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
