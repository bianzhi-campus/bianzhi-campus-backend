"use client";

import { useState, useTransition } from "react";

import { saveSiteQuickNavConfigAction } from "@/app/admin/site/actions/site-home-config";

import type { QuickNavItemForm } from "../home-config-types";
import { newRowKey, quickNavItemFromApi, serializeQuickNavForSave } from "../home-config-types";
import { HomeLinkFields } from "./HomeLinkFields";
import { ImageUrlWithQiniuUpload } from "./ImageUrlWithQiniuUpload";

export function SiteQuickNavEditor({
  campusId,
  initialItems,
}: {
  campusId: string;
  initialItems: QuickNavItemForm[];
}) {
  const [pending, startTransition] = useTransition();
  const [items, setItems] = useState(initialItems);

  function updateRow(index: number, next: QuickNavItemForm) {
    setItems((rows) => rows.map((r, i) => (i === index ? next : r)));
  }

  function addRow() {
    setItems((rows) => [
      ...rows,
      quickNavItemFromApi(
        {
          title: "",
          icon_url: "",
          sort_order: 0,
          link: { type: "none" },
        },
        newRowKey()
      ),
    ]);
  }

  function removeRow(index: number) {
    setItems((rows) => rows.filter((_, i) => i !== index));
  }

  function moveRow(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    setItems((rows) => {
      const copy = [...rows];
      const t = copy[index]!;
      copy[index] = copy[j]!;
      copy[j] = t;
      return copy;
    });
  }

  function save() {
    const fd = new FormData();
    fd.set("campus_id", campusId);
    fd.set("config_json", JSON.stringify(serializeQuickNavForSave(items)));
    startTransition(() => {
      void saveSiteQuickNavConfigAction(fd);
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600">
        首页宫格或快捷入口，每一项对应一个图标和名称。图标请使用正方形透明底 PNG 或 JPG 链接。排序数字越大越靠前。
      </p>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center text-sm text-zinc-500">
          暂无入口，点击下方按钮添加。
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((row, index) => (
            <li
              key={row.rowKey}
              className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2">
                <span className="text-sm font-medium text-zinc-800">入口 {index + 1}</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveRow(index, -1)}
                    disabled={index === 0 || pending}
                    className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50 disabled:opacity-40"
                  >
                    上移
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRow(index, 1)}
                    disabled={index === items.length - 1 || pending}
                    className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50 disabled:opacity-40"
                  >
                    下移
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    disabled={pending}
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50 disabled:opacity-40"
                  >
                    删除
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-zinc-600">名称</label>
                  <input
                    type="text"
                    value={row.title}
                    onChange={(e) =>
                      updateRow(index, { ...row, title: e.target.value })
                    }
                    placeholder="例如：到店自取"
                    className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-2 text-sm text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600">排序（越大越靠前）</label>
                  <input
                    type="number"
                    value={row.sort_order}
                    onChange={(e) =>
                      updateRow(index, { ...row, sort_order: e.target.value })
                    }
                    className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-2 text-sm text-zinc-900"
                  />
                </div>
                <ImageUrlWithQiniuUpload
                  className="sm:col-span-2"
                  label="入口图标"
                  value={row.icon_url}
                  onChange={(url) => updateRow(index, { ...row, icon_url: url })}
                  disabled={pending}
                  previewClassName="mt-2 h-14 w-14 rounded border border-zinc-200 object-cover"
                />
              </div>

              <HomeLinkFields
                campusId={campusId}
                disabled={pending}
                link={row.link}
                onChange={(link) => updateRow(index, { ...row, link })}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addRow}
          disabled={pending}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-50"
        >
          添加入口
        </button>
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {pending ? "保存中…" : "保存"}
        </button>
      </div>
    </div>
  );
}
