import TableContainer from "@/Components/TableContainer";
import TertiaryButton from "@/Components/TertiaryButton";
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
            <h1 className="welcome-text text-center font-bold sm:text-left">
              Welcome, <span className="highlighted-name font-bold">{user.first_name}!</span>
            </h1>
            <TertiaryButton
              onClick={() => (window.location.href = "/employee-form")}
              className="add-table-button whitespace-nowrap"
            >
              <span className="plus-icon">+</span> Add Employee
            </TertiaryButton>
          </div>
          <div className="center-column">
            <TableContainer table={"Loan Table"} img={"/img/loan-table.png"} />
            <TableContainer table={"Member Table"} img={"/img/member-table.png"} />
            <TableContainer table={"Payment Table"} img={"/img/payment-table.png"} />
            <TableContainer table={"Loan Type Table"} img={"/img/loan-type-table.png"} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
