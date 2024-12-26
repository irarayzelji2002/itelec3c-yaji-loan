import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function SelectInput(
  { className = "", children, isFocused = false, ...props },
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

  return (
    <select
      {...props}
      className={
        "!rounded-lg border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700 " +
        className
      }
      ref={localRef}
    >
      {children}
    </select>
  );
});
