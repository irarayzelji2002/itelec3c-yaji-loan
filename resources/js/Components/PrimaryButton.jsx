export default function PrimaryButton({ className = "", disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black transition duration-150 ease-in-out hover:bg-green-500 focus:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-800 ${
          disabled && "opacity-25"
        } ` + className
      }
      style={{ width: "100% !important" }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
