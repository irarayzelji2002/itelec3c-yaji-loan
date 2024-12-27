import PrimaryButton from "@/Components/PrimaryButton";

function MyLoan({ loanNo }) {
  return (
    <>
      <div className="request-header">
        Loan Request #{loanNo}
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
          <div className="request-value">&nbsp;December 30,2024</div>
        </div>
        <div className="request-row">
          <div className="request-label">Amount Loaned : </div>
          <div className="request-value">&nbsp;₱ 2,500.00</div>
        </div>
      </div>
    </>
  );
}

export default MyLoan;
