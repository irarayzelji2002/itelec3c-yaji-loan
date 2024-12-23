import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function PaymentPage() {
  const user = usePage().props.auth.user;
  console.log("User props:", user);
  console.log("user?.roles:", user?.roles);

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="request-body-2">
            <div className="request-row">
              <div className="request-label">Loan ID: </div>
              <div className="request-value"> &nbsp;Harry Edward Styles</div>
            </div>

            <div className="request-row">
              <div className="request-label">Due Date : </div>
              <div className="request-value">&nbsp;December 30,2024</div>
            </div>
            <div className="request-row" style={{ marginBottom: "0" }}>
              <div className="request-label">Amount Requested : </div>
              <div className="request-value">&nbsp;₱ 2,500.00</div>
            </div>
          </div>

          <div className="request-body-2">
            <div className="tab-content">
              <h3 style={{ color: "#043C3C" }}>Loan Due on December 3, 2024</h3>
              <h1 style={{ color: "black" }}>₱ 0.00</h1>
            </div>
          </div>

          <div className="content-container">
            <div className="tab-content">
              <h3 style={{ color: "white" }}>Enter Amount</h3>
              <input type="text" className="amount-input" placeholder="₱ 0.00" />
              <span style={{ color: "#57df98" }}>Wallet Balance: ₱ 0.00</span>

              <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/success" className="accept-button" style={{ marginLeft: "auto" }}>
                  Pay Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
