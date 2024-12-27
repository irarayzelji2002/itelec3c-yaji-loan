import Navbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";

const Welcome = ({ auth }) => {
  return (
    <div>
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et.
          </p>
          <ul className="benefits-list">
            <li>
              <span className="check-icon">✔</span> Malesuada Ipsum
            </li>
            <li>
              <span className="check-icon">✔</span> Vestibulum
            </li>
            <li>
              <span className="check-icon">✔</span> Parturient Lorem
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
                +49 176 123 456 <br />
                <small>Support Hotline</small>
              </p>
            </div>
            <div className="contact-item">
              <span>📧</span>
              <p>
                help@banko.com <br />
                <small>Support Email</small>
              </p>
            </div>
          </div>
          <button className="chat-button">Chat with us</button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h3>Features</h3>
          <h1>All in one card.</h1>
          <p>
            Senectus et netus et malesuada fames ac turpis. <br />
            Sagittis vitae et leo duis ut diam.
          </p>
          <div className="buttons">
            <button className="primary-button">Open Account</button>
            <button className="secondary-button">Compare Cards →</button>
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
  );
};

const features = [
  "Instant Transfer",
  "Saving accounts",
  "Payments worldwide",
  "100% mobile banking",
];

export default Welcome;
