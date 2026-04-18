export function SortIcon({ direction }) {
  return (
    <span className="ml-1.5 inline-flex flex-col gap-[1px] translate-y-[1px]">
      <span
        className={`block w-0 h-0 border-x-[3.5px] border-b-[4px] border-x-transparent ${
          direction === "asc" ? "border-b-indigo-600" : "border-b-zinc-300"
        }`}
      />
      <span
        className={`block w-0 h-0 border-x-[3.5px] border-t-[4px] border-x-transparent ${
          direction === "desc" ? "border-t-indigo-600" : "border-t-zinc-300"
        }`}
      />
    </span>
  );
}