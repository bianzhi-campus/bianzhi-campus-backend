"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_ACTIVE_CAMPUS_COOKIE,
  ADMIN_ACTIVE_SHOP_COOKIE,
} from "@/server/admin-console-scope";
import { ADMIN_JWT_COOKIE, resolveAccessFromTokenString } from "@/server/admin-auth";
import { ADMIN_SESSION_COOKIE } from "@/server/admin-session";
import { authenticatePhonePassword } from "@/server/phone-password-auth";

const COOKIE_MAX_AGE = 7 * 24 * 3600;

/** 后台登录：手机号 + 密码（与 `POST /api/auth/phone-password-login` 同一套校验），写入 JWT Cookie 后进入门户 */
export async function loginWithPhonePasswordAction(formData: FormData): Promise<void> {
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  let token: string;
  try {
    const auth = await authenticatePhonePassword(phone, password);
    if (!auth.ok) {
      redirect("/admin/login?error=credentials");
    }
    token = auth.token;
  } catch {
    redirect("/admin/login?error=server");
  }

  const access = await resolveAccessFromTokenString(token);
  if (!access) {
    redirect("/admin/login?error=forbidden");
  }

  const store = await cookies();
  /** 须为 `/`，否则 `fetch('/api/admin/...')` 不会携带 Cookie，列表接口会 401 */
  store.set(ADMIN_JWT_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  store.set(ADMIN_ACTIVE_CAMPUS_COOKIE, "", { path: "/", maxAge: 0 });
  store.set(ADMIN_ACTIVE_SHOP_COOKIE, "", { path: "/", maxAge: 0 });

  revalidatePath("/admin");
  revalidatePath("/admin/portal");
  redirect("/admin/portal?welcome=1");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  store.set(ADMIN_JWT_COOKIE, "", { path: "/", maxAge: 0 });
  store.set(ADMIN_JWT_COOKIE, "", { path: "/admin", maxAge: 0 });
  store.set(ADMIN_ACTIVE_CAMPUS_COOKIE, "", { path: "/", maxAge: 0 });
  store.set(ADMIN_ACTIVE_CAMPUS_COOKIE, "", { path: "/admin", maxAge: 0 });
  store.set(ADMIN_ACTIVE_SHOP_COOKIE, "", { path: "/", maxAge: 0 });
  store.set(ADMIN_ACTIVE_SHOP_COOKIE, "", { path: "/admin", maxAge: 0 });
  revalidatePath("/admin");
  revalidatePath("/admin/portal");
  redirect("/admin/login");
}
