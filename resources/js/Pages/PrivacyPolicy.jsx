import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

function PrivacyPolicy({ auth }) {
  return (
    <div>
      <Head title="Privacy Policy" />
      <Navbar auth={auth} />
      <section className="container">
        <div className="content">
          <h1 className="heading" style={{ fontSize: "4rem" }}>
            Privacy <span className="subheading">Policy</span>
          </h1>
          <p className="description">
            At YAJI Loan App, your privacy is our priority. Here's how we handle your data:
          </p>
          <div className="terms-content">
            <h2>
              <b>1. Information We Collect</b>
            </h2>
            <p>
              Personal details (e.g., name, email, address) for identity verification and loan
              processing. Financial data (e.g., income, bank statements) to assess eligibility.
            </p>
            <h2>
              <b>2. How We Use Your Information</b>
            </h2>
            <p>
              To process loan applications and manage repayments. To improve user experience and
              communicate updates or offers.
            </p>
            <h2>
              <b>3. Data Sharing</b>
            </h2>
            <p>
              We do not sell your data. Information may be shared with authorized partners solely
              for loan servicing purposes.
            </p>
            <h2>
              <b>4. Security</b>
            </h2>
            <p>Your data is protected with industry-standard encryption and secure servers.</p>
            <h2>
              <b>5. Your Rights</b>
            </h2>
            <p>
              Access, update, or delete your personal information by contacting{" "}
              <a href="mailto:privacy@loanapp.com" className="contact-link">
                yaji@gmail.com
              </a>
              . Opt out of marketing communications anytime.
            </p>
            <h2>
              <b>6. Contact Us</b>
            </h2>
            <p>
              For more details, review our full Privacy Policy in the app or reach out to us at{" "}
              <a href="mailto:privacy@loanapp.com" className="contact-link">
                yaji@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Group 3- 4ITE - YAJI Corp. All rights reserved.</p>
    <p>
      <a href="/terms-of-service" className="footer-link">
        Terms of Service
      </a>{" "}
      |{" "}
      <a href="/privacy-policy" className="footer-link">
        Privacy Policy
      </a>
    </p>
  </footer>
);

export default PrivacyPolicy;
