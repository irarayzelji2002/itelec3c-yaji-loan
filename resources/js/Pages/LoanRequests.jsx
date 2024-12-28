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
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <h1 className="welcome-text font-bold">
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
