import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";

const Welcome = ({ auth }) => {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Head title="Welcome" />
      <Navbar auth={auth} />

      <section className="container">
        {/* Left Section */}
        <div className="left-section">
          <h1 className="heading">
            Banking <br /> <span className="subheading">starts here.</span>
          </h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>

          {/* Features */}
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="check-icon">✔</span> {feature}
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="buttons">
            {auth.user ? (
              <Link href={route("dashboard")} className="open-account-btn">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href={route("register")} className="open-account-btn">
                  Create Account
                </Link>
                <Link href={route("login")} className="compare-btn">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Section - Cards */}
        <div className="right-section">
          <div className="card-back"></div>
          <div className="card-front"></div>
        </div>
      </section>
    </div>
  );
};

const features = [
  "Instant Transfer",
  "Saving accounts",
  "Payments worldwide",
  "100% mobile banking",
];

export default Welcome;
