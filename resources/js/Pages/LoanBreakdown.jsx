import DropdownInfo from "@/Components/DropdownInfo";
import ProgressBar from "@/Components/ProgressBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function LoanBreakdown() {
  const user = usePage().props.auth.user;
  console.log("User props:", user);
  console.log("user?.roles:", user?.roles);

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
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

          <div className="content-container">
            <div className="tab-content">
              <h3>Loan Due on December 3, 2024</h3>
              <h1>₱ 0.00</h1>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/payment" className="accept-button" style={{ marginLeft: "auto" }}>
                  Pay Now
                </Link>
              </div>
            </div>
          </div>
          <DropdownInfo title="View Breakdown of Charges">
            <div className="breakdown-content">
              <p>Principal Amount</p>
              <p>Interest Due (Interest Rate: 1.5%)</p>
              <p>Penalties Due</p>
              <p>Previous Balance</p>
              <hr />
              <p>Total Payback Amount</p>
            </div>
          </DropdownInfo>
          <DropdownInfo title="Amount Paid">
            <ProgressBar percentage={22.65} label="Amount Paid" usedAmount={2265.17} />
          </DropdownInfo>
          <DropdownInfo title="Transaction History">
            <p>Transaction details go here...</p>
          </DropdownInfo>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
