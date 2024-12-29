import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthenticatedLayout({ header, children }) {
  //   const user = usePage().props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Fixed gradient background */}
      <div className="bg-green-gradient fixed inset-0 z-0" />
      {/* Main content container */}
      <div className="relative min-h-screen bg-transparent">
        <nav className="nav-bar-logged sticky top-0 z-100">
          <div className="nav-bar-logged max-w-100 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="nav-bar-logged flex h-16 justify-between">
              <div className="flex flex-grow justify-between">
                <div className="flex shrink-0 items-center">
                  <Link href="/">
                    <img className="block h-12 w-auto" src="/img/logosText.png" alt="Workflow" />
                  </Link>
                </div>

                <div
                  className={
                    (!showingNavigationDropdown ? "flex" : "hidden") +
                    " flex justify-end gap-5 sm:-my-px sm:ms-10 sm:flex"
                  }
                >
                  <NavLink
                    style={{ color: "aliceblue", whiteSpace: "nowrap" }}
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    style={{ color: "aliceblue", whiteSpace: "nowrap" }}
                    href={route("loan.requests")}
                    active={route().current("loan.requests")}
                  >
                    Loan Requests
                  </NavLink>
                  <NavLink
                    style={{ color: "aliceblue", whiteSpace: "nowrap" }}
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
                          className="inline-flex items-center !rounded-lg border border-transparent px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:text-white focus:outline-none"
                        >
                          <i className="fa-solid fa-user"></i>
                        </button>
                      </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content containerClasses="z-200 mt-4" contentClasses="bg-green-900">
                      <Dropdown.Link
                        href={route("profile.show")}
                        className="rounded-t-lg bg-green-800 bg-opacity-25 text-white hover:bg-green-800 hover:bg-opacity-50 focus:bg-green-800"
                      >
                        Profile
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-b-lg bg-green-800 bg-opacity-25 text-white hover:bg-green-800 hover:bg-opacity-50 focus:bg-green-800"
                      >
                        Log Out
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>

              <div className="-me-2 flex items-center sm:hidden">
                <button
                  onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                  className="inline-flex items-center justify-center !rounded-lg p-2 text-white transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-300 focus:bg-gray-100 focus:text-gray-300 focus:outline-none"
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
            <div>
              <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>
                Dashboard
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route("loan.requests")}
                active={route().current("loan.requests")}
              >
                Loan Requests
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route("member.view")}
                active={route().current("member.view")}
              >
                Member View
              </ResponsiveNavLink>
            </div>

            <div className="pb-1">
              {/* <div className="px-4">
              <div className="text-base font-medium text-white">{user.full_name}</div>
              <div className="text-sm font-medium text-gray-300">{user.email}</div>
            </div> */}

              <div>
                <ResponsiveNavLink href={route("profile.show")}>Profile</ResponsiveNavLink>
                <ResponsiveNavLink method="post" href={route("logout")} as="button">
                  Log Out
                </ResponsiveNavLink>
              </div>
            </div>
          </div>
        </nav>

        {header && (
          <header className="sticky top-[64px] z-90 bg-white shadow">
            <div className="max-w-100 montserrat-700 bg-green-gradient-horiz mx-auto px-4 py-4 text-lg font-bold leading-tight text-gray-800 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </>
  );
}
