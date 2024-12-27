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

      {/* Cash-express Advantages Section */}
      <section className="advantages">
        <h2 className="advantages-heading">YAJI Corp. Advantages</h2>
        <div className="advantages-cards">
          <div className="advantage-card">
            {/* <img src="/path/to/easy-icon.png" alt="Easy Icon" className="advantage-icon" /> */}
            <h3>Easy</h3>
            <p>Simple and quick solution at the tip of your fingers</p>
            <ul>
              <li>Apply anywhere you are</li>
              <li>Only one document needed</li>
            </ul>
          </div>
          <div className="advantage-card">
            {/* <img src="/path/to/secure-icon.png" alt="Secure Icon" className="advantage-icon" /> */}
            <h3>Advance & Secured</h3>
            <p>CXPH utilizes advanced digital tools to ensure your data is protected.</p>
            <ul>
              <li>We carry the NPC seal of accreditation</li>
              <li>Guaranteed confidentiality</li>
            </ul>
          </div>
          <div className="advantage-card">
            {/* <img src="/path/to/fast-icon.png" alt="Fast Icon" className="advantage-icon" /> */}
            <h3>Fast & Convenient</h3>
            <p>It only takes 5 minutes!</p>
            <ul>
              <li>Get your loan proceeds instantly</li>
              <li>Repay via online banking</li>
              <li>Extend your loan due date</li>
            </ul>
          </div>
        </div>

        {/* Steps Section */}
        <div className="steps">
          <div className="step">
            <h3>1 REGISTER</h3>
            <p>Create your profile and fill out the application form</p>
          </div>
          <div className="step">
            <h3>2 GET VERIFIED</h3>
            <p>Take our call and wait for the decision in just minutes</p>
          </div>
          <div className="step">
            <h3>3 GET CREDITED</h3>
            <p>Once approved, money is transferred instantly to your bank</p>
          </div>
        </div>

        <div className="progress-bar-container-1">
          <div className="progress-bar">
            <div className="step-indicator"></div>
            <div className="step-indicator"></div>
            <div className="step-indicator"></div>
          </div>
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
