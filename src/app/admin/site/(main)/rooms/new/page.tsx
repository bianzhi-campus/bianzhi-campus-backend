import Link from "next/link";
import { redirect } from "next/navigation";

import { createRoomAction } from "@/app/admin/site/actions/org";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveSiteScopeForWorkspace } from "@/server/admin-console-scope";
import { canAccessSiteConsole, getConsoleAuth } from "@/server/admin-auth";

type BuildingOption = {
  /** Hasura bigint 在 JSON 中常为 string，也可能被解析为 number */
  id: string | number;
  name: string;
  type: string | null;
  campus: { name: string } | null;
};

type Props = {
  searchParams: Promise<{
    error?: string | string[];
    buildingId?: string | string[];
  }>;
};

/** URL / JSON 里 id 可能是 string 或 number，与查询串比较时必须统一成字符串 */
function normalizeId(value: unknown): string {
  if (value == null) return "";
  return String(value).trim();
}

function firstQueryValue(v: string | string[] | undefined): string {
  if (v == null) return "";
  return normalizeId(Array.isArray(v) ? v[0] : v);
}

export default async function NewRoomPage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessSiteConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  const siteScope = await resolveSiteScopeForWorkspace(auth);

  let buildings: BuildingOption[];

  if (siteScope.kind === "full") {
    const data = await adminGraphqlExecute<{
      buildings: BuildingOption[];
    }>(`
      query BuildingsOptions {
        buildings(order_by: [{ sort_order: desc }, { name: asc }]) {
          id
          name
          type
          campus {
            name
          }
        }
      }
    `);
    buildings = data.buildings;
  } else {
    const campusIds = siteScope.campusIds;
    const data = await adminGraphqlExecute<{
      buildings: BuildingOption[];
    }>(
      `
      query BuildingsScoped($ids: [bigint!]!) {
        buildings(
          where: { campus_campuses: { _in: $ids } }
          order_by: [{ sort_order: desc }, { name: asc }]
        ) {
          id
          name
          type
          campus {
            name
          }
        }
      }
    `,
      { ids: campusIds }
    );
    buildings = data.buildings;
  }

  const rawBid = firstQueryValue(sp.buildingId);
  const lockedFromUrl = rawBid
    ? buildings.find((b) => normalizeId(b.id) === rawBid)
    : undefined;
  const lockedBuilding =
    lockedFromUrl ?? (buildings.length === 1 ? buildings[0] : null);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/site/org" className="text-sm text-emerald-700 hover:underline">
          ← 返回组织结构
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">新建房间</h1>
      </div>

      {firstQueryValue(sp.error) === "invalid" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          请填写楼栋、房间名与楼层（数字）。
        </p>
      )}
      {firstQueryValue(sp.error) === "dup" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          保存失败：同一楼栋下房间名可能已存在。
        </p>
      )}

      {buildings.length === 0 ? (
        <p className="text-zinc-600">
          暂无楼栋，请先到{" "}
          <Link href="/admin/site/buildings/new" className="text-emerald-700 hover:underline">
            新建楼栋
          </Link>
          。
        </p>
      ) : (
        <form action={createRoomAction} className="max-w-lg space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
          {lockedBuilding ? (
            <>
              <input type="hidden" name="building_buildings" value={normalizeId(lockedBuilding.id)} />
              <div>
                <p className="block text-sm font-medium text-zinc-700">
                  所属楼栋 <span className="text-red-500">*</span>
                </p>
                <p className="mt-1 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900">
                  {lockedBuilding.campus?.name ?? "—"} · {lockedBuilding.name}
                  {lockedBuilding.type ? ` · ${lockedBuilding.type}` : ""}
                </p>
                {buildings.length > 1 && (
                  <p className="mt-1 text-xs text-zinc-500">
                    需要换楼栋？{" "}
                    <Link href="/admin/site/rooms/new" className="font-medium text-emerald-700 hover:underline">
                      重新选择楼栋
                    </Link>
                  </p>
                )}
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="building_buildings" className="block text-sm font-medium text-zinc-700">
                所属楼栋 <span className="text-red-500">*</span>
              </label>
              <select
                id="building_buildings"
                name="building_buildings"
                required
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
              >
                <option value="">请选择</option>
                {buildings.map((b) => (
                  <option key={normalizeId(b.id)} value={normalizeId(b.id)}>
                    {b.campus?.name ?? "—"} · {b.name}
                    {b.type ? ` · ${b.type}` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="floor_number" className="block text-sm font-medium text-zinc-700">
              楼层 <span className="text-red-500">*</span>
            </label>
            <input
              id="floor_number"
              name="floor_number"
              type="number"
              required
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
              房间名称 <span className="text-red-500">*</span>
            </label>
            <input id="name" name="name" required className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-zinc-700">
              分区（可选）
            </label>
            <input
              id="zone"
              name="zone"
              placeholder="如：C区"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
            />
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
            <p className="mt-1 text-xs text-zinc-500">数值越大，在组织结构中同层内越靠前。</p>
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
