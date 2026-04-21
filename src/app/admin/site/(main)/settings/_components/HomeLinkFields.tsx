"use client";

import type { HomeLinkForm, HomeLinkType } from "../home-config-types";

import { ShopSearchField } from "./ShopSearchField";

const LINK_LABELS: Record<HomeLinkType, string> = {
  none: "无跳转",
  shop: "进入店铺",
  mini_page: "打开小程序页面",
  h5: "打开网页",
};

export function HomeLinkFields({
  campusId,
  link,
  onChange,
  disabled,
}: {
  campusId: string;
  link: HomeLinkForm;
  onChange: (next: HomeLinkForm) => void;
  disabled?: boolean;
}) {
  function patch(p: Partial<HomeLinkForm>) {
    onChange({ ...link, ...p });
  }

  return (
    <div className="mt-3 space-y-3 rounded-md bg-zinc-50 p-3">
      <div>
        <label className="block text-xs font-medium text-zinc-600">点击后</label>
        <select
          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm text-zinc-900"
          value={link.type}
          disabled={disabled}
          onChange={(e) => patch({ type: e.target.value as HomeLinkType })}
        >
          {(Object.keys(LINK_LABELS) as HomeLinkType[]).map((k) => (
            <option key={k} value={k}>
              {LINK_LABELS[k]}
            </option>
          ))}
        </select>
      </div>
      {link.type === "shop" ? (
        <ShopSearchField
          campusId={campusId}
          shopId={link.shop_id}
          onShopIdChange={(id) => patch({ shop_id: id })}
          disabled={disabled}
        />
      ) : null}
      {link.type === "mini_page" ? (
        <>
          <div>
            <label className="block text-xs font-medium text-zinc-600">页面路径</label>
            <input
              type="text"
              value={link.path}
              disabled={disabled}
              onChange={(e) => patch({ path: e.target.value })}
              placeholder="例如 pages/index/index"
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm text-zinc-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600">页面参数（可选）</label>
            <p className="mt-0.5 text-xs text-zinc-500">每行一条，格式：参数名=值</p>
            <textarea
              value={link.queryLines}
              disabled={disabled}
              onChange={(e) => patch({ queryLines: e.target.value })}
              rows={3}
              placeholder={"id=1\ntab=2"}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-2 font-mono text-xs text-zinc-900"
            />
          </div>
        </>
      ) : null}
      {link.type === "h5" ? (
        <div>
          <label className="block text-xs font-medium text-zinc-600">网页地址</label>
          <input
            type="url"
            value={link.url}
            disabled={disabled}
            onChange={(e) => patch({ url: e.target.value })}
            placeholder="https://"
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm text-zinc-900"
          />
        </div>
      ) : null}
    </div>
  );
}
