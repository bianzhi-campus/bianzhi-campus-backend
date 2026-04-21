import { redirect } from "next/navigation";

import { AdminConsoleShell } from "@/app/admin/components/AdminConsoleShell";
import { AdminScopeSwitcherCard } from "@/app/admin/components/AdminScopeSwitcherCard";
import { switchShopScopeAction } from "@/app/admin/scope-actions";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { resolveShopScope } from "@/server/admin-console-scope";
import { getConsoleAuth } from "@/server/admin-auth";

export default async function AdminShopMainLayout({ children }: { children: React.ReactNode }) {
  const auth = await getConsoleAuth();
  if (!auth) {
    redirect("/admin/login");
  }

  const shopScope = await resolveShopScope(auth);
  if ("redirect" in shopScope) {
    redirect(shopScope.redirect);
  }
  if (shopScope.kind === "need_shop_pick") {
    redirect("/admin/shop/scope-pick");
  }

  const label =
    auth.mode === "legacy_full"
      ? "开发会话"
      : auth.access.nickname?.trim() || `用户 #${auth.access.userId}`;

  let shopScopeBlock: React.ReactNode = null;
  if (auth.mode === "jwt" && auth.access.shopAdminIds.length > 0) {
    const ids = auth.access.shopAdminIds;
    const currentId =
      shopScope.kind === "scoped" ? shopScope.shopIds[0] ?? ids[0] : ids[0];

    if (ids.length === 1) {
      const { shops_by_pk } = await adminGraphqlExecute<{
        shops_by_pk: { id: string; name: string } | null;
      }>(
        `
        query ShopLayoutShopOne($id: bigint!) {
          shops_by_pk(id: $id) {
            id
            name
          }
        }
      `,
        { id: ids[0] }
      );
      const name = shops_by_pk?.name?.trim() || `店铺 #${ids[0]}`;
      shopScopeBlock = (
        <AdminScopeSwitcherCard
          kind="shop"
          options={[{ id: ids[0], name }]}
          currentId={currentId}
          switchAction={switchShopScopeAction}
        />
      );
    } else {
      const { shops } = await adminGraphqlExecute<{
        shops: Array<{ id: string; name: string }>;
      }>(
        `
        query ShopLayoutShops($ids: [bigint!]!) {
          shops(where: { id: { _in: $ids } }, order_by: { id: asc }) {
            id
            name
          }
        }
      `,
        { ids }
      );
      shopScopeBlock = (
        <AdminScopeSwitcherCard
          kind="shop"
          options={shops}
          currentId={currentId}
          switchAction={switchShopScopeAction}
        />
      );
    }
  }

  const navSections = [
    { items: [{ href: "/admin/portal", label: "← 选择后台" }] },
    {
      title: "商城",
      items: [
        { href: "/admin/shop", label: "概览" },
        { href: "/admin/shop/products", label: "商品" },
        { href: "/admin/shop/orders", label: "订单" },
        { href: "/admin/shop/pos", label: "收银台" },
      ],
    },
  ];

  return (
    <AdminConsoleShell
      consoleTitle="店铺后台"
      userLabel={label}
      navSections={navSections}
      sidebarExtra={shopScopeBlock ? <div className="mt-1">{shopScopeBlock}</div> : undefined}
    >
      {children}
    </AdminConsoleShell>
  );
}
