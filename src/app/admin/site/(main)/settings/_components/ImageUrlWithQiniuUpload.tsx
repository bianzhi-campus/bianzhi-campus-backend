"use client";

import { useId, useState } from "react";

import { uploadFileToQiniuDirect } from "@/lib/qiniu-direct-upload";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  /** 外层 class（如 grid 跨列） */
  className?: string;
  /** 预览图样式：轮播用大图，图标用小图 */
  previewClassName?: string;
};

export function ImageUrlWithQiniuUpload({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
  previewClassName = "mt-2 h-24 max-w-full rounded border border-zinc-200 object-contain",
}: Props) {
  const inputId = useId();
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
      onChange(u);
    } catch (er) {
      setErr(er instanceof Error ? er.message : "上传失败");
    } finally {
      setBusy(false);
    }
  }

  const off = disabled || busy;

  return (
    <div className={className}>
      <label className="block text-xs font-medium text-zinc-600" htmlFor={`${inputId}-url`}>
        {label}
      </label>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <label
          className={`inline-flex cursor-pointer items-center rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-900 hover:bg-emerald-100 ${
            off ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <input
            id={`${inputId}-file`}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFile}
            disabled={off}
          />
          {busy ? "上传中…" : "从本地上传"}
        </label>
        {value.trim() ? (
          <button
            type="button"
            className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
            disabled={off}
            onClick={() => onChange("")}
          >
            清除图片
          </button>
        ) : null}
        <span className="text-xs text-zinc-400">也可在下方粘贴已有图片链接</span>
      </div>
      <input
        id={`${inputId}-url`}
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://"
        disabled={disabled}
        className="mt-2 w-full rounded-md border border-zinc-300 px-2 py-2 text-sm text-zinc-900 disabled:opacity-50"
      />
      {err ? <p className="mt-1 text-xs text-red-600">{err}</p> : null}
      {value.trim() ? (
        // eslint-disable-next-line @next/next/no-img-element -- 管理后台动态地址（七牛或外链）
        <img src={value.trim()} alt="" className={previewClassName} />
      ) : null}
    </div>
  );
}
