import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateCampusAction } from "@/app/admin/site/actions/org";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessPlatformConsole, canWriteCampus, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
};

/** 平台管理员编辑学校基本信息（与站点后台隔离；楼栋/房间由学校管理员在站点后台维护） */
export default async function PlatformEditCampusPage({ params }: Props) {
  const { id } = await params;

  const { campuses_by_pk: campus } = await adminGraphqlExecute<{
    campuses_by_pk: {
      id: string;
      name: string;
      province: string | null;
      city: string | null;
      district: string | null;
    } | null;
  }>(
    `
    query Campus($id: bigint!) {
      campuses_by_pk(id: $id) {
        id
        name
        province
        city
        district
      }
    }
  `,
    { id }
  );

  if (!campus) notFound();

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }
  if (auth.mode === "jwt" && !canWriteCampus(auth.access, campus.id)) {
    redirect("/admin/platform/campuses");
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/platform/campuses" className="text-sm text-emerald-700 hover:underline">
          ← 返回列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">编辑学校</h1>
        <p className="mt-1 text-sm text-zinc-500">平台侧维护校名与省市区；组织架构请在站点后台由学校管理员操作。</p>
      </div>

      <form action={updateCampusAction} className="max-w-lg space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
        <input type="hidden" name="_ctx" value="platform" />
        <input type="hidden" name="id" value={campus.id} />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            学校名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={campus.name}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-zinc-700">
              省
            </label>
            <input
              id="province"
              name="province"
              defaultValue={campus.province ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-zinc-700">
              市
            </label>
            <input id="city" name="city" defaultValue={campus.city ?? ""} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-zinc-700">
              区
            </label>
            <input
              id="district"
              name="district"
              defaultValue={campus.district ?? ""}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            保存
          </button>
          <Link
            href="/admin/platform/campuses"
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
