export default function DangerButton({ className = "", disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center !rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out ${
          disabled
            ? "opacity-50"
            : "hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
