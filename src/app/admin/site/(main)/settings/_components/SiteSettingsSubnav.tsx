import Link from "next/link";

export function SiteSettingsSubnav({
  campusId,
  current,
}: {
  campusId: string;
  current: "carousel" | "quick-nav";
}) {
  const q = `?campusId=${encodeURIComponent(campusId)}`;
  const tabClass = (active: boolean) =>
    [
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-emerald-100 text-emerald-900"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
    ].join(" ");

  return (
    <nav className="mb-6 flex flex-wrap gap-2 border-b border-zinc-200 pb-3" aria-label="站点配置">
      <Link href={`/admin/site/settings/carousel${q}`} className={tabClass(current === "carousel")}>
        首页轮播图管理
      </Link>
      <Link href={`/admin/site/settings/quick-nav${q}`} className={tabClass(current === "quick-nav")}>
        首页快捷菜单管理
      </Link>
    </nav>
  );
}
