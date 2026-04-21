"use client";

import { useId, useState } from "react";

import { uploadFileToQiniuDirect } from "@/lib/qiniu-direct-upload";

type Props = {
  name: string;
  label: string;
  /** 初始 URL（编辑页） */
  defaultUrl?: string | null;
  accept: "image/*" | "video/*";
  compact?: boolean;
};

export function QiniuHiddenUrlField({ name, label, defaultUrl, accept, compact }: Props) {
  const id = useId();
  const [url, setUrl] = useState(() => String(defaultUrl ?? "").trim());
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
      setUrl(u);
    } catch (er) {
      setErr(er instanceof Error ? er.message : "上传失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <label
        className={`block font-medium text-zinc-700 ${compact ? "text-xs" : "text-sm"}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input type="hidden" name={name} value={url} />
      <div className={`flex flex-wrap items-center gap-2 ${compact ? "" : "mt-1"}`}>
        <label
          className={`inline-flex cursor-pointer items-center rounded-lg border font-medium transition disabled:opacity-50 ${
            compact
              ? "border-emerald-200 bg-emerald-50/90 px-2.5 py-1.5 text-xs text-emerald-900 hover:bg-emerald-100"
              : "border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm hover:border-emerald-300/60 hover:bg-emerald-50/50"
          }`}
        >
          <input id={id} type="file" accept={accept} className="sr-only" onChange={onFile} disabled={busy} />
          {busy ? "上传中…" : accept.startsWith("image") ? "上传图片" : "上传视频"}
        </label>
        {url ? (
          <button
            type="button"
            className={`rounded-lg font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 ${
              compact ? "px-1.5 py-1 text-xs" : "px-2 py-1 text-sm"
            }`}
            onClick={() => setUrl("")}
          >
            清除
          </button>
        ) : null}
      </div>
      {err ? <p className="text-xs text-red-600">{err}</p> : null}
      {url ? (
        <div
          className={`overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm ${
            compact ? "mt-1 max-w-[120px]" : "mt-2"
          }`}
        >
          {accept.startsWith("image") ? (
            // eslint-disable-next-line @next/next/no-img-element -- 管理后台动态七牛地址
            <img
              src={url}
              alt=""
              className={compact ? "h-24 w-full object-cover" : "max-h-48 w-auto max-w-full object-contain"}
            />
          ) : (
            <video
              src={url}
              controls
              className={compact ? "max-h-32 w-full" : "max-h-56 w-full max-w-md"}
            />
          )}
        </div>
      ) : !compact ? (
        <p className="text-xs text-zinc-500">七牛直传，上传后自动预览。</p>
      ) : null}
    </div>
  );
}
