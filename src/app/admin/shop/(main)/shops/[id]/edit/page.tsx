import { redirect } from "next/navigation";

/** 店铺资料编辑在平台后台；店铺后台仅维护商品等。 */
export default function ShopEditRedirectPage() {
  redirect("/admin/shop");
}
