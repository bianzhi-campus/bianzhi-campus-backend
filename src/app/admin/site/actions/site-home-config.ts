"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { adminGraphqlExecute } from "@/config-lib/graphql-client/admin-instance";
import { canWriteCampus, getConsoleAuth, type ConsoleAuth } from "@/server/admin-auth";

const CAROUSEL_PATH = "/admin/site/settings/carousel";
const QUICK_NAV_PATH = "/admin/site/settings/quick-nav";

function redirectForbidden() {
  redirect("/admin/portal?error=forbidden");
}

async function requireCampusManage(auth: ConsoleAuth, campusId: string): Promise<void> {
  if (auth.mode === "legacy_full") return;
  if (auth.mode === "jwt" && canWriteCampus(auth.access, campusId)) return;
  redirectForbidden();
}

async function requireAuth(): Promise<ConsoleAuth> {
  const auth = await getConsoleAuth();
  if (!auth) redirect("/admin/login");
  return auth;
}

function asRecord(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

const LINK_TYPES = new Set(["none", "shop", "mini_page", "h5"]);

function validateLinkPayload(raw: unknown): Record<string, unknown> {
  const o = asRecord(raw);
  const type = String(o.type ?? "none").trim();
  if (!LINK_TYPES.has(type)) {
    throw new Error("跳转类型无效");
  }
  if (type === "none") return { type: "none" };
  if (type === "shop") {
    const shop_id = String(o.shop_id ?? "").trim();
    if (!shop_id) throw new Error("选择「进入店铺」时，请填写店铺 ID");
    return { type: "shop", shop_id };
  }
  if (type === "mini_page") {
    const path = String(o.path ?? "").trim();
    if (!path) throw new Error("选择「小程序页面」时，请填写页面路径");
    const q = o.query;
    const base: Record<string, unknown> = { type: "mini_page", path };
    if (q != null && typeof q === "object" && !Array.isArray(q) && Object.keys(q as object).length > 0) {
      base.query = q;
    }
    return base;
  }
  if (type === "h5") {
    const url = String(o.url ?? "").trim();
    if (!url) throw new Error("选择「网页链接」时，请填写网址");
    return { type: "h5", url };
  }
  return { type: "none" };
}

function validateCarouselPayload(data: unknown): unknown[] {
  if (!Array.isArray(data)) throw new Error("数据格式错误，请刷新页面后重试");
  const out: unknown[] = [];
  for (let i = 0; i < data.length; i++) {
    const o = asRecord(data[i]);
    const image_url = String(o.image_url ?? "").trim();
    if (!image_url) throw new Error(`第 ${i + 1} 张轮播：请填写图片地址`);
    const title = String(o.title ?? "").trim();
    const sortN = Number(o.sort_order);
    if (!Number.isFinite(sortN)) throw new Error(`第 ${i + 1} 张轮播：排序须为数字`);
    const link = validateLinkPayload(o.link);
    out.push({ image_url, title, sort_order: sortN, link });
  }
  return out;
}

function validateQuickNavPayload(data: unknown): unknown[] {
  if (!Array.isArray(data)) throw new Error("数据格式错误，请刷新页面后重试");
  const out: unknown[] = [];
  for (let i = 0; i < data.length; i++) {
    const o = asRecord(data[i]);
    const title = String(o.title ?? "").trim();
    if (!title) throw new Error(`第 ${i + 1} 个入口：请填写名称`);
    const icon_url = String(o.icon_url ?? "").trim();
    if (!icon_url) throw new Error(`第 ${i + 1} 个入口：请填写图标地址`);
    const sortN = Number(o.sort_order);
    if (!Number.isFinite(sortN)) throw new Error(`第 ${i + 1} 个入口：排序须为数字`);
    const link = validateLinkPayload(o.link);
    out.push({ title, icon_url, sort_order: sortN, link });
  }
  return out;
}

function parseJsonBody(formData: FormData, key: string): unknown {
  const raw = String(formData.get(key) ?? "").trim();
  if (!raw) throw new Error("没有可保存的数据");
  return JSON.parse(raw) as unknown;
}

function redirectWithCampus(base: string, campusId: string, query: Record<string, string>): never {
  const q = new URLSearchParams(query);
  q.set("campusId", campusId);
  redirect(`${base}?${q.toString()}`);
}

/** 仅更新首页轮播 */
export async function saveSiteCarouselConfigAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  const campusId = String(formData.get("campus_id") ?? "").trim();
  if (!campusId) redirect(`${CAROUSEL_PATH}?error=invalid`);

  await requireCampusManage(auth, campusId);

  let carousel: unknown[];
  try {
    carousel = validateCarouselPayload(parseJsonBody(formData, "config_json"));
  } catch (e) {
    const msg =
      e instanceof SyntaxError
        ? "数据格式异常，请刷新页面后重试"
        : e instanceof Error
          ? e.message
          : "保存失败";
    redirectWithCampus(CAROUSEL_PATH, campusId, { error: "validate", message: msg });
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateCampusCarousel($id: bigint!, $carousel: json!) {
        update_campuses_by_pk(
          pk_columns: { id: $id }
          _set: { home_page_carousel_config: $carousel }
        ) {
          id
        }
      }
    `,
      { id: campusId, carousel }
    );
  } catch {
    redirectWithCampus(CAROUSEL_PATH, campusId, { error: "save" });
  }

  revalidatePath(CAROUSEL_PATH);
  revalidatePath(QUICK_NAV_PATH);
  revalidatePath("/admin/site");
  redirectWithCampus(CAROUSEL_PATH, campusId, { ok: "1" });
}

/** 仅更新首页快捷菜单（金刚区） */
export async function saveSiteQuickNavConfigAction(formData: FormData): Promise<void> {
  const auth = await requireAuth();
  const campusId = String(formData.get("campus_id") ?? "").trim();
  if (!campusId) redirect(`${QUICK_NAV_PATH}?error=invalid`);

  await requireCampusManage(auth, campusId);

  let quickNav: unknown[];
  try {
    quickNav = validateQuickNavPayload(parseJsonBody(formData, "config_json"));
  } catch (e) {
    const msg =
      e instanceof SyntaxError
        ? "数据格式异常，请刷新页面后重试"
        : e instanceof Error
          ? e.message
          : "保存失败";
    redirectWithCampus(QUICK_NAV_PATH, campusId, { error: "validate", message: msg });
  }

  try {
    await adminGraphqlExecute(
      `
      mutation UpdateCampusQuickNav($id: bigint!, $quickNav: json!) {
        update_campuses_by_pk(
          pk_columns: { id: $id }
          _set: { home_page_quick_nav_config: $quickNav }
        ) {
          id
        }
      }
    `,
      { id: campusId, quickNav }
    );
  } catch {
    redirectWithCampus(QUICK_NAV_PATH, campusId, { error: "save" });
  }

  revalidatePath(CAROUSEL_PATH);
  revalidatePath(QUICK_NAV_PATH);
  revalidatePath("/admin/site");
  redirectWithCampus(QUICK_NAV_PATH, campusId, { ok: "1" });
}
