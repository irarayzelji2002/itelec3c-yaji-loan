import DropdownInfo from "@/Components/DropdownInfo";
import PrimaryButton from "@/Components/PrimaryButton";
import ProgressBar from "@/Components/ProgressBar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function LoanBreakdown({ loan }) {
  const user = usePage().props.auth.user;
  console.log("User props:", user);
  console.log("Loan props:", loan);

  const loanAmount = parseFloat(loan.loan_amount || 0);
  const outstandingBalance = parseFloat(loan.outstanding_balance || 0);

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="request-body-2">
            <div className="request-row">
              <div className="request-label">Loan ID: </div>
              <div className="request-value"> &nbsp;{loan.loan_id}</div>
            </div>

            <div className="request-row">
              <div className="request-label">Due Date : </div>
              <div className="request-value">&nbsp;{loan.due_date}</div>
            </div>
            <div className="request-row" style={{ marginBottom: "0" }}>
              <div className="request-label">Amount Requested : </div>
              <div className="request-value">&nbsp;₱ {loanAmount.toFixed(2)}</div>
            </div>
          </div>

          <div className="content-container">
            <div className="tab-content">
              <h3>Loan Due on {loan.due_date}</h3>
              <h1>₱ {outstandingBalance.toFixed(2)}</h1>
              <div style={{ display: "flex", gap: "1rem" }}>
                <PrimaryButton
                  onClick={() => {
                    window.location.href = route("payment.page");
                  }}
                  className="accept-button"
                  style={{ marginLeft: "auto" }}
                >
                  Pay Now
                </PrimaryButton>
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
