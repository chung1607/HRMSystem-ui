/**
 * @param {{ name: string, src?: string, size?: "sm"|"md" }} props
 */
export function Avatar({ name, src, size = "sm" }) {
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dim = size === "sm" ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm";

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      className={`${dim} inline-flex items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 shrink-0`}
    >
      {initials}
    </span>
  );
}