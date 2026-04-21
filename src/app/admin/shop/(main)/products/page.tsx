import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ShopProductsTable } from "@/app/admin/shop/(main)/products/ShopProductsTable";
import { canAccessShopConsole, getConsoleAuth } from "@/server/admin-auth";

/** 必须动态渲染：否则静态化阶段无 Cookie，会误判未登录并跳登录页 */
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  if (!canAccessShopConsole(auth)) {
    redirect("/admin/portal?error=forbidden");
  }

  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">加载中…</p>}>
      <ShopProductsTable />
    </Suspense>
  );
}
