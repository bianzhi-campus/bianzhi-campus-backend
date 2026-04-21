import { redirect } from "next/navigation";

import { canAccessShopConsole, getConsoleAuth } from "@/server/admin-auth";

/** 店铺后台根布局：仅鉴权。控制台壳在 `(main)/layout`。选择店铺见 `/admin/shop/scope-pick`。 */
export default async function AdminShopRootLayout({ children }: { children: React.ReactNode }) {
  const auth = await getConsoleAuth();
  if (!auth) {
    redirect("/admin/login");
  }
  if (!canAccessShopConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }
  return <>{children}</>;
}
