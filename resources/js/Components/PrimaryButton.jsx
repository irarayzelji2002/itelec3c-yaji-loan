export default function PrimaryButton({
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
        `inline-flex items-center !rounded-lg border border-transparent bg-green-700 px-4 py-2 text-sm font-semibold ${uppercase && "uppercase"} justify-center text-center text-black transition duration-150 ease-in-out hover:bg-green-500 focus:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-800 ${
          disabled && "opacity-50"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
