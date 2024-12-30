import Navbar from "@/Components/Navbar";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Head } from "@inertiajs/react";

const Welcome = ({ auth }) => {
  return (
    <div>
      <Head title="Welcome" />
      <Navbar auth={auth} />
      <div className="bg-green-gradient">
        <section className="container">
          {/* Left Section */}
          <div className="left-section">
            <h1 className="heading">
              Loans <br /> <span className="subheading">made simple.</span>
            </h1>
            <p className="description">
              Experience financial freedom with our trusted loan services.
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
                <PrimaryButton
                  className="open-account-btn"
                  onClick={() => {
                    window.location.href = route("dashboard");
                  }}
                >
                  Dashboard
                </PrimaryButton>
              ) : (
                <>
                  <PrimaryButton
                    onClick={() => {
                      window.location.href = route("register");
                    }}
                    className="open-account-btn"
                  >
                    Apply Now
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => {
                      window.location.href = route("login");
                    }}
                    className="compare-btn"
                  >
                    Login
                  </SecondaryButton>
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

        <div className="money-transfer-section">
          <div className="transfer-left">
            <h2>Send & receive money instantly</h2>
            <p>Seamless transactions designed to keep your finances moving effortlessly.</p>
            <ul className="benefits-list">
              <li>
                <span className="check-icon">-</span>Instant Money Transfers
              </li>
              <li>
                <span className="check-icon">-</span> Secure & Reliable Payments
              </li>
              <li>
                <span className="check-icon">-</span> Global Accessibility
              </li>
            </ul>
          </div>
          <div className="transfer-right">
            <div className="transaction">
              <div className="transaction-icon">
                <img src="apple-icon.png" alt="Apple" />
              </div>
              <div className="transaction-details">
                <h4>Apple</h4>
                <p>Macbook</p>
              </div>
              <div className="transaction-amount">-999€</div>
            </div>
            <div className="transaction">
              <div className="transaction-icon">
                <img src="amazon-icon.png" alt="Amazon" />
              </div>
              <div className="transaction-details">
                <h4>Amazon</h4>
                <p>Electronics</p>
              </div>
              <div className="transaction-amount">-49€</div>
            </div>
            <div className="transaction">
              <div className="transaction-icon">
                <img src="twitter-icon.png" alt="Twitter" />
              </div>
              <div className="transaction-details">
                <h4>Twitter</h4>
                <p>Ads</p>
              </div>
              <div className="transaction-amount">-29€</div>
            </div>
            <div className="transaction">
              <div className="transaction-icon">
                <img src="microsoft-icon.png" alt="Microsoft" />
              </div>
              <div className="transaction-details">
                <h4>Microsoft</h4>
                <p>Office Suite</p>
              </div>
              <div className="transaction-amount">-149€</div>
            </div>
            <div className="transaction">
              <div className="transaction-icon">
                <img src="dropbox-icon.png" alt="Dropbox" />
              </div>
              <div className="transaction-details">
                <h4>Dropbox</h4>
                <p>Cloud</p>
              </div>
              <div className="transaction-amount">-14€</div>
            </div>
            <div className="transaction">
              <div className="transaction-icon">
                <img src="paypal-icon.png" alt="Paypal" />
              </div>
              <div className="transaction-details">
                <h4>Paypal</h4>
                <p>Shopping</p>
              </div>
              <div className="transaction-amount">-200€</div>
            </div>
          </div>
        </div>
        <div className="card-section">
          {/* Support Bar */}
          <div className="support-bar">
            <div className="support-info">
              <p className="support-heading">Still have questions?</p>
              <p>We are here to help.</p>
            </div>
            <div className="support-contact">
              <div className="contact-item">
                <span>📞</span>
                <p>
                  +0990 123 4567 <br />
                  <small>Support Hotline</small>
                </p>
              </div>
              <div className="contact-item">
                <span>📧</span>
                <p>
                  yajicorp@gmail.com <br />
                  <small>Support Email</small>
                </p>
              </div>
            </div>
            <button className="chat-button">Chat with us</button>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <h3>Features</h3>
            <h1>One Solution for All Your Loan Needs.</h1>
            <p>Simplify your borrowing experience with features designed for you.</p>
            <div className="buttons">
              <button className="primary-button">Open Account</button>
              <button className="secondary-button">Login →</button>
            </div>

            {/* Cards Section
            <div className="card-display">
              <div className="card">
                banquee. <br />
                1234 5678 9012 3456
              </div>
              <div className="card">
                banquee. <br />
                1234 5678 9012 3456
              </div>
              <div className="card">
                banquee. <br />
                1234 5678 9012 3456
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const features = [
  "Quick Approvals",
  "Flexible Repayment Options",
  "Competitive Interest Rates",
  "24/7 Loan Management",
];

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Group 3- 4ITE - YAJI Corp. All rights reserved.</p>
    <p>
      <a href="/terms-of-service">Terms of Service</a> |{" "}
      <a href="/privacy-policy">Privacy Policy</a>
    </p>
  </footer>
);

export default Welcome;
