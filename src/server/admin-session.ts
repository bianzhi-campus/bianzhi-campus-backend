import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "zd_admin";

export function signAdminSession(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET 未配置：无法签发管理后台会话，请在 .env.local 中设置随机字符串。"
    );
  }
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = String(expiry);
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}.${sig}`, "utf8").toString("base64url");
}

export function verifyAdminCookie(value: string | undefined): boolean {
  if (!value) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  try {
    const decoded = Buffer.from(value, "base64url").toString("utf8");
    const dot = decoded.indexOf(".");
    if (dot < 0) return false;
    const expiry = decoded.slice(0, dot);
    const sig = decoded.slice(dot + 1);
    if (Date.now() > Number(expiry)) return false;
    const expected = createHmac("sha256", secret).update(expiry).digest("hex");
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
