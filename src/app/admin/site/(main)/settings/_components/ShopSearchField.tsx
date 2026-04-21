"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type ShopRow = { id: string; name: string };

export function ShopSearchField({
  campusId,
  shopId,
  onShopIdChange,
  disabled,
}: {
  campusId: string;
  shopId: string;
  onShopIdChange: (id: string) => void;
  disabled?: boolean;
}) {
  const baseId = useId();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<ShopRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [listErr, setListErr] = useState<string | null>(null);
  const [pickedName, setPickedName] = useState<string | null>(null);
  const [unknownId, setUnknownId] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const loadNameById = useCallback(
    async (id: string) => {
      if (!id.trim()) {
        setPickedName(null);
        setUnknownId(false);
        return;
      }
      try {
        const r = await fetch(
          `/api/admin/site/shops-search?campusId=${encodeURIComponent(campusId)}&id=${encodeURIComponent(id.trim())}`,
          { method: "GET" }
        );
        if (!r.ok) {
          setPickedName(null);
          setUnknownId(true);
          return;
        }
        const data = (await r.json()) as { shops?: ShopRow[] };
        const row = data.shops?.[0];
        setPickedName(row?.name ?? null);
        setUnknownId(!row);
      } catch {
        setPickedName(null);
        setUnknownId(true);
      }
    },
    [campusId]
  );

  useEffect(() => {
    void loadNameById(shopId);
  }, [shopId, loadNameById]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const term = q.trim();
    if (term.length < 1) {
      setResults([]);
      setListErr(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setListErr(null);
    debounceRef.current = setTimeout(async () => {
      try {
        const r = await fetch(
          `/api/admin/site/shops-search?campusId=${encodeURIComponent(campusId)}&q=${encodeURIComponent(term)}`,
          { method: "GET" }
        );
        if (!r.ok) {
          setResults([]);
          setListErr(r.status === 401 ? "请重新登录" : "没有权限或搜索失败");
          return;
        }
        const data = (await r.json()) as { shops?: ShopRow[] };
        setResults(data.shops ?? []);
      } catch {
        setResults([]);
        setListErr("网络错误");
      } finally {
        setLoading(false);
      }
    }, 320);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q, campusId]);

  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setResults([]);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  function pick(row: ShopRow) {
    onShopIdChange(String(row.id));
    setPickedName(row.name);
    setUnknownId(false);
    setQ("");
    setResults([]);
    setListErr(null);
  }

  function clearPick() {
    onShopIdChange("");
    setPickedName(null);
    setUnknownId(false);
    setQ("");
    setResults([]);
  }

  const off = Boolean(disabled);

  return (
    <div ref={wrapRef} className="space-y-2">
      <label className="block text-xs font-medium text-zinc-600" htmlFor={`${baseId}-shop`}>
        选择店铺
      </label>
      <p className="text-xs text-zinc-500">须从搜索结果中选择，不能直接填写 ID。</p>

      {shopId.trim() ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-950">
            <span className="min-w-0 font-medium">
              {unknownId ? "未知店铺" : pickedName ?? "已选店铺"}
            </span>
            <span className="font-mono text-xs text-emerald-900/80">ID {shopId.trim()}</span>
            <button
              type="button"
              disabled={off}
              className="ml-auto text-xs font-medium text-red-700 hover:underline disabled:opacity-50"
              onClick={clearPick}
            >
              清除并重选
            </button>
          </div>
          {unknownId ? (
            <p className="rounded-md bg-amber-50 px-2 py-1.5 text-xs text-amber-900">
              未在系统中找到该店铺，请清除后重新搜索选择。
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <p className="mb-1 text-xs text-zinc-500">按名称搜索</p>
        <input
          id={`${baseId}-shop`}
          type="search"
          autoComplete="off"
          value={q}
          disabled={off}
          onChange={(e) => setQ(e.target.value)}
          placeholder="输入店铺名称，在列表中点击选择"
          className="w-full rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm text-zinc-900 disabled:opacity-50"
        />
      </div>
      {loading ? <p className="text-xs text-zinc-500">搜索中…</p> : null}
      {listErr ? <p className="text-xs text-red-600">{listErr}</p> : null}
      {results.length > 0 ? (
        <ul
          className="max-h-52 overflow-auto rounded-md border border-zinc-200 bg-white py-1 text-sm shadow-md"
          role="listbox"
        >
          {results.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                disabled={off}
                className="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-zinc-50 disabled:opacity-50"
                onClick={() => pick(row)}
              >
                <span className="min-w-0 flex-1 font-medium text-zinc-900">{row.name}</span>
                <span className="shrink-0 font-mono text-xs text-zinc-500">#{row.id}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {!loading && q.trim().length >= 1 && results.length === 0 && !listErr ? (
        <p className="text-xs text-zinc-500">未找到匹配的店铺，请尝试其他关键词。</p>
      ) : null}
    </div>
  );
}
