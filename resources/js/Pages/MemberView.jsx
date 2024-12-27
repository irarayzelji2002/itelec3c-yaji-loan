import MyLoan from "@/Components/MyLoan";
import ProgressBar from "@/Components/ProgressBar";
import Reminders from "@/Components/Reminders";
import TertiaryButton from "@/Components/TertiaryButton";
import WalletTabs from "@/Components/WalletTabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function MemberView() {
  const user = usePage().props.auth.user;
  console.log("User props:", user);
  console.log("user?.roles:", user?.roles);

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 className="welcome-text">
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
            <WalletTabs />
          </div>
          <ProgressBar percentage={50} label={1} usedAmount={10000} />
          <MyLoan loanNo={1} />
          <MyLoan loanNo={2} />
          <MyLoan loanNo={3} />
          <div className="column-down">
            {" "}
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
    </AuthenticatedLayout>
  );
}
