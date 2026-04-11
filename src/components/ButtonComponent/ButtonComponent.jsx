export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-2 rounded-xl font-semibold text-white
        bg-blue-600 hover:bg-blue-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition
        ${className}
      `}
    >
      {children}
    </button>
  );
}
