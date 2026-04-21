import { redirect } from "next/navigation";

import { AdminConsoleShell } from "@/app/admin/components/AdminConsoleShell";
import { AdminScopeSwitcherCard } from "@/app/admin/components/AdminScopeSwitcherCard";
import { switchSiteCampusAction } from "@/app/admin/scope-actions";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveSiteScope } from "@/server/admin-console-scope";
import { getConsoleAuth } from "@/server/admin-auth";

export default async function AdminSiteMainLayout({ children }: { children: React.ReactNode }) {
  const auth = await getConsoleAuth();
  if (!auth) {
    redirect("/admin/login");
  }

  const siteScope = await resolveSiteScope(auth);
  if ("redirect" in siteScope) {
    redirect(siteScope.redirect);
  }
  if (siteScope.kind === "need_campus_pick") {
    redirect("/admin/site/scope-pick");
  }

  const label =
    auth.mode === "legacy_full"
      ? "开发会话"
      : auth.access.nickname?.trim() || `用户 #${auth.access.userId}`;

  let campusScopeBlock: React.ReactNode = null;
  if (auth.mode === "jwt" && auth.access.campusAdminIds.length > 0) {
    const cids = auth.access.campusAdminIds;
    const currentId =
      siteScope.kind === "scoped" ? siteScope.campusIds[0] ?? cids[0] : cids[0];

    if (cids.length === 1) {
      const { campuses_by_pk } = await adminGraphqlExecute<{
        campuses_by_pk: { id: string; name: string } | null;
      }>(
        `
        query SiteLayoutCampusOne($id: bigint!) {
          campuses_by_pk(id: $id) {
            id
            name
          }
        }
      `,
        { id: cids[0] }
      );
      const name = campuses_by_pk?.name?.trim() || `学校 #${cids[0]}`;
      campusScopeBlock = (
        <AdminScopeSwitcherCard
          kind="campus"
          options={[{ id: cids[0], name }]}
          currentId={currentId}
          switchAction={switchSiteCampusAction}
        />
      );
    } else {
      const { campuses } = await adminGraphqlExecute<{
        campuses: Array<{ id: string; name: string }>;
      }>(
        `
        query SiteLayoutCampuses($ids: [bigint!]!) {
          campuses(where: { id: { _in: $ids } }, order_by: { id: asc }) {
            id
            name
          }
        }
      `,
        { ids: cids }
      );
      campusScopeBlock = (
        <AdminScopeSwitcherCard
          kind="campus"
          options={campuses}
          currentId={currentId}
          switchAction={switchSiteCampusAction}
        />
      );
    }
  }

  const navSections = [
    { items: [{ href: "/admin/portal", label: "← 选择后台" }] },
    {
      title: "校园组织",
      items: [
        { href: "/admin/site", label: "概览" },
        {
          href: "/admin/site/org",
          label: "组织结构",
          activeHrefPrefixes: ["/admin/site/org", "/admin/site/buildings", "/admin/site/rooms"],
        },
        { href: "/admin/site/members", label: "本校成员" },
      ],
    },
    {
      title: "站点配置",
      items: [
        {
          href: "/admin/site/settings/carousel",
          label: "首页轮播图管理",
          activeHrefPrefixes: ["/admin/site/settings/carousel"],
        },
        {
          href: "/admin/site/settings/quick-nav",
          label: "首页快捷菜单管理",
          activeHrefPrefixes: ["/admin/site/settings/quick-nav"],
        },
      ],
    },
  ];

  return (
    <AdminConsoleShell
      consoleTitle="站点后台"
      userLabel={label}
      navSections={navSections}
      sidebarExtra={campusScopeBlock ? <div className="mt-1">{campusScopeBlock}</div> : undefined}
    >
      {children}
    </AdminConsoleShell>
  );
}
