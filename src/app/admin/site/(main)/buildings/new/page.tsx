import Link from "next/link";
import { redirect } from "next/navigation";

import { createBuildingAction } from "@/app/admin/site/actions/org";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveSiteScopeForWorkspace } from "@/server/admin-console-scope";
import { canAccessSiteConsole, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  searchParams: Promise<{ error?: string; campusId?: string }>;
};

export default async function NewBuildingPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessSiteConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  const siteScope = await resolveSiteScopeForWorkspace(auth);

  let lockedCampus: { id: string; name: string } | null = null;
  let legacyCampusSwitchHint = false;

  if (siteScope.kind === "full") {
    const { campuses } = await adminGraphqlExecute<{
      campuses: Array<{ id: string; name: string }>;
    }>(`
      query NewBuildingCampusList {
        campuses(order_by: { id: asc }) {
          id
          name
        }
      }
    `);
    legacyCampusSwitchHint = campuses.length > 1;
    const q = sp.campusId?.trim();
    const cid =
      q && campuses.some((c) => c.id === q) ? q : (campuses[0]?.id ?? "");
    lockedCampus = cid ? campuses.find((c) => c.id === cid) ?? null : null;
  } else {
    const cid = siteScope.campusIds[0] ?? "";
    if (cid) {
      const { campuses_by_pk } = await adminGraphqlExecute<{
        campuses_by_pk: { id: string; name: string } | null;
      }>(
        `
        query LockedCampus($id: bigint!) {
          campuses_by_pk(id: $id) {
            id
            name
          }
        }
      `,
        { id: cid }
      );
      lockedCampus = campuses_by_pk;
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/site/org" className="text-sm text-emerald-700 hover:underline">
          ← 返回组织结构
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">新建楼栋</h1>
      </div>

      {sp.error === "name" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">请填写楼栋名称</p>
      )}
      {sp.error === "dup" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          保存失败：同一学校下楼栋名称不能重复。
        </p>
      )}

      {!lockedCampus ? (
        <p className="text-zinc-600">
          暂无可关联的学校。请联系平台管理员在{" "}
          <Link href="/admin/platform/campuses/new" className="text-emerald-700 hover:underline">
            平台后台
          </Link>
          创建学校。
        </p>
      ) : (
        <form
          action={createBuildingAction}
          className="max-w-lg space-y-4 rounded-lg border border-zinc-200 bg-white p-6"
        >
          <input type="hidden" name="campus_campuses" value={lockedCampus.id} />
          <div>
            <p className="block text-sm font-medium text-zinc-700">
              所属学校 <span className="text-red-500">*</span>
            </p>
            <p className="mt-1 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900">
              {lockedCampus.name}
            </p>
            <p className="mt-1 text-xs text-zinc-500">站点后台仅管理当前学校，不可更改。</p>
            {legacyCampusSwitchHint && (
              <p className="mt-2 text-xs text-zinc-500">
                开发会话下多所学校时，可在 URL 使用{" "}
                <code className="rounded bg-zinc-100 px-1">?campusId=学校ID</code>{" "}
                指定学校（与「本校成员」页一致）。
              </p>
            )}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
              楼栋名称 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="同一学校内唯一"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-zinc-700">
              楼栋类型
            </label>
            <input
              id="type"
              name="type"
              placeholder="如：1 教学楼 2 宿舍楼 3 商业楼"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
            />
          </div>
          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-zinc-700">
              园区/区域
            </label>
            <input id="zone" name="zone" placeholder="可选" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="sort_order" className="block text-sm font-medium text-zinc-700">
              排序
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              min={0}
              defaultValue={0}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 tabular-nums"
            />
            <p className="mt-1 text-xs text-zinc-500">数值越大，在组织结构中越靠前。</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              保存
            </button>
            <Link
              href="/admin/site/org"
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              取消
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
