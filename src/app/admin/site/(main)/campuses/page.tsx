import { redirect } from "next/navigation";

/** 学校档案由平台管理员在平台后台维护，站点后台不再提供学校列表。 */
export default function SiteCampusesRedirectPage() {
  redirect("/admin/site");
}
