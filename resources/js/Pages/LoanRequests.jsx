import RequestPopUp from "@/Components/RequestPopUp";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
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
              Welcome, <span className="highlighted-name">{user.first_name}!</span>
            </h1>
          </div>
          <div className="center-column">
            <RequestPopUp loanNo={12} />
            <RequestPopUp loanNo={23} />
            <RequestPopUp loanNo={87} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
