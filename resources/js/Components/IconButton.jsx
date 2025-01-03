export default function IconButton({
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
        `inline-flex items-center !rounded-full border border-transparent bg-gray-100/0 p-2 text-sm font-semibold ${uppercase && "uppercase"} justify-center text-center text-black transition duration-150 ease-in-out ${
          disabled
            ? "opacity-50"
            : "focus:bg-gray-gray-100/10 hover:bg-gray-300/50 focus:outline-none active:bg-gray-300/50"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
