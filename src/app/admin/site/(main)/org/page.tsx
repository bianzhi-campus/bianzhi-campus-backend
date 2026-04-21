import Link from "next/link";
import { redirect } from "next/navigation";

import {
  deleteBuildingAction,
  deleteRoomAction,
  updateBuildingSortOrderAction,
  updateRoomSortOrderAction,
} from "@/app/admin/site/actions/org";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import {
  type ActiveSiteScope,
  resolveSiteScopeForWorkspace,
} from "@/server/admin-console-scope";
import { canAccessSiteConsole, getConsoleAuth } from "@/server/admin-auth";

/**
 * 与 schema 一致：`user_address_type` 可选「1、campus(校内) 2、normal(校外)」——其中 1、2 为文档列举序号，
 * 实际写入值为字符串 `campus` / `normal`；为空时表示无需地址的订单（如自提）。
 * 组织架构按楼栋聚合时只统计校内，即 `user_address_type = campus`。
 */
const USER_ADDRESS_TYPE_CAMPUS = "campus";

type ShopOrdersAgg = {
  shop_orders_aggregate: {
    aggregate: {
      order_count: number | null;
      distinct_buyers: number | null;
    } | null;
  };
};

type CampusAddressOrderRow = {
  building_buildings: string | null;
  building_room_building_rooms: string | null;
  user_users: string;
};

type RoomRow = {
  id: string;
  name: string;
  floor_number: number;
  zone: string | null;
  sort_order: string;
};

type BuildingNode = {
  id: string;
  name: string;
  type: string | null;
  zone: string | null;
  sort_order: string;
  campus_campuses: string;
  campus: { id: string; name: string } | null;
  building_rooms: RoomRow[];
};

type LocationStat = { orderCount: number; buyerCount: number };

function buildCampusAddressLocationStats(rows: CampusAddressOrderRow[]): {
  byRoom: Map<string, LocationStat>;
  buildingOnly: Map<string, LocationStat>;
} {
  const roomBuckets = new Map<string, { orderCount: number; buyers: Set<string> }>();
  const buildingBuckets = new Map<string, { orderCount: number; buyers: Set<string> }>();

  for (const r of rows) {
    const uid = String(r.user_users);
    const bid = r.building_buildings != null ? String(r.building_buildings) : null;
    const rid = r.building_room_building_rooms != null ? String(r.building_room_building_rooms) : null;

    if (rid) {
      const cur = roomBuckets.get(rid) ?? { orderCount: 0, buyers: new Set<string>() };
      cur.orderCount += 1;
      cur.buyers.add(uid);
      roomBuckets.set(rid, cur);
    } else if (bid) {
      const cur = buildingBuckets.get(bid) ?? { orderCount: 0, buyers: new Set<string>() };
      cur.orderCount += 1;
      cur.buyers.add(uid);
      buildingBuckets.set(bid, cur);
    }
  }

  const byRoom = new Map<string, LocationStat>();
  for (const [id, v] of roomBuckets) {
    byRoom.set(id, { orderCount: v.orderCount, buyerCount: v.buyers.size });
  }
  const buildingOnly = new Map<string, LocationStat>();
  for (const [id, v] of buildingBuckets) {
    buildingOnly.set(id, { orderCount: v.orderCount, buyerCount: v.buyers.size });
  }
  return { byRoom, buildingOnly };
}

const buildingOrgFields = `
  id
  name
  type
  zone
  sort_order
  campus_campuses
  campus {
    id
    name
  }
  building_rooms(
    order_by: [{ sort_order: desc }, { floor_number: desc }, { name: asc }]
  ) {
    id
    name
    floor_number
    zone
    sort_order
  }
`;

