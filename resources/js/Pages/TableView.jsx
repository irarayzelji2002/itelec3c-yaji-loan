// resources/js/Pages/TableView.jsx
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function UsersTableView() {
  const user = usePage().props.auth.user;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      id: "profile_picture",
      label: "Profile",
      sortable: false,
      searchable: false,
      minWidth: "80px",
      render: (user) => (
        <div className="flex justify-center">
          <div
            className="relative h-10 w-10"
            style={{ border: "2px solid gray", borderRadius: "50%" }}
          >
            <img
              src={
                user.profile_picture
                  ? `/storage/${user.profile_picture}`
                  : "/img/transparent-image.png"
              }
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
              style={{ backgroundColor: "gainsboro" }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "full_name",
      label: "Name",
      sortable: true,
      minWidth: "150px",
    },
    {
      id: "email",
      label: "Email",
      sortable: true,
      minWidth: "200px",
    },
    {
      id: "roles",
      label: "Role",
      sortable: true,
      minWidth: "120px",
      getValue: (user) => user.roles.map((role) => role.name).join(", "),
      render: (user) => user.roles.map((role) => role.name).join(", "),
    },
    {
      id: "phone_number",
      label: "Contact",
      sortable: true,
      minWidth: "150px",
    },
    {
      id: "full_address",
      label: "Address",
      sortable: true,
      minWidth: "200px",
    },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <Table
                columns={columns}
                data={users}
                loading={loading}
                showSearch={true}
                itemsPerPage={10}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
