import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";

function MyLoan({ loan }) {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [formattedDueDate, setFormattedDueDate] = useState("");

  useEffect(() => {
    console.log("Rendering MyLoan component with loan:", loan);

    if (loan) {
      const loanAmount = Number(loan.loan_amount);
      const outstandingBalance = Number(loan.outstanding_balance);
      const loanTerm = Number(loan.loan_term_period);

      if (loanTerm > 0) {
        const calculatedMonthlyPayment = outstandingBalance / loanTerm;
        setMonthlyPayment(calculatedMonthlyPayment);
      } else {
        console.error("Invalid loan term:", loan.loan_term_period);
      }

      const calculateDueDate = (dateApplied) => {
        const appliedDate = new Date(dateApplied);
        const dueDate = new Date(appliedDate);
        dueDate.setMonth(appliedDate.getMonth() + 1);

        const today = new Date();
        if (dueDate < today) {
          dueDate.setMonth(dueDate.getMonth() + 1);
        }

        const options = { year: "numeric", month: "long", day: "numeric" };
        return dueDate.toLocaleDateString(undefined, options);
      };

      setFormattedDueDate(calculateDueDate(loan.date_applied));
    }
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
            onClick={() => (window.location.href = "/loan-breakdown/" + loan.loan_id)}
          >
            Pay Now
          </PrimaryButton>
        </div>
      </div>
      <div className="request-body">
        <div className="request-row">
          <div className="request-label">Due Date : </div>
          <div className="request-value">&nbsp;{formattedDueDate}</div>
        </div>
        <div className="request-row">
          <div className="request-label">Amount Loaned : </div>
          <div className="request-value">&nbsp;₱ {loanAmount.toFixed(2)}</div>
        </div>
        <div className="request-row">
          <div className="request-label">Outstanding Balance : </div>
          <div className="request-value">&nbsp;₱ {outstandingBalance.toFixed(2)}</div>
        </div>
        <div className="request-row">
          <div className="request-label">Monthly Payment : </div>
          <div className="request-value">&nbsp;₱ {monthlyPayment.toFixed(2)}</div>
        </div>
      </div>
    </>
  );
}

export default MyLoan;
