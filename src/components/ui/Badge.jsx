const STYLES = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  danger:  "bg-red-50 text-red-700 ring-red-600/20",
  info:    "bg-sky-50 text-sky-700 ring-sky-600/20",
  neutral: "bg-zinc-100 text-zinc-600 ring-zinc-500/20",
};
 
/**
 * @param {{ variant?: "success"|"warning"|"danger"|"info"|"neutral", children: React.ReactNode }} props
 */
export function Badge({ variant = "neutral", children }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STYLES[variant]}`}>
      {children}
    </span>
  );
}