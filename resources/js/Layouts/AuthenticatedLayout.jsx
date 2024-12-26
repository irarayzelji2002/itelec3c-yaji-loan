import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="nav-bar-logged">
        <div className="nav-bar-logged mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="nav-bar-logged flex h-16 justify-between">
            <div className="flex w-full justify-between">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <img className="block h-12 w-auto" src="/img/logosText.png" alt="Workflow" />
                </Link>
              </div>

              <div className="flex justify-end space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  style={{ color: "aliceblue" }}
                  href={route("dashboard")}
                  active={route().current("dashboard")}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  style={{ color: "aliceblue" }}
                  href={route("loan.requests")}
                  active={route().current("loan.requests")}
                >
                  Loan Requests
                </NavLink>
                <NavLink
                  style={{ color: "aliceblue" }}
                  href={route("member.view")}
                  active={route().current("member.view")}
                >
                  Member View
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <div className="relative ms-3">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex !rounded-lg">
                      <button
                        type="button"
                        className="inline-flex items-center !rounded-lg border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                      >
                        {user.name}

                        <svg
                          className="-me-0.5 ms-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.show")}>Profile</Dropdown.Link>
                    <Dropdown.Link href={route("logout")} method="post" as="button">
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center !rounded-lg p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>
              Dashboard
            </ResponsiveNavLink>
            <ResponsiveNavLink
              href={route("loan.requests")}
              active={route().current("loan.requests")}
            >
              Loan Requests
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route("member.view")} active={route().current("member.view")}>
              Member View
            </ResponsiveNavLink>
          </div>

          <div className="border-t border-gray-200 pb-1 pt-4">
            <div className="px-4">
              <div className="text-base font-medium text-gray-800">{user.name}</div>
              <div className="text-sm font-medium text-gray-500">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.show")}>Profile</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route("logout")} as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
