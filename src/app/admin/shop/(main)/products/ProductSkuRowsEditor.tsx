"use client";

import { useMemo, useState } from "react";

import { uploadFileToQiniuDirect } from "@/lib/qiniu-direct-upload";

export type SkuRowDraft = {
  name: string;
  price: string;
  stock: string;
  price_unit: string;
  sort_order: string;
  image_url: string;
  is_shelved: boolean;
};

const emptyRow = (): SkuRowDraft => ({
  name: "",
  price: "0",
  stock: "0",
  price_unit: "份",
  sort_order: "0",
  image_url: "",
  is_shelved: true,
});

type Props = {
  /** 新建页用：初始至少一行 */
  initialRows?: SkuRowDraft[];
};

export function ProductSkuRowsEditor({ initialRows }: Props) {
  const [rows, setRows] = useState<SkuRowDraft[]>(() =>
    initialRows && initialRows.length > 0 ? initialRows : [emptyRow()]
  );

  const jsonPayload = useMemo(() => JSON.stringify(rows), [rows]);

  function updateRow(index: number, patch: Partial<SkuRowDraft>) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, emptyRow()]);
  }

  function removeRow(index: number) {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="sku_rows" value={jsonPayload} />

      {rows.map((row, i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 bg-zinc-50/80 p-3 grid grid-cols-1 gap-2 sm:grid-cols-12 sm:items-end"
        >
          <div className="sm:col-span-3">
            <label className="block text-xs font-medium text-zinc-600">规格名</label>
            <input
              value={row.name}
              onChange={(e) => updateRow(i, { name: e.target.value })}
              placeholder="如：大份 / 标准"
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-zinc-600">价格(元)</label>
            <input
              type="number"
              step="0.01"
              value={row.price}
              onChange={(e) => updateRow(i, { price: e.target.value })}
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-xs font-medium text-zinc-600">单位</label>
            <input
              value={row.price_unit}
              onChange={(e) => updateRow(i, { price_unit: e.target.value })}
              placeholder="份"
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-zinc-600">库存</label>
            <input
              type="number"
              value={row.stock}
              onChange={(e) => updateRow(i, { stock: e.target.value })}
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-xs font-medium text-zinc-600">排序</label>
            <input
              type="number"
              value={row.sort_order}
              onChange={(e) => updateRow(i, { sort_order: e.target.value })}
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <SkuSpecImageCell
              imageUrl={row.image_url}
              onUrlChange={(u) => updateRow(i, { image_url: u })}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-1">
            <label className="flex items-center gap-1 text-xs text-zinc-600">
              <input
                type="checkbox"
                checked={row.is_shelved}
                onChange={(e) => updateRow(i, { is_shelved: e.target.checked })}
                className="rounded border-zinc-300"
              />
              上架
            </label>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="text-xs text-red-600 hover:underline disabled:opacity-40"
              disabled={rows.length <= 1}
            >
              移除此行
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="rounded-md border border-dashed border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
      >
        + 添加规格
      </button>
      <p className="text-xs text-zinc-500">
        保存商品时将同时创建以上规格（至少填写一条规格名）。单位用于标价说明，如：个、份、斤。规格图支持七牛直传。
      </p>
    </div>
  );
}

function SkuSpecImageCell({
  imageUrl,
  onUrlChange,
}: {
  imageUrl: string;
  onUrlChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const u = await uploadFileToQiniuDirect(file);
      onUrlChange(u);
    } catch (er) {
      setErr(er instanceof Error ? er.message : "上传失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="block text-xs font-medium text-zinc-600">规格图</span>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <label className="cursor-pointer rounded border border-zinc-300 bg-white px-2 py-1 text-xs text-zinc-800 hover:bg-zinc-50">
          <input type="file" accept="image/*" className="sr-only" disabled={busy} onChange={onFile} />
          {busy ? "上传中" : "上传"}
        </label>
        {imageUrl ? (
          <>
            <button
              type="button"
              className="text-xs text-red-600 hover:underline"
              onClick={() => onUrlChange("")}
            >
              清除
            </button>
            <div className="w-full overflow-hidden rounded border border-zinc-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="" className="h-16 w-16 object-cover" />
            </div>
          </>
        ) : null}
      </div>
      {err ? <p className="mt-1 text-[10px] text-red-600">{err}</p> : null}
    </div>
  );
}
