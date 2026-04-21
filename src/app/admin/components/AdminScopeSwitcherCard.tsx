"use client";

type Option = { id: string; name: string };

type Props = {
  /** 学校 / 店铺 */
  kind: "campus" | "shop";
  options: Option[];
  currentId: string;
  /** 多选切换时提交；与 `scope-actions` 中 switch 一致 */
  switchAction: (formData: FormData) => Promise<void>;
};

const copy = {
  campus: {
    title: "当前学校",
    switchTitle: "切换学校",
    hint: "切换后，概览、组织结构、本校成员等均针对所选学校。",
    field: "campus_id" as const,
    defaultLabel: "同时将所选学校设为下次登录默认",
  },
  shop: {
    title: "当前店铺",
    switchTitle: "切换店铺",
    hint: "切换后，商品、订单、收银等操作均针对所选店铺。",
    field: "shop_id" as const,
    defaultLabel: "同时将所选店铺设为下次登录默认",
  },
};

/**
 * 站点 / 店铺后台侧栏：展示当前管理范围；多校/多店时可下拉切换并写 Cookie。
 */
export function AdminScopeSwitcherCard({ kind, options, currentId, switchAction }: Props) {
  const c = copy[kind];
  const safeOptions = options.length > 0 ? options : [{ id: currentId, name: `#${currentId}` }];

  if (safeOptions.length <= 1) {
    const name = safeOptions[0]?.name ?? `ID ${currentId}`;
    return (
      <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50/90 px-3 py-2.5 shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">{c.title}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-zinc-900" title={name}>
          {name}
        </p>
        <p className="mt-1.5 text-[11px] leading-snug text-zinc-500">
          您仅管理{kind === "campus" ? "一所学校" : "一间店铺"}，无需切换。
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/90 to-white px-3 py-3 shadow-sm">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm" aria-hidden>
          {kind === "campus" ? "校" : "店"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-emerald-950">{c.switchTitle}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-emerald-800/90">{c.hint}</p>
        </div>
      </div>

      <form action={switchAction} className="mt-3 space-y-2">
        <div>
          <label htmlFor={`admin-scope-${kind}`} className="sr-only">
            {c.switchTitle}
          </label>
          <select
            id={`admin-scope-${kind}`}
            name={c.field}
            key={currentId}
            defaultValue={currentId}
            onChange={(e) => {
              e.currentTarget.form?.requestSubmit();
            }}
            className="w-full rounded-lg border border-emerald-200/80 bg-white px-2.5 py-2 text-sm font-medium text-zinc-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {safeOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-snug text-zinc-600">
          <input type="checkbox" name="set_as_default" className="mt-0.5 rounded border-zinc-300" />
          <span>{c.defaultLabel}</span>
        </label>
      </form>
    </div>
  );
}
