import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({ active = false, className = "", children, ...props }) {
  return (
    <Link
      {...props}
      className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
        active
          ? "border-green-700 bg-green-100 text-green-800 focus:border-green-800 focus:bg-green-300 focus:text-white"
          : "border-transparent text-white hover:border-green-800 hover:bg-green-800 hover:bg-opacity-20 hover:text-white focus:border-white focus:bg-green-900 focus:text-white"
      } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
    >
      {children}
    </Link>
  );
}
