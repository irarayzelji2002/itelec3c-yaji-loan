import "@/Pages/App.css";
import logo from "/public/img/logosText.png";

const Navbar = () => {
  return (
    // { auth }
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="YAJI Corp Logo" className="logo" />
        {/* <span className="company-name">YAJI CORP.</span> */}
      </div>
      <div className="nav-links">
        <a href="#" className="link">
          Home
        </a>
        <a href="#" className="link">
          Terms & Condition
        </a>
        <a href="#" className="link">
          About Us
        </a>

        {/* <div>
          {auth.user ? (
            <a href={route("dashboard")} className="apply-button">
              Dashboard
            </a>
          ) : (
            <button className="apply-button">Apply for Loan</button>
          )}
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
