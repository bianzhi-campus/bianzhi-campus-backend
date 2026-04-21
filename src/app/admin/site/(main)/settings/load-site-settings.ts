import "server-only";

import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveSiteScopeForWorkspace, type ActiveSiteScope } from "@/server/admin-console-scope";
import { canAccessSiteConsole, canWriteCampus, getConsoleAuth } from "@/server/admin-auth";

export type SiteSettingsOk = {
  kind: "ok";
  siteScope: ActiveSiteScope;
  campusId: string;
  campusName: string;
  home_page_carousel_config: unknown;
  home_page_quick_nav_config: unknown;
  legacyCampusOptions: Array<{ id: string; name: string }>;
};

export async function loadSiteSettingsPage(sp: {
  campusId?: string;
}): Promise<SiteSettingsOk | { kind: "no_campus" } | { kind: "not_found" }> {
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
      query SiteSettingsCampusList {
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
      return { kind: "no_campus" };
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
    campuses_by_pk: {
      id: string;
      name: string;
      home_page_carousel_config: unknown;
      home_page_quick_nav_config: unknown;
    } | null;
  }>(
    `
    query SiteCampusHomeConfig($cid: bigint!) {
      campuses_by_pk(id: $cid) {
        id
        name
        home_page_carousel_config
        home_page_quick_nav_config
      }
    }
  `,
    { cid: campusId }
  );

  if (!data.campuses_by_pk) {
    return { kind: "not_found" };
  }

  const row = data.campuses_by_pk;

  return {
    kind: "ok",
    siteScope,
    campusId,
    campusName: row.name,
    home_page_carousel_config: row.home_page_carousel_config,
    home_page_quick_nav_config: row.home_page_quick_nav_config,
    legacyCampusOptions,
  };
}
