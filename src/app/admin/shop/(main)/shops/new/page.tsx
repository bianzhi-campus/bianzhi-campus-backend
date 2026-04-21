import { redirect } from "next/navigation";

/** 新建店铺仅在平台后台。 */
export default function ShopNewRedirectPage() {
  redirect("/admin/shop");
}
