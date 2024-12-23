import MyLoan from "@/Components/MyLoan";
import ProgressBar from "@/Components/ProgressBar";
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
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 className="welcome-text">
              Welcome, <span className="highlighted-name">{user.name}</span>
            </h1>
            <button className="add-table-button">
              <span className="plus-icon">+</span> Apply for a Loan
            </button>
          </div>
          <div className="center-column">
            <WalletTabs />
          </div>
          <ProgressBar percentage={50} label={1} usedAmount={10000} />
          <MyLoan loanNo={1} />
          <MyLoan loanNo={2} />
          <MyLoan loanNo={3} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
