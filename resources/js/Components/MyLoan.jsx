import PrimaryButton from "@/Components/PrimaryButton";

function MyLoan({ loan }) {
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
          <div className="request-value">&nbsp;₱ {loan.loan_amount.toFixed(2)}</div>
        </div>
        <div className="request-row">
          <div className="request-label">Outstanding Balance : </div>
          <div className="request-value">&nbsp;₱ {loan.outstanding_balance.toFixed(2)}</div>
        </div>
      </div>
    </>
  );
}

export default MyLoan;
