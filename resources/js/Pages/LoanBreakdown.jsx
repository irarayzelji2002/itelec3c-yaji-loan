import DropdownInfo from "@/Components/DropdownInfo";
import PrimaryButton from "@/Components/PrimaryButton";
import ProgressBar from "@/Components/ProgressBar";
import MemberLayout from "@/Layouts/MemberLayout";
import { Head, usePage } from "@inertiajs/react";

export default function LoanBreakdown({ loan }) {
  const user = usePage().props.auth.user;
  console.log("User props:", user);
  console.log("Loan props:", loan);

  const loanAmount = parseFloat(loan.loan_amount || 0);
  const outstandingBalance = parseFloat(loan.outstanding_balance || 0);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculatePercentageToPay = (loanAmount, outstandingBalance) => {
    if (loanAmount === 0) return 0;
    const percentage = ((loanAmount - outstandingBalance) / loanAmount) * 100;
    return percentage === 0 ? 100 : percentage;
  };

  const calculateAmountStillNeededToPay = (loanAmount, outstandingBalance) => {
    return loanAmount - outstandingBalance;
  };

  const calculateFinalDueDate = (dateApplied, term, termUnit) => {
    const appliedDate = new Date(dateApplied);
    const finalDate = new Date(appliedDate);

    if (termUnit === "years") {
      finalDate.setFullYear(appliedDate.getFullYear() + term);
    } else {
      finalDate.setMonth(appliedDate.getMonth() + term);
    }

    const options = { year: "numeric", month: "long", day: "numeric" };
    return finalDate.toLocaleDateString(undefined, options);
  };

  const calculateMonthlyPayment = (outstandingBalance, loanTerm) => {
    return loanTerm > 0 ? outstandingBalance / loanTerm : 0;
  };

  const percentageToPay = calculatePercentageToPay(loanAmount, outstandingBalance);
  const amountStillNeededToPay = calculateAmountStillNeededToPay(loanAmount, outstandingBalance);
  const finalDueDate = calculateFinalDueDate(
    loan.date_applied,
    loan.loan_term_period,
    loan.loan_term_unit
  );
  const monthlyPayment = calculateMonthlyPayment(outstandingBalance, loan.loan_term_period);

  return (
    <MemberLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="request-body-2">
            <div className="request-row">
              <div className="request-label">Loan ID: </div>
              <div className="request-value"> &nbsp;{loan.loan_id}</div>
            </div>

            <div className="request-row">
              <div className="request-label">Final Due Date : </div>
              <div className="request-value">&nbsp;{finalDueDate}</div>
            </div>
            <div className="request-row" style={{ marginBottom: "0" }}>
              <div className="request-label">Amount Loaned : </div>
              <div className="request-value">&nbsp;₱ {loanAmount.toFixed(2)}</div>
            </div>
          </div>

          <div className="content-container">
            <div className="tab-content">
              <h3>Amount to pay {loan.due_date}</h3>
              <h1> {monthlyPayment ? `₱${numberWithCommas(monthlyPayment.toFixed(2))}` : "-"}</h1>
              <div style={{ display: "flex", gap: "1rem" }}>
                <PrimaryButton
                  onClick={() => {
                    window.location.href = route("payment.page", { loan_id: loan.loan_id });
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
              <table>
                <tbody>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">Interest Rate:</td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {loan.interest_rate ? `${loan.interest_rate}%` : "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 text-sm font-medium text-black">Loan Term:</td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {loan.loan_term_period} {loan.loan_term_unit}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">Approval Date:</td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {loan.date_status_changed || "-"}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 text-sm font-medium text-black">Monthly Payment:</td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {monthlyPayment ? `₱${numberWithCommas(monthlyPayment.toFixed(2))}` : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">Total Amount Loaned:</td>
                    <td className="py-2 pl-4 text-sm text-black">{loan.loan_amount || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DropdownInfo>
          <DropdownInfo title="Outstanding Balance">
            <ProgressBar
              percentage={percentageToPay}
              label="Amount Paid"
              usedAmount={loan.outstanding_balance}
            />
          </DropdownInfo>
          <DropdownInfo title="Transaction History">
            <p>Transaction details go here...</p>
          </DropdownInfo>
        </div>
      </div>
    </MemberLayout>
  );
}
