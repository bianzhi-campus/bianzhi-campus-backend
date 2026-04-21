import { redirect } from "next/navigation";

import { getConsoleAuth } from "@/server/admin-auth";

/** `/admin`：已登录则进入「选择后台」中间页 */
export default async function AdminRootPage() {
  const auth = await getConsoleAuth();
  if (!auth) {
    redirect("/admin/login");
  }
  redirect("/admin/portal");
}
