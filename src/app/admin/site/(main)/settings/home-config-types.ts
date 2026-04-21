/** 与 GraphQL / 小程序约定一致 */
export type HomeLinkType = "none" | "shop" | "mini_page" | "h5";

export type HomeLinkForm = {
  type: HomeLinkType;
  shop_id: string;
  path: string;
  /** 每行 key=value，序列化为 link.query 对象 */
  queryLines: string;
  url: string;
};

export type CarouselItemForm = {
  rowKey: string;
  image_url: string;
  title: string;
  sort_order: string;
  link: HomeLinkForm;
};

export type QuickNavItemForm = {
  rowKey: string;
  title: string;
  icon_url: string;
  sort_order: string;
  link: HomeLinkForm;
};

export function newRowKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `r-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function asRecord(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

const LINK_TYPES: HomeLinkType[] = ["none", "shop", "mini_page", "h5"];

function parseLinkType(raw: unknown): HomeLinkType {
  const s = String(raw ?? "").trim();
  return LINK_TYPES.includes(s as HomeLinkType) ? (s as HomeLinkType) : "none";
}

function queryObjectToLines(query: unknown): string {
  if (!query || typeof query !== "object" || Array.isArray(query)) return "";
  const o = query as Record<string, unknown>;
  return Object.entries(o)
    .map(([k, v]) => `${k}=${String(v)}`)
    .join("\n");
}

export function linkFromApi(raw: unknown): HomeLinkForm {
  const o = asRecord(raw);
  const type = parseLinkType(o.type);
  return {
    type,
    shop_id: String(o.shop_id ?? ""),
    path: String(o.path ?? ""),
    queryLines: queryObjectToLines(o.query),
    url: String(o.url ?? ""),
  };
}

export function carouselItemFromApi(raw: unknown, rowKey?: string): CarouselItemForm {
  const o = asRecord(raw);
  return {
    rowKey: rowKey ?? newRowKey(),
    image_url: String(o.image_url ?? ""),
    title: String(o.title ?? ""),
    sort_order: String(o.sort_order ?? "0"),
    link: linkFromApi(o.link),
  };
}

export function quickNavItemFromApi(raw: unknown, rowKey?: string): QuickNavItemForm {
  const o = asRecord(raw);
  return {
    rowKey: rowKey ?? newRowKey(),
    title: String(o.title ?? ""),
    icon_url: String(o.icon_url ?? ""),
    sort_order: String(o.sort_order ?? "0"),
    link: linkFromApi(o.link),
  };
}

export function parseCarouselItemsFromConfig(raw: unknown): CarouselItemForm[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((x) => carouselItemFromApi(x));
}

export function parseQuickNavItemsFromConfig(raw: unknown): QuickNavItemForm[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((x) => quickNavItemFromApi(x));
}

export function parseQueryLines(text: string): Record<string, string> | undefined {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const out: Record<string, string> = {};
  for (const line of lines) {
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const k = line.slice(0, eq).trim();
    const v = line.slice(eq + 1).trim();
    if (k) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

export function serializeLinkForApi(f: HomeLinkForm): Record<string, unknown> {
  switch (f.type) {
    case "none":
      return { type: "none" };
    case "shop":
      return { type: "shop", shop_id: f.shop_id.trim() };
    case "mini_page": {
      const q = parseQueryLines(f.queryLines);
      const base: Record<string, unknown> = { type: "mini_page", path: f.path.trim() };
      if (q) base.query = q;
      return base;
    }
    case "h5":
      return { type: "h5", url: f.url.trim() };
    default:
      return { type: "none" };
  }
}

export function serializeCarouselForSave(rows: CarouselItemForm[]): unknown[] {
  return rows.map((r) => ({
    image_url: r.image_url.trim(),
    title: r.title.trim(),
    sort_order: Number(r.sort_order) || 0,
    link: serializeLinkForApi(r.link),
  }));
}

export function serializeQuickNavForSave(rows: QuickNavItemForm[]): unknown[] {
  return rows.map((r) => ({
    title: r.title.trim(),
    icon_url: r.icon_url.trim(),
    sort_order: Number(r.sort_order) || 0,
    link: serializeLinkForApi(r.link),
  }));
}
