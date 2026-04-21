import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

import { HasuraJwtToken } from "@/config-lib/hasura/HasuraJwtToken";
import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";

/** 与库内 `users.mobile` 对齐：去空白，可选去掉 +86 / 86 前缀 */
export function normalizeMobile(raw: string): string {
  let s = raw.trim().replace(/\s/g, "");
  if (s.startsWith("+86")) s = s.slice(3);
  else if (s.length === 13 && s.startsWith("86")) s = s.slice(2);
  return s;
}

function md5LowerHex(plain: string): string {
  return createHash("md5").update(plain, "utf8").digest("hex");
}

function safeEqualMd5Hex(a: string, b: string): boolean {
  const ba = Buffer.from(a.toLowerCase(), "hex");
  const bb = Buffer.from(b.toLowerCase(), "hex");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export type PhonePasswordAuthResult =
  | { ok: true; userId: string; token: string }
  | { ok: false; reason: "missing_fields" | "invalid_credentials" };

/**
 * 与 `/api/auth/phone-password-login` 相同规则：查 `users.mobile`，密码与 `users.password`（md5 小写）比对。
 */
export async function authenticatePhonePassword(
  phoneRaw: string,
  plainPassword: string
): Promise<PhonePasswordAuthResult> {
  const mobile = normalizeMobile(phoneRaw);
  if (!mobile || !plainPassword) {
    return { ok: false, reason: "missing_fields" };
  }

  const { users } = await adminGraphqlExecute<{
    users: Array<{ id: string; password: string | null }>;
  }>(
    `
    query UsersByMobile($mobile: String!) {
      users(where: { mobile: { _eq: $mobile } }, limit: 1) {
        id
        password
      }
    }
  `,
    { mobile }
  );

  const row = users[0];
  const stored = row?.password?.trim() ?? "";

  if (
    !row ||
    !stored ||
    stored.length !== 32 ||
    !safeEqualMd5Hex(md5LowerHex(plainPassword), stored)
  ) {
    return { ok: false, reason: "invalid_credentials" };
  }

  const userId = String(row.id);
  const token = HasuraJwtToken.generateToken({ userId });
  return { ok: true, userId, token };
}
