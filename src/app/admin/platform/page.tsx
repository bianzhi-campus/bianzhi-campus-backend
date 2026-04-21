import Link from "next/link";

export default function AdminPlatformHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">平台概览</h1>
      <p className="mt-2 text-zinc-600">
        在此管理平台账号角色、新建学校/店铺，并为学校或店铺指派管理员（按手机号关联已注册用户）。
      </p>
      <ul className="mt-8 flex flex-col gap-3 text-sm">
        <li>
          <Link href="/admin/platform/users" className="font-medium text-emerald-700 hover:underline">
            平台用户
          </Link>
          <span className="text-zinc-500"> — 设置 users.role（平台管理员 / 普通用户）</span>
        </li>
        <li>
          <Link href="/admin/platform/campuses" className="font-medium text-emerald-700 hover:underline">
            学校管理
          </Link>
          <span className="text-zinc-500"> — 新建学校、成员与管理员</span>
        </li>
        <li>
          <Link href="/admin/platform/shops" className="font-medium text-emerald-700 hover:underline">
            店铺管理
          </Link>
          <span className="text-zinc-500"> — 新建店铺、成员与管理员</span>
        </li>
      </ul>
    </div>
  );
}
