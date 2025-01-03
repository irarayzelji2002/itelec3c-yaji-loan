import ErrorBoundary from "@/Components/ErrorBoundary";
import MyLoan from "@/Components/MyLoan";
import ProgressBar from "@/Components/ProgressBar";
import Reminders from "@/Components/Reminders";
import TertiaryButton from "@/Components/TertiaryButton";
import WalletTabs from "@/Components/WalletTabs";
import MemberLayout from "@/Layouts/MemberLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MemberView() {
  const user = usePage().props.auth.user;
  const [loans, setLoans] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);

  useEffect(() => {
    axios
      .get(route("user.loans"))
      .then((response) => {
        console.log("API response:", response.data);
        const loans = response.data.loans || [];
        setLoans(loans);

        const totalLoanAmount = loans.reduce((sum, loan) => {
          const outstandingBalance =
            parseFloat(loan.outstanding_balance) +
            parseFloat(loan.loan_amount) * (parseFloat(loan.interest_rate) / 100);
          return sum + (outstandingBalance || 0);
        }, 0);
        setTotalLoanAmount(totalLoanAmount);
      })
      .catch((error) => {
        console.error("Error fetching loans:", error);
      });
  }, []);

  return (
    <MemberLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <h1 className="welcome-text font-bold">
              Welcome, <span className="highlighted-name">{user.first_name}!</span>
            </h1>
            <TertiaryButton
              onClick={() => (window.location.href = "/application-form")}
              className="add-table-button"
            >
              <span className="plus-icon">+</span> Apply for a Loan
            </TertiaryButton>
          </div>
          <div className="center-column">
            <WalletTabs loans={loans} />
          </div>
          <ProgressBar percentage={50} label={loans.length} usedAmount={totalLoanAmount} />
          <ErrorBoundary>
            {loans.map((loan) => (
              <MyLoan key={loan.loan_id} loan={loan} />
            ))}
          </ErrorBoundary>
          <div className="column-down">
            <h2>Reminders</h2>
            <div className="reminders-container">
              <Reminders
                reminder="Get cashback when you complete your loan in advance."
                title="Get Cashback"
              />
              <Reminders reminder="Please settle your loan now." title="Loan Reminder" />
              <Reminders
                reminder="Get cashback when you complete your loan in advance."
                title="Get Cashback"
              />
              <Reminders reminder="Please settle your loan now." title="Loan Reminder" />
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
