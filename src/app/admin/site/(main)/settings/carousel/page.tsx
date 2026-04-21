import Link from "next/link";

import { loadSiteSettingsPage } from "../load-site-settings";
import { parseCarouselItemsFromConfig } from "../home-config-types";
import { SiteCarouselEditor } from "../_components/SiteCarouselEditor";
import { SiteSettingsSubnav } from "../_components/SiteSettingsSubnav";

type Props = {
  searchParams: Promise<{ campusId?: string; error?: string; ok?: string; message?: string }>;
};

export default async function SiteCarouselSettingsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const ctx = await loadSiteSettingsPage({ campusId: sp.campusId });

  if (ctx.kind === "no_campus") {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">首页轮播图管理</h1>
        <p className="mt-4 text-sm text-zinc-600">暂无学校数据。请先在平台后台创建学校。</p>
      </div>
    );
  }

  if (ctx.kind === "not_found") {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">首页轮播图管理</h1>
        <p className="mt-4 text-sm text-red-700">未找到该学校。</p>
      </div>
    );
  }

  const { campusId, campusName, home_page_carousel_config, legacyCampusOptions, siteScope } =
    ctx;
  const initialItems = parseCarouselItemsFromConfig(home_page_carousel_config);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/site" className="text-sm text-emerald-700 hover:underline">
          ← 概览
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">首页轮播图 · {campusName}</h1>
        <p className="mt-1 text-sm text-zinc-500">配置小程序首页顶部轮播图与点击跳转。</p>
      </div>

      <SiteSettingsSubnav campusId={campusId} current="carousel" />

      {siteScope.kind === "full" && legacyCampusOptions.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
          <span className="text-zinc-600">当前学校：</span>
          {legacyCampusOptions.map((c) => (
            <Link
              key={c.id}
              href={`/admin/site/settings/carousel?campusId=${encodeURIComponent(c.id)}`}
              className={`rounded-md px-2 py-1 ${
                c.id === campusId ? "bg-emerald-100 font-medium text-emerald-900" : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {sp.error === "invalid" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">参数无效。</p>
      )}
      {sp.error === "validate" && sp.message && (
        <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">{sp.message}</p>
      )}
      {sp.error === "save" && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">保存失败，请稍后重试。</p>
      )}
      {sp.ok === "1" && (
        <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800">已保存。</p>
      )}

      <SiteCarouselEditor campusId={campusId} initialItems={initialItems} />
    </div>
  );
}
