import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";

function TermsOfService({ auth }) {
  return (
    <div>
      <Head title="Terms of Service" />
      <Navbar auth={auth} />
      <section className="container">
        <div className="content">
          <h1 className="heading">
            Terms & <span className="subheading">Conditions</span>
          </h1>
          <p className="description">
            Welcome to YAJI Loan App. By using our services, you agree to comply with the following
            terms:
          </p>
          <div className="terms-content">
            <h2>
              <b>1. Eligibility</b>
            </h2>
            <p>
              You must be at least 18 years old and a legal resident of the applicable country to
              apply for a loan. <br />
              Accurate information must be provided during the application process.
            </p>
            <h2>
              <b>2. Loan Agreements</b>
            </h2>
            <p>
              Loan terms, including repayment schedules, interest rates, and applicable fees, will
              be clearly outlined in your loan agreement. <br />
              Late or missed payments may result in additional fees or impact your credit score.
            </p>
            <h2>
              <b>3. Use of Service</b>
            </h2>
            <p>
              Our platform is solely for loan applications and management purposes. <br />
              Unauthorized use or attempts to access restricted features will lead to account
              suspension.
            </p>
            <h2>
              <b>4. Termination</b>
            </h2>
            <p>
              We reserve the right to terminate your access to our services for violations of these
              terms.
            </p>
            <h2>
              <b>5. Modifications</b>
            </h2>
            <p>
              We may update these Terms of Service as needed. Changes will be communicated via email
              or app notifications.
            </p>
            <h2>
              <b>6. Contact Us</b>
            </h2>
            <p>
              If you have questions regarding these terms, please contact us at{" "}
              <a href="mailto:support@loanapp.com" className="contact-link">
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

export default TermsOfService;
