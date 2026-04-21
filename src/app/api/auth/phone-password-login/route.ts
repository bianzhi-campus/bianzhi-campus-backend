import { NextRequest, NextResponse } from "next/server";

import { authenticatePhonePassword } from "@/server/phone-password-auth";

/**
 * 手机号 + 密码登录，返回与 `phone-login` / `wx-login` 相同结构：`{ userId, token }`。
 * 实现见 `@/server/phone-password-auth`（与后台登录共用）。
 */
export async function POST(req: NextRequest) {
  try {
    let body: { phone?: string; password?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "请求体须为 JSON" }, { status: 400 });
    }

    const phoneRaw = typeof body.phone === "string" ? body.phone : "";
    const password = typeof body.password === "string" ? body.password : "";

    const result = await authenticatePhonePassword(phoneRaw, password);
    if (!result.ok) {
      if (result.reason === "missing_fields") {
        return NextResponse.json({ error: "手机号和密码不能为空" }, { status: 400 });
      }
      return NextResponse.json({ error: "手机号或密码错误" }, { status: 401 });
    }

    return NextResponse.json({ userId: result.userId, token: result.token });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "服务异常";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
