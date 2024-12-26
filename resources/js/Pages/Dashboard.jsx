import TableContainer from "@/Components/TableContainer";
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 className="welcome-text">
              Welcome, <span className="highlighted-name">{user.first_name}!</span>
            </h1>
            <button className="add-table-button">
              <span className="plus-icon">+</span> Add Employee
            </button>
          </div>
          <div className="center-column">
            <TableContainer table={"Loan Table"} />
            <TableContainer table={"Member Table"} />
            <TableContainer table={"Payment Table"} />
            <TableContainer table={"Loan Type Table"} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
