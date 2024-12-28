export default function TertiaryButton({
  className = "",
  disabled = false,
  uppercase = false,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center !rounded-lg border border-transparent bg-green-900 px-4 py-2 text-sm font-semibold ${uppercase && "uppercase"} justify-center text-center text-white ring-opacity-25 transition duration-150 ease-in-out ${
          disabled
            ? "opacity-50"
            : "hover:bg-green-900 hover:bg-opacity-95 focus:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2 active:bg-green-900 active:bg-opacity-90"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
