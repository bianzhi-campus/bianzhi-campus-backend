import { redirect } from "next/navigation";

/** 店铺档案由平台管理员在平台后台维护，店铺后台不再提供店铺列表。 */
export default function ShopShopsRedirectPage() {
  redirect("/admin/shop");
}
