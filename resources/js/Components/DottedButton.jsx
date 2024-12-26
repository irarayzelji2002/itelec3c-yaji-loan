export default function DottedButton({
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
        `inline-flex items-center !rounded-lg border-2 border-dotted border-gray-400 px-4 py-2 text-sm font-semibold ${uppercase && "uppercase"} text-gray-700 transition duration-150 ease-in-out hover:border-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 active:border-gray-400 active:text-gray-700 ${disabled && "opacity-25"} ` +
        className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
