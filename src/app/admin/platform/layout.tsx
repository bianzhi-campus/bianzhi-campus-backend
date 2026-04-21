import { redirect } from "next/navigation";

import { AdminConsoleShell } from "@/app/admin/components/AdminConsoleShell";
import { canAccessPlatformConsole, getConsoleAuth } from "@/server/admin-auth";

export default async function AdminPlatformLayout({ children }: { children: React.ReactNode }) {
  const auth = await getConsoleAuth();
  if (!auth) {
    redirect("/admin/login");
  }
  if (!canAccessPlatformConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  const label =
    auth.mode === "legacy_full"
      ? "开发会话"
      : auth.access.nickname?.trim() || `用户 #${auth.access.userId}`;

  const navSections = [
    {
      items: [
        { href: "/admin/portal", label: "← 选择后台" },
        { href: "/admin/platform", label: "概览" },
        { href: "/admin/platform/users", label: "平台用户" },
      ],
    },
    {
      title: "数据",
      items: [
        { href: "/admin/platform/campuses", label: "学校" },
        { href: "/admin/platform/shops", label: "店铺" },
      ],
    },
  ];

  return (
    <AdminConsoleShell consoleTitle="平台后台" userLabel={label} navSections={navSections}>
      {children}
    </AdminConsoleShell>
  );
}
