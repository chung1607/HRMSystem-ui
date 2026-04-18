import { useRef, useEffect } from "react";

/**
 * @param {{ checked: boolean, indeterminate?: boolean, onChange: Function }} props
 */
export function Checkbox({ checked, indeterminate = false, onChange, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-zinc-300 text-indigo-600 accent-indigo-600 cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0"
      {...props}
    />
  );
}