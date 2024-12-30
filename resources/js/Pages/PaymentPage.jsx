import PrimaryButton from "@/Components/PrimaryButton";
import MemberLayout from "@/Layouts/MemberLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymentPage({ loan }) {
  const user = usePage().props.auth.user;
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [inputAmount, setInputAmount] = useState("");
  const [warning, setWarning] = useState("");
  const amountDue = parseFloat(loan.outstanding_balance || 0);

  useEffect(() => {
    // Fetch all loans for the user and calculate the total outstanding balance
    axios
      .get(route("user.loans"))
      .then((response) => {
        console.log("API response:", response.data);
        const loans = response.data.loans || [];
        const totalOutstandingBalance = loans.reduce(
          (total, loan) => total + parseFloat(loan.outstanding_balance || 0),
          0
        );
        setWalletBalance(totalOutstandingBalance);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      });
  }, []);

  useEffect(() => {
    const amount = parseFloat(inputAmount);
    if (amount > walletBalance) {
      setWarning("Insufficient Balance");
    } else {
      setWarning("");
    }
  }, [inputAmount, walletBalance]);

  const calculateDueDate = (dateApplied) => {
    const appliedDate = new Date(dateApplied);
    const currentDate = new Date();
    let dueDate = new Date(appliedDate);
    dueDate.setDate(appliedDate.getDate() + 30);

    while (dueDate < currentDate) {
      dueDate.setDate(dueDate.getDate() + 30);
    }

    const options = { year: "numeric", month: "long", day: "numeric" };
    return dueDate.toLocaleDateString(undefined, options);
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

  const handlePayNow = () => {
    const amount = parseFloat(inputAmount);
    if (amount > walletBalance) {
      setWarning("Insufficient Balance");
    } else {
      axios
        .post(route("payment.store"), {
          loan_id: loan.loan_id,
          payment_amount: amount,
          payment_method: "wallet", // or any other method
          payment_reference: "N/A", // or any reference if applicable
        })
        .then((response) => {
          console.log("Payment response:", response.data);
          showToast("success", "Payment recorded successfully");
          window.location.href = "/success";
        })
        .catch((error) => {
          console.error("Error recording payment:", error);
          showToast("error", "Failed to record payment. Please try again.");
        });
    }
  };

  const dueDate = calculateDueDate(loan.date_applied);
  const finalDueDate = calculateFinalDueDate(
    loan.date_applied,
    loan.loan_term_period,
    loan.loan_term_unit
  );
  const monthlyPayment = calculateMonthlyPayment(loan.outstanding_balance, loan.loan_term_period);

  console.log("User props:", user);
  console.log("Loan props:", loan);

  return (
    <MemberLayout>
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
                  <div className="request-value"> &nbsp;₱{monthlyPayment.toFixed(2)}</div>
                </div>
                <div className="request-row" style={{ marginBottom: "0" }}>
                  <div className="request-label">Due on : </div>
                  <div className="request-value">&nbsp;{dueDate}</div>
                </div>
                {monthlyPayment > walletBalance && (
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
                  <div className="request-value"> &nbsp;₱{amountDue.toFixed(2)}</div>
                </div>
                <div className="request-row" style={{ marginBottom: "0" }}>
                  <div className="request-label">Due on : </div>
                  <div className="request-value">&nbsp;{finalDueDate}</div>
                </div>
                {amountDue > walletBalance && (
                  <div className="request-row" style={{ color: "red", marginBottom: "0" }}>
                    Insufficient Balance
                  </div>
                )}
              </div>
              <div className="request-value">&nbsp;Pay In Full</div>{" "}
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
                <input
                  type="text"
                  className="amount-input"
                  placeholder="₱ 0.00"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                ></input>{" "}
                <PrimaryButton
                  onClick={handlePayNow}
                  className="accept-button ml-auto whitespace-nowrap"
                  style={{ marginLeft: "auto", alignItems: "center", display: "flex" }}
                >
                  Pay Now
                </PrimaryButton>
              </div>
              {warning && <div style={{ color: "red" }}>{warning}</div>}
              <span style={{ color: "var(--color-light-green)" }}>
                Wallet Balance: ₱ {walletBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
