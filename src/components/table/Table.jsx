import { useState, useMemo } from "react";
import { Checkbox } from "../ui/Checkbox";
import { Pagination } from "../ui/Pagination";
import { SortIcon } from "./SortIcon";

/**
 * @typedef {{ key: string, label: string, sortable?: boolean, width?: string, align?: "left"|"center"|"right", render?: (value: any, row: object, index: number) => React.ReactNode }} Column
 * @typedef {{ label: string, icon?: string, variant?: "primary"|"danger", onClick: (selectedIds: Set) => void }} Action
 *
 * @param {{
 *   columns: Column[],
 *   data: object[],
 *   loading?: boolean,
 *   selectable?: boolean,
 *   actions?: Action[],
 *   pageSize?: number,
 *   emptyText?: string,
 *   caption?: string,
 * }} props
 */
export function Table({
  columns = [],
  data = [],
  loading = false,
  selectable = true,
  actions = [],
  pageSize = 8,
  emptyText = "Không có dữ liệu",
  caption,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // ── Search ─────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return data;
    return data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [data, search]);

  // ── Sort ───────────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortKey],
        vb = b[sortKey];
      const cmp =
        typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // ── Paginate ───────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  // ── Selection ──────────────────────────────────────────────────────────────
  const allPageIds = paginated.map((r) => r.id);
  const allSelected =
    allPageIds.length > 0 && allPageIds.every((id) => selected.has(id));
  const someSelected =
    allPageIds.some((id) => selected.has(id)) && !allSelected;

  const toggleAll = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      allSelected
        ? allPageIds.forEach((id) => next.delete(id))
        : allPageIds.forEach((id) => next.add(id));
      return next;
    });

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const colSpan = columns.length + (selectable ? 1 : 0);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 flex-wrap">
        {caption && (
          <span className="text-sm font-semibold text-zinc-800 mr-auto">
            {caption}
          </span>
        )}

        {/* Search */}
        <div className="relative ml-auto">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Tìm kiếm..."
            className="w-32 md:w-52 pl-8 pr-3 h-8 rounded-lg border border-zinc-300 bg-zinc-50 text-xs md:text-sm text-zinc-700 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Selected count */}
        {selected.size > 0 && (
          <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
            {selected.size} đã chọn
          </span>
        )}

        {/* Action buttons */}
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => a.onClick(selected)}
            className={[
              "h-8 px-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5",
              a.variant === "danger"
                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700",
            ].join(" ")}
          >
            {a.icon && <span className="text-base leading-none">{a.icon}</span>}
            {a.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              {selectable && (
                <th className="pl-2 pr-1 py-2 md:pl-4 md:pr-2 md:py-3 w-10">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={[
                    "px-2 md:px-4 py-2 md:py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 whitespace-nowrap select-none",
                    col.align === "right" ? "text-right" : "",
                    col.align === "center" ? "text-center" : "text-left",
                    col.sortable
                      ? "cursor-pointer hover:text-zinc-800 transition-colors"
                      : "",
                  ].join(" ")}
                >
                  {col.label}
                  {col.sortable && (
                    <SortIcon
                      direction={sortKey === col.key ? sortDir : null}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Loading skeleton */}
            {loading &&
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} className="border-b border-zinc-100 last:border-0">
                  {selectable && (
                    <td className="pl-2 pr-1 py-2 md:pl-4 md:pr-2 md:py-3">
                      <div className="h-4 w-4 rounded bg-zinc-200 animate-pulse" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div
                        className="h-4 rounded bg-zinc-100 animate-pulse"
                        style={{ width: `${60 + Math.random() * 30}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))}

            {/* Empty state */}
            {!loading && paginated.length === 0 && (
              <tr>
                <td
                  colSpan={colSpan}
                  className="py-16 text-center text-zinc-400 text-sm"
                >
                  <svg
                    className="mx-auto mb-3 h-10 w-10 text-zinc-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0H4"
                    />
                  </svg>
                  {emptyText}
                </td>
              </tr>
            )}

            {/* Rows */}
            {!loading &&
              paginated.map((row, ri) => {
                const isSelected = selected.has(row.id);
                return (
                  <tr
                    key={row.id}
                    className={[
                      "border-b border-zinc-100 last:border-0 transition-colors group",
                      isSelected ? "bg-indigo-50/60" : "hover:bg-zinc-50/80",
                    ].join(" ")}
                  >
                    {selectable && (
                      <td className="pl-2 pr-1 py-2 md:pl-4 md:pr-2 md:py-3">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(row.id)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={[
                          "px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-zinc-700",
                          col.align === "right" ? "text-right" : "",
                          col.align === "center" ? "text-center" : "",
                        ].join(" ")}
                      >
                        {col.render
                          ? col.render(row[col.key], row, ri)
                          : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && sorted.length > pageSize && (
        <Pagination
          page={safePage}
          totalPages={totalPages}
          totalItems={sorted.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
