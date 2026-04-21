"use client";

import { useMemo, useState } from "react";

import { uploadFileToQiniuDirect } from "@/lib/qiniu-direct-upload";

export type DetailMediaItem = {
  file_type: "image" | "video";
  file_url: string;
};

function parseInitial(raw: string): DetailMediaItem[] {
  const t = raw.trim();
  if (!t) return [];
  try {
    const v = JSON.parse(t) as unknown;
    if (!Array.isArray(v)) return [];
    const out: DetailMediaItem[] = [];
    for (const item of v) {
      if (typeof item !== "object" || item === null) continue;
      const o = item as Record<string, unknown>;
      const ft = o.file_type === "video" ? "video" : "image";
      const u = String(o.file_url ?? "").trim();
      if (!u) continue;
      out.push({ file_type: ft, file_url: u });
    }
    return out;
  } catch {
    return [];
  }
}

type Props = {
  name?: string;
  defaultValueJson?: string;
};

export function ProductDetailMediasField({
  name = "detail_medias",
  defaultValueJson = "[]",
}: Props) {
  const [items, setItems] = useState<DetailMediaItem[]>(() => parseInitial(defaultValueJson));
  const [busyIdx, setBusyIdx] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const hiddenValue = useMemo(
    () => JSON.stringify(items.filter((x) => x.file_url.trim() !== "")),
    [items]
  );

  function removeAt(i: number) {
    setItems((prev) => prev.filter((_, j) => j !== i));
  }

  async function uploadAt(index: number, file: File, fileType: "image" | "video") {
    setErr(null);
    setBusyIdx(index);
    try {
      const url = await uploadFileToQiniuDirect(file);
      setItems((prev) => {
        const next = [...prev];
        next[index] = { file_type: fileType, file_url: url };
        return next;
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "上传失败");
    } finally {
      setBusyIdx(null);
    }
  }

  function addEmpty(kind: "image" | "video") {
    setItems((prev) => [...prev, { file_type: kind, file_url: "" }]);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={hiddenValue} />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => addEmpty("image")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm font-medium text-emerald-900 shadow-sm transition hover:bg-emerald-100"
        >
          <span className="text-base leading-none">+</span>
          图片
        </button>
        <button
          type="button"
          onClick={() => addEmpty("video")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          <span className="text-base leading-none">+</span>
          视频
        </button>
      </div>
      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      <ul className="space-y-4">
        {items.map((item, i) => (
          <li
            key={i}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm ring-1 ring-zinc-950/5"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-800">
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                    item.file_type === "image"
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-violet-100 text-violet-900"
                  }`}
                >
                  {item.file_type === "image" ? "图片" : "视频"}
                </span>
                <span className="text-zinc-500">第 {i + 1} 项</span>
              </span>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
                onClick={() => removeAt(i)}
              >
                删除
              </button>
            </div>
            {!item.file_url ? (
              <label className="inline-flex cursor-pointer items-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50/80 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-emerald-300 hover:bg-emerald-50/50 disabled:opacity-50">
                <input
                  type="file"
                  accept={item.file_type === "image" ? "image/*" : "video/*"}
                  className="sr-only"
                  disabled={busyIdx === i}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (f) void uploadAt(i, f, item.file_type);
                  }}
                />
                {busyIdx === i ? "上传中…" : item.file_type === "image" ? "上传图片" : "上传视频"}
              </label>
            ) : (
              <div className="space-y-3">
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-inner">
                  {item.file_type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.file_url}
                      alt=""
                      className="max-h-52 w-auto max-w-full object-contain"
                    />
                  ) : (
                    <video src={item.file_url} controls className="max-h-56 w-full max-w-lg" />
                  )}
                </div>
                <label className="inline-flex cursor-pointer rounded-lg text-sm font-medium text-emerald-700 transition hover:text-emerald-800">
                  <input
                    type="file"
                    accept={item.file_type === "image" ? "image/*" : "video/*"}
                    className="sr-only"
                    disabled={busyIdx === i}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      e.target.value = "";
                      if (f) void uploadAt(i, f, item.file_type);
                    }}
                  />
                  {busyIdx === i ? "替换中…" : "重新上传"}
                </label>
              </div>
            )}
          </li>
        ))}
      </ul>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/80 px-4 py-6 text-center text-sm text-zinc-500">
          暂无媒体。点击上方「图片 / 视频」添加，保存时写入详情数据。
        </p>
      ) : null}
    </div>
  );
}
