import Link from "next/link";
import { redirect } from "next/navigation";

import { createCampusAction } from "@/app/admin/site/actions/org";
import { canAccessPlatformConsole, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function PlatformNewCampusPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessPlatformConsole(auth)) redirect("/admin/portal?error=forbidden");

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/platform/campuses" className="text-sm text-emerald-700 hover:underline">
          ← 返回列表
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">新建学校</h1>
      </div>

      {sp.error === "name" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">请填写学校名称</p>
      )}

      <form action={createCampusAction} className="max-w-lg space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
        <input type="hidden" name="_ctx" value="platform" />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            学校名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
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
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-zinc-700">
              市
            </label>
            <input id="city" name="city" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-zinc-700">
              区
            </label>
            <input id="district" name="district" className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" />
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
