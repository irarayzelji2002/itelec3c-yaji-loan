import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function PaymentPage() {
  const user = usePage().props.auth.user;
  const walletBalance = 2500.0; // Example wallet balance
  const [amountDue1, setAmountDue1] = useState(2500.0);
  const [amountDue2, setAmountDue2] = useState(5500.0);

  console.log("User props:", user);
  console.log("user?.roles:", user?.roles);

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="column-down">
            <h2>Payment Options</h2>
          </div>

          <div className="request-body-2">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="request-row">
                  <div className="request-label">Amount Due: </div>
                  <div className="request-value"> &nbsp;₱{amountDue1.toFixed(2)}</div>
                </div>
                <div className="request-row" style={{ marginBottom: "0" }}>
                  <div className="request-label">Due on : </div>
                  <div className="request-value">&nbsp;December 30,2024</div>
                </div>
                {amountDue1 > walletBalance && (
                  <div className="request-row" style={{ color: "red", marginBottom: "0" }}>
                    Insufficient Balance
                  </div>
                )}
              </div>
              <div className="request-value">&nbsp;Pay Amount Due</div>{" "}
            </div>
          </div>
          <div className="request-body-2">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div className="request-row">
                  <div className="request-label">Amount Due: </div>
                  <div className="request-value"> &nbsp;₱{amountDue2.toFixed(2)}</div>
                </div>
                <div className="request-row" style={{ marginBottom: "0" }}>
                  <div className="request-label">Due on : </div>
                  <div className="request-value">&nbsp;December 30,2024</div>
                </div>
                {amountDue2 > walletBalance && (
                  <div className="request-row" style={{ color: "red", marginBottom: "0" }}>
                    Insufficient Balance
                  </div>
                )}
              </div>
              <div className="request-value">&nbsp;Pay in Full</div>{" "}
            </div>
          </div>

          <div className="content-container">
            <div className="tab-content">
              <h3
                style={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "24px",
                  marginBottom: "10px",
                }}
              >
                Enter Amount
              </h3>
              <div
                className="row-side"
                style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
              >
                <input type="text" className="amount-input" placeholder="₱ 0.00"></input>{" "}
                <Link
                  href="/success"
                  className="accept-button ml-auto whitespace-nowrap"
                  style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}
                >
                  Pay Now
                </Link>
              </div>

              <span style={{ color: "var(--color-light-green)" }}>
                Wallet Balance: ₱ {walletBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
