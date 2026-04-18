import { useMemo } from "react";

/**
 * @param {{
 *   page: number,
 *   totalPages: number,
 *   totalItems: number,
 *   pageSize: number,
 *   onPageChange: (page: number) => void
 * }} props
 */
export function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  const start = (page - 1) * pageSize + 1;
  const end   = Math.min(page * pageSize, totalItems);

  const pages = useMemo(() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4)
      return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3)
      return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  }, [page, totalPages]);

  const Btn = ({ content, target, disabled, active }) => (
    <button
      onClick={() => typeof target === "number" && onPageChange(target)}
      disabled={disabled || content === "…"}
      className={[
        "min-w-[32px] h-8 px-2 rounded text-sm font-medium transition-colors",
        active
          ? "bg-indigo-600 text-white"
          : content === "…"
          ? "text-zinc-400 cursor-default"
          : "text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed",
      ].join(" ")}
    >
      {content}
    </button>
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200">
      <p className="text-sm text-zinc-500 hidden sm:block">
        Hiển thị{" "}
        <span className="font-medium text-zinc-700">{start}–{end}</span> /{" "}
        <span className="font-medium text-zinc-700">{totalItems}</span> kết quả
      </p>
      <div className="flex items-center gap-0.5">
        <Btn content="‹" target={page - 1} disabled={page === 1} />
        {pages.map((p, i) => (
          <Btn key={i} content={p} target={p} disabled={false} active={p === page} />
        ))}
        <Btn content="›" target={page + 1} disabled={page === totalPages} />
      </div>
    </div>
  );
}