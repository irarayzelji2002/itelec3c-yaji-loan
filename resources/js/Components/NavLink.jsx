import { Link } from "@inertiajs/react";

export default function NavLink({ active = false, className = "", children, ...props }) {
  return (
    <Link
      {...props}
      className={
        "inline-flex items-center border-b-4 pt-1 text-sm leading-5 transition duration-150 ease-in-out focus:outline-none " +
        (active
          ? "border-green-700 font-bold text-gray-900 focus:border-green-800"
          : "border-transparent font-medium text-gray-500 hover:border-green-800 hover:border-opacity-50 hover:text-gray-700 focus:border-green-800 focus:border-opacity-50 focus:text-gray-700") +
        className
      }
    >
      {children}
    </Link>
  );
}
