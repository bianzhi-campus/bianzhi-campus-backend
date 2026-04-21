import Link from "next/link";

import { loginWithPhonePasswordAction } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const err = sp.error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">植得校园 · 管理后台</h1>
        <p className="mt-1 text-sm text-zinc-500">
          使用与端上一致的<strong className="text-zinc-700">手机号 + 密码</strong>登录（校验规则同{" "}
          <code className="rounded bg-zinc-100 px-1 text-xs">POST /api/auth/phone-password-login</code>
          ）。账号需具备平台 / 学校 / 店铺管理员权限之一。登录成功后将进入<strong className="text-zinc-700">选择后台</strong>页，仅展示您可进入的入口。
        </p>

        {err === "credentials" && (
          <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">手机号或密码错误</p>
        )}
        {err === "forbidden" && (
          <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
            该账号暂无后台权限（需平台管理员或学校/店铺管理员）。
          </p>
        )}
        {err === "server" && (
          <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            登录服务异常，请检查服务端配置（如 HASURA_ADMIN_SECRET、数据库连接）。
          </p>
        )}

        <form action={loginWithPhonePasswordAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">
              手机号
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            登录
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          <Link href="/" className="text-emerald-700 hover:underline">
            返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
