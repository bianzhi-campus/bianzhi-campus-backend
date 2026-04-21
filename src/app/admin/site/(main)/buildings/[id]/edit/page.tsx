import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateBuildingAction } from "@/app/admin/site/actions/org";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessSiteConsole, canWriteCampus, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditBuildingPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;

  const { buildings_by_pk: building } = await adminGraphqlExecute<{
    buildings_by_pk: {
      id: string;
      name: string;
      campus_campuses: string;
      type: string | null;
      zone: string | null;
      sort_order: string;
    } | null;
  }>(
    `
    query Building($id: bigint!) {
      buildings_by_pk(id: $id) {
        id
        name
        campus_campuses
        type
        zone
        sort_order
      }
    }
  `,
    { id }
  );

  if (!building) notFound();

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessSiteConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }
  if (
    auth.mode === "jwt" &&
    !auth.access.isPlatformAdmin &&
    !canWriteCampus(auth.access, building.campus_campuses)
  ) {
    redirect("/admin/site/org");
  }

  const { campuses_by_pk: campusRow } = await adminGraphqlExecute<{
    campuses_by_pk: { id: string; name: string } | null;
  }>(
    `
    query BuildingCampusLabel($id: bigint!) {
      campuses_by_pk(id: $id) {
        id
        name
      }
    }
  `,
    { id: building.campus_campuses }
  );

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/site/org" className="text-sm text-emerald-700 hover:underline">
          ← 返回组织结构
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">编辑楼栋</h1>
      </div>

      {sp.error === "dup" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          保存失败：同一学校下楼栋名称不能重复。
        </p>
      )}

      <form action={updateBuildingAction} className="max-w-lg space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
        <input type="hidden" name="id" value={building.id} />
        <div>
          <p className="block text-sm font-medium text-zinc-700">
            所属学校 <span className="text-red-500">*</span>
          </p>
          <p className="mt-1 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900">
            {campusRow?.name ?? `学校 #${building.campus_campuses}`}
          </p>
          <p className="mt-1 text-xs text-zinc-500">如需调整学校归属，请联系平台管理员。</p>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            楼栋名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={building.name}
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
            defaultValue={building.type ?? ""}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="zone" className="block text-sm font-medium text-zinc-700">
            园区/区域
          </label>
          <input id="zone" name="zone" defaultValue={building.zone ?? ""} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" />
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
            defaultValue={building.sort_order}
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
    </div>
  );
}
