import { redirect } from "next/navigation";

/** 楼栋列表已合并至「组织结构」。 */
export default function BuildingsRedirectPage() {
  redirect("/admin/site/org");
}
