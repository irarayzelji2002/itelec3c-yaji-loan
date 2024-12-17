import Navbar from "@/Components/Navbar";

import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Head title="Welcome" /> <Navbar auth={auth} />
      <nav className="-mx-3 flex flex-1 justify-end">
        {auth.user ? (
          <Link
            href={route("dashboard")}
            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href={route("login")}
              className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
              Log in
            </Link>
            <Link
              href={route("register")}
              className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FFFA",
    padding: "60px",
    fontFamily: "Arial, sans-serif",
  },
  leftSection: {
    width: "50%",
  },
  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    lineHeight: "1.2",
  },
  subHeading: {
    color: "#000",
  },
  description: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.5",
  },
  featuresList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "20px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "14px",
  },
  checkIcon: {
    color: "#00A878",
    marginRight: "10px",
    fontWeight: "bold",
  },
  buttons: {
    marginTop: "30px",
  },
  openAccountBtn: {
    backgroundColor: "#00A878",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    marginRight: "15px",
  },
  compareBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#333",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  rightSection: {
    position: "relative",
    width: "50%",
    height: "300px",
  },
  cardBack: {
    backgroundColor: "#00A878",
    borderRadius: "8px",
    width: "220px",
    height: "140px",
    position: "absolute",
    top: "60px",
    left: "80px",
    zIndex: 1,
    transform: "rotate(-10deg)",
  },
  cardFront: {
    backgroundColor: "#333",
    borderRadius: "8px",
    width: "220px",
    height: "140px",
    position: "absolute",
    top: "80px",
    left: "120px",
    zIndex: 2,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
};
