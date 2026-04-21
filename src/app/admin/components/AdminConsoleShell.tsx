"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { logoutAction } from "@/app/admin/login/actions";

export type AdminNavItem = {
  href: string;
  label: string;
  /** 多个路径前缀视为同一菜单高亮（如组织结构合并楼栋/房间子路由） */
  activeHrefPrefixes?: string[];
};

export type AdminNavSection = {
  /** 分组标题，如「数据」「校园组织」 */
  title?: string;
  items: AdminNavItem[];
};

function isNavActive(pathname: string, item: AdminNavItem): boolean {
  if (item.activeHrefPrefixes?.length) {
    return item.activeHrefPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  }
  const href = item.href;
  const roots = new Set(["/admin/site", "/admin/shop", "/admin/platform"]);
  if (roots.has(href)) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminConsoleShell({
  productLine = "植得校园",
  consoleTitle,
  userLabel,
  navSections,
  sidebarExtra,
  children,
}: {
  productLine?: string;
  consoleTitle: string;
  userLabel: string;
  navSections: AdminNavSection[];
  /** 侧栏额外区域（如多校/多店切换） */
  sidebarExtra?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("admin-drawer-open");
    } else {
      document.body.classList.remove("admin-drawer-open");
    }
    return () => document.body.classList.remove("admin-drawer-open");
  }, [mobileOpen]);

  return (
    <div className="admin-console flex w-full min-h-dvh flex-row bg-zinc-100 text-zinc-900 lg:h-dvh lg:min-h-0 lg:max-h-dvh lg:overflow-hidden">
      {/* 移动端顶栏 */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white px-4 shadow-sm lg:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="admin-sidebar"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">{mobileOpen ? "关闭菜单" : "打开菜单"}</span>
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-zinc-400">{productLine}</p>
          <p className="truncate text-sm font-semibold text-zinc-900">{consoleTitle}</p>
        </div>
        <span className="max-w-[40%] truncate text-xs text-zinc-500" title={userLabel}>
          {userLabel}
        </span>
      </header>

      {/* 遮罩 */}
      {mobileOpen ? (
        <button
          type="button"
          aria-label="关闭菜单"
          className="fixed inset-0 z-40 bg-zinc-900/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      {/* 侧栏 */}
      <aside
        id="admin-sidebar"
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[min(18rem,100vw-2rem)] flex-col overflow-hidden border-r border-zinc-200 bg-white shadow-xl transition-transform duration-200 ease-out lg:static lg:z-0 lg:h-full lg:min-h-0 lg:w-60 lg:shrink-0 lg:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-14 shrink-0 items-center border-b border-zinc-100 px-4 lg:h-auto lg:border-0 lg:px-3 lg:pt-6">
          <div className="min-w-0 lg:px-2">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{productLine}</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-zinc-900">{consoleTitle}</p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-2 lg:pt-0">
          <div className="px-2">
            <p className="truncate text-xs text-zinc-500" title={userLabel}>
              {userLabel}
            </p>
          </div>
          {sidebarExtra}

          <nav className="mt-4 flex flex-col gap-4">
            {navSections.map((section, si) => (
              <div key={si}>
                {section.title ? (
                  <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {section.title}
                  </p>
                ) : null}
                <ul className="flex flex-col gap-0.5">
                  {section.items.map((item) => {
                    const active = isNavActive(pathname, item);
                    return (
                      <li key={item.href + item.label}>
                        <Link
                          href={item.href}
                          className={[
                            "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                            active
                              ? "bg-emerald-50 font-medium text-emerald-900 ring-1 ring-emerald-200/80"
                              : "text-zinc-700 hover:bg-zinc-100",
                          ].join(" ")}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-zinc-100 p-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50"
            >
              退出登录
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1 pt-14 lg:min-h-0 lg:overflow-y-auto lg:pt-0">
        <main className="min-w-0">
          <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
