import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";

function MyLoan({ loan }) {
  useEffect(() => {
    console.log("Rendering MyLoan component with loan:", loan);
  }, [loan]);

  if (!loan) {
    console.error("Loan data is missing");
    return <div>Error: Loan data is missing</div>;
  }

  const loanAmount = Number(loan.loan_amount);
  const outstandingBalance = Number(loan.outstanding_balance);

  return (
    <>
      <div className="request-header">
        Loan Request #{loan.loan_id}
        <div style={{ gap: "1rem", display: "flex" }}>
          <PrimaryButton
            className="accept-button"
            onClick={() => (window.location.href = "/loan-breakdown")}
          >
            Pay Now
          </PrimaryButton>
        </div>
      </div>
      <div className="request-body">
        <div className="request-row">
          <div className="request-label">Due Date : </div>
          <div className="request-value">&nbsp;{loan.final_due_date}</div>
        </div>
        <div className="request-row">
          <div className="request-label">Amount Loaned : </div>
          <div className="request-value">&nbsp;₱ {loanAmount.toFixed(2)}</div>
        </div>
        <div className="request-row">
          <div className="request-label">Outstanding Balance : </div>
          <div className="request-value">&nbsp;₱ {outstandingBalance.toFixed(2)}</div>
        </div>
      </div>
    </>
  );
}

export default MyLoan;
