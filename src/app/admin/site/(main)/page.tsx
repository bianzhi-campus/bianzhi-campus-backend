import Link from "next/link";

export default function AdminSiteHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">站点概览</h1>
      <p className="mt-2 text-zinc-600">
        学校名称与地址等由<strong className="text-zinc-800">平台管理员</strong>在平台后台维护。您作为学校管理员，仅维护本校的
        <strong className="text-zinc-800">组织结构（楼栋、房间）</strong>与<strong className="text-zinc-800">本校成员</strong>。
      </p>
      <ul className="mt-8 flex flex-col gap-3 text-sm">
        <li>
          <Link href="/admin/site/org" className="font-medium text-emerald-700 hover:underline">
            组织结构
          </Link>
          <span className="text-zinc-500"> — 楼栋、房间一览与维护</span>
        </li>
        <li>
          <Link href="/admin/site/members" className="font-medium text-emerald-700 hover:underline">
            本校成员
          </Link>
          <span className="text-zinc-500"> — campus_users，本校角色与成员</span>
        </li>
      </ul>
    </div>
  );
}
