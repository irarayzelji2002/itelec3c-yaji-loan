export default function SecondaryButton({
  type = "button",
  className = "",
  disabled = false,
  uppercase = false,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center !rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold ${uppercase && "uppercase"} justify-center text-center text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 disabled:opacity-25 ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
