import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function DateInput(
  { type = "date", className = "", isFocused = false, value, ...props },
  ref
) {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  // Format the date value if it contains a timestamp
  const formattedValue = value ? value.split("T")[0] : value;

  return (
    <input
      {...props}
      type={type}
      value={formattedValue}
      className={
        "rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 " +
        className
      }
      ref={localRef}
    />
  );
});