async function fetchCampusShopOrdersOverview(
  siteScope: ActiveSiteScope
): Promise<ShopOrdersAgg["shop_orders_aggregate"]> {
  if (siteScope.kind === "full") {
    const { shop_orders_aggregate } = await adminGraphqlExecute<ShopOrdersAgg>(`
      query CampusShopOrdersFull {
        shop_orders_aggregate {
          aggregate {
            order_count: count
            distinct_buyers: count(columns: [user_users], distinct: true)
          }
        }
      }
    `);
    return shop_orders_aggregate;
  }
  const ids = siteScope.campusIds;
  const { shop_orders_aggregate } = await adminGraphqlExecute<ShopOrdersAgg>(
    `
    query CampusShopOrdersScoped($ids: [bigint!]!) {
      shop_orders_aggregate(where: { campus_campuses: { _in: $ids } }) {
        aggregate {
          order_count: count
          distinct_buyers: count(columns: [user_users], distinct: true)
        }
      }
    }
  `,
    { ids }
  );
  return shop_orders_aggregate;
}

async function fetchCampusAddressOrderRows(
  siteScope: ActiveSiteScope
): Promise<CampusAddressOrderRow[]> {
  const campus = USER_ADDRESS_TYPE_CAMPUS;
  if (siteScope.kind === "full") {
    const { shop_orders } = await adminGraphqlExecute<{
      shop_orders: CampusAddressOrderRow[];
    }>(
      `
      query OrgCampusAddressRowsFull($campus: String!) {
        shop_orders(where: { user_address_type: { _eq: $campus } }) {
          building_buildings
          building_room_building_rooms
          user_users
        }
      }
    `,
      { campus }
    );
    return shop_orders;
  }
  const ids = siteScope.campusIds;
  const { shop_orders } = await adminGraphqlExecute<{
    shop_orders: CampusAddressOrderRow[];
  }>(
    `
    query OrgCampusAddressRowsScoped($ids: [bigint!]!, $campus: String!) {
      shop_orders(
        where: {
          _and: [
            { user_address_type: { _eq: $campus } },
            { campus_campuses: { _in: $ids } }
          ]
        }
      ) {
        building_buildings
        building_room_building_rooms
        user_users
      }
    }
  `,
    { ids, campus }
  );
  return shop_orders;
}

function aggOrders(a: ShopOrdersAgg["shop_orders_aggregate"]): number {
  return a?.aggregate?.order_count ?? 0;
}

function aggBuyers(a: ShopOrdersAgg["shop_orders_aggregate"]): number {
  return a?.aggregate?.distinct_buyers ?? 0;
}

