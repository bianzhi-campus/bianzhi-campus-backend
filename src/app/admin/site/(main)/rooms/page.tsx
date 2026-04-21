import { redirect } from "next/navigation";

/** 房间列表已合并至「组织结构」。 */
export default function RoomsRedirectPage() {
  redirect("/admin/site/org");
}
