import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateRoomAction } from "@/app/admin/site/actions/org";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canAccessSiteConsole, canWriteCampus, getConsoleAuth } from "@/server/admin-auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRoomPage({ params }: Props) {
  const { id } = await params;

  const { building_rooms_by_pk: room } = await adminGraphqlExecute<{
    building_rooms_by_pk: {
      id: string;
      building_buildings: string;
      name: string;
      floor_number: number;
      zone: string | null;
      sort_order: string;
      building: { campus_campuses: string };
    } | null;
  }>(
    `
    query Room($id: bigint!) {
      building_rooms_by_pk(id: $id) {
        id
        building_buildings
        name
        floor_number
        zone
        sort_order
        building {
          campus_campuses
        }
      }
    }
  `,
    { id }
  );

  if (!room) notFound();

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessSiteConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }
  if (
    auth.mode === "jwt" &&
    !auth.access.isPlatformAdmin &&
    !canWriteCampus(auth.access, room.building.campus_campuses)
  ) {
    redirect("/admin/site/org");
  }

  let buildings: Array<{
    id: string;
    name: string;
    type: string | null;
    campus: { name: string } | null;
  }>;

  if (auth.mode === "legacy_full" || (auth.mode === "jwt" && auth.access.isPlatformAdmin)) {
    const data = await adminGraphqlExecute<{
      buildings: Array<{
        id: string;
        name: string;
        type: string | null;
        campus: { name: string } | null;
      }>;
    }>(`
      query BuildingsOptions {
        buildings(order_by: { name: asc }) {
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
    const campusIds = auth.mode === "jwt" ? auth.access.campusAdminIds : [];
    if (campusIds.length === 0) {
      buildings = [];
    } else {
      const data = await adminGraphqlExecute<{
        buildings: Array<{
          id: string;
          name: string;
          type: string | null;
          campus: { name: string } | null;
        }>;
      }>(
        `
        query BuildingsScoped($ids: [bigint!]!) {
          buildings(
            where: { campus_campuses: { _in: $ids } }
            order_by: { name: asc }
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
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/site/org" className="text-sm text-emerald-700 hover:underline">
          ← 返回组织结构
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">编辑房间</h1>
      </div>

      <form action={updateRoomAction} className="max-w-lg space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
        <input type="hidden" name="id" value={room.id} />
        <div>
          <label htmlFor="building_buildings" className="block text-sm font-medium text-zinc-700">
            所属楼栋 <span className="text-red-500">*</span>
          </label>
          <select
            id="building_buildings"
            name="building_buildings"
            required
            defaultValue={room.building_buildings}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
          >
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.campus?.name ?? "—"} · {b.name}
                {b.type ? ` · ${b.type}` : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="floor_number" className="block text-sm font-medium text-zinc-700">
            楼层 <span className="text-red-500">*</span>
          </label>
          <input
            id="floor_number"
            name="floor_number"
            type="number"
            required
            defaultValue={room.floor_number}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            房间名称 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={room.name}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="zone" className="block text-sm font-medium text-zinc-700">
            分区（可选）
          </label>
          <input id="zone" name="zone" defaultValue={room.zone ?? ""} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2" />
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
            defaultValue={room.sort_order}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 tabular-nums"
          />
          <p className="mt-1 text-xs text-zinc-500">数值越大，在组织结构同层内越靠前。</p>
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