function groupRoomsByFloor(rooms: RoomRow[]): [number, RoomRow[]][] {
  const map = new Map<number, RoomRow[]>();
  for (const r of rooms) {
    const list = map.get(r.floor_number) ?? [];
    list.push(r);
    map.set(r.floor_number, list);
  }
  for (const [, list] of map) {
    list.sort((a, b) => {
      const sa = BigInt(a.sort_order || "0");
      const sb = BigInt(b.sort_order || "0");
      if (sa > sb) return -1;
      if (sa < sb) return 1;
      return a.name.localeCompare(b.name, "zh-CN");
    });
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SiteOrgStructurePage({ searchParams }: Props) {
  const sp = await searchParams;

  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessSiteConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  const siteScope = await resolveSiteScopeForWorkspace(auth);

  const [buildings, campusOrderAgg, campusAddressRows] = await Promise.all([
    (async (): Promise<BuildingNode[]> => {
      if (siteScope.kind === "full") {
        const { buildings: rows } = await adminGraphqlExecute<{ buildings: BuildingNode[] }>(`
          query OrgBuildingsFull {
            buildings(order_by: [{ sort_order: desc }, { name: asc }]) {
              ${buildingOrgFields}
            }
          }
        `);
        return rows;
      }
      const ids = siteScope.campusIds;
      const { buildings: rows } = await adminGraphqlExecute<{
        buildings: BuildingNode[];
      }>(
        `
        query OrgBuildingsScoped($ids: [bigint!]!) {
          buildings(
            where: { campus_campuses: { _in: $ids } }
            order_by: [{ sort_order: desc }, { name: asc }]
          ) {
            ${buildingOrgFields}
          }
        }
      `,
        { ids }
      );
      return rows;
    })(),
    fetchCampusShopOrdersOverview(siteScope),
    fetchCampusAddressOrderRows(siteScope),
  ]);

  const { byRoom: roomOrderStats, buildingOnly: buildingOnlyOrderStats } =
    buildCampusAddressLocationStats(campusAddressRows);

  const totalRooms = buildings.reduce((n, b) => n + b.building_rooms.length, 0);
  const campusOrders = aggOrders(campusOrderAgg);
  const campusBuyers = aggBuyers(campusOrderAgg);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">组织结构</h1>
          <p className="mt-1 text-sm text-zinc-600">
            管理本校楼栋与房间，查看各楼、各房间的订单与下单人数。在某一栋楼里点「添加房间」会自动带上该楼。排序数字越大，列表里越靠前。
          </p>
        </div>
        <Link
          href="/admin/site/buildings/new"
          className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700"
        >
          新建楼栋
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm lg:col-span-2">
          <p className="text-xs font-medium text-zinc-500">本校概览</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">楼栋</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-zinc-900">{buildings.length}</p>
              <p className="mt-1 text-xs text-zinc-500">当前范围内楼宇数量</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">房间</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-zinc-900">{totalRooms}</p>
              <p className="mt-1 text-xs text-zinc-500">全部楼栋内房间总数</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">本校订单数</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-zinc-900">{campusOrders}</p>
              <p className="mt-1 text-xs text-zinc-500">
                本校范围内的店铺子订单 ·{" "}
                {siteScope.kind === "scoped" ? "当前所选学校" : "全部学校"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">约多少人下单</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-zinc-900">{campusBuyers}</p>
              <p className="mt-1 text-xs text-zinc-500">下单用户人数（同一人只计一次）</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-4">
          <p className="text-xs font-medium text-emerald-800">提示</p>
          <p className="mt-1 text-sm text-emerald-900/90">
            上方「本校概览」含本校全部类型的店铺订单。下面每个楼栋、房间旁的订单数，仅统计
            <strong className="font-medium">收货为校内</strong>
            的订单，且须对应到具体楼栋与房间；快递寄校外、到店自提等不计入。「约多少人」是把各房间人数相加，同一人若在多个房间都下过单可能被重复计算。
          </p>
        </div>
      </div>

      {sp.error === "invalid" && (
        <p className="mt-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">参数不合法或无权执行该操作。</p>
      )}
      {sp.error === "update" && (
        <p className="mt-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">更新失败，请检查数据后重试。</p>
      )}
      {sp.error === "delete" && (
        <p className="mt-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          删除楼栋失败：请先删除该楼栋下的所有房间。
        </p>
      )}
      {sp.error === "room_delete" && (
        <p className="mt-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">删除房间失败，请稍后重试。</p>
      )}
      {sp.error === "forbidden" && (
        <p className="mt-6 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">无权限执行此操作。</p>
      )}

      <div className="mt-8 space-y-6">
        {buildings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-sm text-zinc-600">
            暂无楼栋。请确认平台管理员已创建本校，再点击右上角「新建楼栋」。
          </div>
        ) : (
          buildings.map((b) => {
            const rooms = b.building_rooms;
            const byFloor = groupRoomsByFloor(rooms);
            const roomOrderSum = rooms.reduce(
              (s, r) => s + (roomOrderStats.get(r.id)?.orderCount ?? 0),
              0
            );
            const roomBuyerSum = rooms.reduce(
              (s, r) => s + (roomOrderStats.get(r.id)?.buyerCount ?? 0),
              0
            );
            const buildingOnly = buildingOnlyOrderStats.get(b.id);
            const buildingDirectOrders = buildingOnly?.orderCount ?? 0;
            const buildingDirectBuyers = buildingOnly?.buyerCount ?? 0;
            const hasRoomStats = roomOrderSum > 0 || roomBuyerSum > 0;
            const buildingOrderDisplay = hasRoomStats ? roomOrderSum : buildingDirectOrders;
            const buildingBuyerDisplay = hasRoomStats ? roomBuyerSum : buildingDirectBuyers;
            return (
              <article
                key={b.id}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-3 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-800"
                      aria-hidden
                    >
                      楼
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900">{b.name}</h2>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        {b.type ? `${b.type}` : "类型未填"}
                        {b.zone ? ` · ${b.zone}` : ""}
                        {b.campus?.name ? ` · ${b.campus.name}` : ""}
                      </p>
                      <p className="mt-1.5 text-xs text-zinc-600">
                        <span className="font-medium text-zinc-700">
                          {rooms.length > 0 ? "本楼（各房间合计）" : "本楼"}
                        </span>
                        ：订单 {buildingOrderDisplay} 单 ·{" "}
                        {hasRoomStats ? "约 " : ""}
                        {buildingBuyerDisplay} 人下过单
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                      {rooms.length} 间房间
                    </span>
                    <form
                      action={updateBuildingSortOrderAction}
                      className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2 py-1"
                    >
                      <input type="hidden" name="id" value={b.id} />
                      <label className="sr-only" htmlFor={`sort-b-${b.id}`}>
                        楼栋排序
                      </label>
                      <span className="text-xs text-zinc-500">排序</span>
                      <input
                        id={`sort-b-${b.id}`}
                        name="sort_order"
                        type="number"
                        min={0}
                        defaultValue={b.sort_order}
                        className="w-16 rounded border border-zinc-200 px-1.5 py-1 text-sm tabular-nums"
                      />
                      <button
                        type="submit"
                        className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-200"
                      >
                        应用
                      </button>
                    </form>
                    <Link
                      href={`/admin/site/rooms/new?buildingId=${encodeURIComponent(String(b.id))}`}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      在本楼栋添加房间
                    </Link>
                    <Link
                      href={`/admin/site/buildings/${b.id}/edit`}
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      编辑楼栋
                    </Link>
                    <form action={deleteBuildingAction} className="inline">
                      <input type="hidden" name="id" value={b.id} />
                      <button
                        type="submit"
                        className="rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        删除楼栋
                      </button>
                    </form>
                  </div>
                </div>

                <div className="p-4">
                  {rooms.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                      该楼栋下暂无房间。{" "}
                      <Link
                        href={`/admin/site/rooms/new?buildingId=${encodeURIComponent(String(b.id))}`}
                        className="font-medium text-emerald-700 hover:underline"
                      >
                        立即添加
                      </Link>
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {byFloor.map(([floor, floorRooms]) => (
                        <div key={floor}>
                          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                            <span className="h-px flex-1 bg-zinc-200" />
                            <span>
                              {floor} 层 · {floorRooms.length} 间
                            </span>
                            <span className="h-px flex-1 bg-zinc-200" />
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {floorRooms.map((r) => (
                              <li
                                key={r.id}
                                className="group flex flex-wrap items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50/80 px-2 py-1.5 text-sm"
                              >
                                <span className="font-medium text-zinc-900">{r.name}</span>
                                {r.zone ? (
                                  <span className="text-xs text-zinc-500">({r.zone})</span>
                                ) : null}
                                <span
                                  className="text-xs tabular-nums text-zinc-500"
                                  title="校内收货且指向本房间的订单数；人数在本房间内去重"
                                >
                                  · 订单 {roomOrderStats.get(r.id)?.orderCount ?? 0} ·{" "}
                                  {roomOrderStats.get(r.id)?.buyerCount ?? 0} 人
                                </span>
                                <form
                                  action={updateRoomSortOrderAction}
                                  className="ml-1 flex items-center gap-0.5 border-l border-zinc-200 pl-1.5"
                                >
                                  <input type="hidden" name="id" value={r.id} />
                                  <input
                                    name="sort_order"
                                    type="number"
                                    min={0}
                                    defaultValue={r.sort_order}
                                    className="w-14 rounded border border-zinc-200 px-1 py-0.5 text-xs tabular-nums"
                                    title="排序，越大越前"
                                  />
                                  <button
                                    type="submit"
                                    className="rounded bg-white px-1 py-0.5 text-[10px] text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50"
                                  >
                                    应用
                                  </button>
                                </form>
                                <Link
                                  href={`/admin/site/rooms/${r.id}/edit`}
                                  className="text-emerald-700 opacity-80 hover:underline group-hover:opacity-100"
                                >
                                  编辑
                                </Link>
                                <form action={deleteRoomAction} className="inline">
                                  <input type="hidden" name="id" value={r.id} />
                                  <button
                                    type="submit"
                                    className="text-xs text-red-600 hover:underline"
                                  >
                                    删
                                  </button>
                                </form>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
