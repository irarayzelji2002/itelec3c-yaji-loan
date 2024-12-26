// resources/js/Pages/TableView.jsx
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import TertiaryButton from "@/Components/TertiaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { capitalizeFirstLetter } from "@/utils/displayFunctions";
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
      minWidth: "60px",
      render: (user) => (
        <div className="flex justify-center">
          {user.profile_picture ? (
            <div className="relative h-10 w-10">
              <img
                src={
                  user.profile_picture
                    ? `/storage/${user.profile_picture}`
                    : "/img/transparent-image.png"
                }
                alt="Profile"
                className="h-full w-full rounded-md bg-gray-300 object-cover"
              />
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      id: "first_name",
      label: "First Name",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "middle_name",
      label: "Middle Name",
      sortable: true,
      minWidth: "130px",
    },
    {
      id: "last_name",
      label: "Last Name",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "role_name",
      label: "Role",
      sortable: true,
      minWidth: "100px",
    },
    {
      id: "created_at",
      label: "Created At",
      sortable: true,
      minWidth: "130px",
      render: (user) =>
        new Date(user.created_at).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
          hour12: true,
        }),
    },
    {
      id: "gender",
      label: "Gender",
      sortable: true,
      minWidth: "100px",
    },
    {
      id: "birth_date",
      label: "Birth Date",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (user) => new Date(user.birth_date).toLocaleDateString(),
    },
    {
      id: "nationality",
      label: "Nationality",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "phone_number",
      label: "Phone",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "email",
      label: "Email",
      sortable: true,
      minWidth: "200px",
    },
    {
      id: "street",
      label: "Street",
      sortable: true,
      minWidth: "150px",
    },
    {
      id: "barangay",
      label: "Barangay",
      sortable: true,
      minWidth: "150px",
    },
    {
      id: "city",
      label: "City",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "province",
      label: "Province",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "verification_type",
      label: "Verification",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "id_photo_front",
      label: "ID Front",
      sortable: false,
      minWidth: "80px",
      render: (user) => (
        <div className="flex justify-center">
          {user.id_photo_front ? (
            <img
              src={`/storage/${user.id_photo_front}`}
              alt="ID Front"
              className="h-10 w-10 rounded-md object-cover"
            />
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      id: "id_photo_back",
      label: "ID Back",
      sortable: false,
      minWidth: "70px",
      render: (user) => (
        <div className="flex justify-center">
          {user.id_photo_back ? (
            <img
              src={`/storage/${user.id_photo_back}`}
              alt="ID Back"
              className="h-10 w-10 rounded-md object-cover"
            />
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      id: "id_file",
      label: "ID File",
      sortable: false,
      minWidth: "120px",
      render: (user) =>
        user.id_file ? (
          <span>{user.id_file.split("/").pop()}</span>
        ) : (
          <div className="flex justify-center">
            <span>-</span>
          </div>
        ),
    },
    {
      id: "selfie_photo",
      label: "Selfie",
      sortable: false,
      minWidth: "60px",
      render: (user) => (
        <div className="flex justify-center">
          {user.selfie_photo ? (
            <img
              src={`/storage/${user.selfie_photo}`}
              alt="Selfie"
              className="h-10 w-10 rounded-md object-cover"
            />
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      id: "verification_status",
      label: "Verification Status",
      sortable: true,
      minWidth: "80px",
      render: (user) => (
        <span className="flex flex-grow justify-center">
          {capitalizeFirstLetter(user.verification_status)}
        </span>
      ),
    },
    {
      id: "view_info",
      label: "Actions",
      isAction: true,
      sortable: false,
      minWidth: "100px",
      component: (user) => (
        <div className="flex gap-3">
          <TertiaryButton onClick={() => handleViewDetails(user)}>View</TertiaryButton>
          <PrimaryButton onClick={() => handleChangeVerificationStatus(user, "verified")}>
            Accept
          </PrimaryButton>
          <SecondaryButton
            onClick={() => handleChangeVerificationStatus(user, "denied")}
            className="bg-white"
          >
            Deny
          </SecondaryButton>
        </div>
      ),
    },
  ];

  const statuses = [
    { id: "verified", label: "verified", column: "verification_type", comparison: "===" },
    { id: "denied", label: "Denied", column: "verification_type", comparison: "===" },
    { id: "pending", label: "Pending", column: "verification_type", comparison: "===" },
  ];

  const actions = [
    {
      id: "view",
      label: "View",
      render: (user) => (
        <TertiaryButton onClick={() => handleViewDetails(user)}>View</TertiaryButton>
      ),
    },
    {
      id: "accept",
      label: "Accept",
      render: (user) => (
        <PrimaryButton onClick={() => handleChangeVerificationStatus(user, "verified")}>
          Accept
        </PrimaryButton>
      ),
    },
    {
      id: "deny",
      label: "Deny",
      render: (user) => (
        <SecondaryButton
          onClick={() => handleChangeVerificationStatus(user, "denied")}
          className="bg-white"
        >
          Deny
        </SecondaryButton>
      ),
    },
  ];

  const handleViewDetails = (user) => {
    // Implement view details logic
  };

  const handleChangeVerificationStatus = (user, new_verification_status) => {
    // Implement change verification status logic
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <Table
              columns={columns}
              data={users}
              loading={loading}
              showSearch={true}
              showStatusBar={true}
              itemsPerPage={10}
              defaultSort={{ column: "created_at", direction: "desc" }}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
