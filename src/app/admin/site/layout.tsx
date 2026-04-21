import { redirect } from "next/navigation";

import { canAccessSiteConsole, getConsoleAuth } from "@/server/admin-auth";

/** 站点后台根布局：仅鉴权。具体控制台壳与作用域在 `(main)/layout`。选择学校见 `/admin/site/scope-pick`。 */
export default async function AdminSiteRootLayout({ children }: { children: React.ReactNode }) {
  const auth = await getConsoleAuth();
  if (!auth) {
    redirect("/admin/login");
  }
  if (!canAccessSiteConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }
  return <>{children}</>;
}
