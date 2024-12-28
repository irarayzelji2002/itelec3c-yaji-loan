// resources/js/Pages/TableView.jsx
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import TertiaryButton from "@/Components/TertiaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { capitalizeFirstLetter, showToast } from "@/utils/displayFunctions";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function UsersTableView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [disableAcceptBtn, setDisableAcceptBtn] = useState(false);
  const [disableDenyBtn, setDisableDenyBtn] = useState(false);

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
          <PrimaryButton
            onClick={() => handleChangeVerificationStatus(user, "verified")}
            disabled={user.verification_status === "verified" || disableAcceptBtn}
          >
            Accept
          </PrimaryButton>
          <SecondaryButton
            onClick={() => handleChangeVerificationStatus(user, "denied")}
            className="bg-white"
            disabled={user.verification_status === "denied" || disableDenyBtn}
          >
            Deny
          </SecondaryButton>
        </div>
      ),
    },
  ];

  const statuses = [
    {
      id: "pending",
      label: "Pending",
      column: "verification_status",
      comparison: "===",
      color: "black",
      bgColor: "#FFD563",
    },
    {
      id: "verified",
      label: "verified",
      column: "verification_status",
      comparison: "===",
      color: "black",
      bgColor: "#7FE5B0",
    },
    {
      id: "denied",
      label: "Denied",
      column: "verification_status",
      comparison: "===",
      color: "black",
      bgColor: "#FF7D7D",
    },
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
        <PrimaryButton
          onClick={() => handleChangeVerificationStatus(user, "verified")}
          disabled={user.verification_status === "verified" || disableAcceptBtn}
        >
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
          disabled={user.verification_status === "denied" || disableDenyBtn}
        >
          Deny
        </SecondaryButton>
      ),
    },
  ];

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChangeVerificationStatus = async (user, new_verification_status) => {
    try {
      setSelectedUser(user);
      if (new_verification_status === "verified") {
        setDisableDenyBtn(true);
      } else if (new_verification_status === "denied") {
        setDisableAcceptBtn(true);
      }
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      const response = await fetch(`/api/admin/users/${user.id}/verification-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ verification_status: new_verification_status }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You do not have permission to perform this action");
        }
        throw new Error("Failed to update verification status");
      }

      const data = await response.json();
      console.log(data);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, verification_status: new_verification_status } : u
        )
      );
      showToast("success", `User verification ${new_verification_status} successfully`);
    } catch (error) {
      console.error("Error:", error);
      showToast("error", error.message);
    } finally {
      if (new_verification_status === "verified") {
        setDisableDenyBtn(false);
      } else if (new_verification_status === "denied") {
        setDisableAcceptBtn(false);
      }
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <button onClick={() => showToast("success", "Test Success")}>Click for Toast Success</button>
      <button onClick={() => showToast("error", "Test Error")}>Click for Toast Error</button>
      <button onClick={() => showToast("info", "Test Info")}>Click for Toast Info</button>
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
              statuses={statuses}
              actions={actions}
              selectedRow={selectedUser}
              setSelectedRow={setSelectedUser}
            />
          </div>
        </div>
      </div>
      <UserDetailsModal showModal={showModal} closeModal={closeModal} user={selectedUser} />
    </AuthenticatedLayout>
  );
}

export function UserDetailsModal({ showModal, closeModal, user }) {
  return (
    <Modal show={showModal} onClose={closeModal} maxWidth="2xl" title="User Details">
      <div className="p-6">
        {user && (
          <div className="flex flex-grow flex-col items-start gap-4 sm:flex-row">
            {/* Basic Information */}
            <div className="flex w-full flex-grow flex-col">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.first_name || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.middle_name || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.last_name || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {capitalizeFirstLetter(user.role_name)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created At</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {new Date(user.created_at).toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                      hour12: true,
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {capitalizeFirstLetter(user.gender || "-")}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {new Date(user.birth_date).toLocaleDateString() || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nationality</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.nationality || "-"}
                  </div>
                </div>
                {/* Profile Picture */}
                <div className="mb-6 flex w-full flex-col justify-center">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>
                  <div className="flex w-full justify-center">
                    <div
                      className="relative h-32 w-32 ring-1 ring-gray-300"
                      style={{ borderRadius: "50%" }}
                    >
                      {user.profile_picture ? (
                        <img
                          src={
                            user.profile_picture
                              ? `/storage/${user.profile_picture}`
                              : "/img/transparent-image.png"
                          }
                          alt="Profile"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-50 text-gray-500">
                          No Image
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex w-full flex-grow flex-col">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.email || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.phone_number || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.street || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Barangay</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.barangay || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.city || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Province</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.province || "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Role and Verification */}
            <div className="flex w-full flex-grow flex-col">
              <h3 className="text-lg font-medium text-gray-900">Verification</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Verification Type
                  </label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.verification_type || "-"}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    ID/Document Front
                  </label>
                  <div className="relative h-32 rounded-lg ring-1 ring-gray-300">
                    {user.id_photo_front ? (
                      <img
                        src={`/storage/${user.id_photo_front}`}
                        alt="ID Front"
                        className="h-full w-full rounded-md object-contain"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                        No Image
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <label className="mb-1 block text-sm font-medium text-gray-700">ID Back</label>
                  <div className="relative h-32 rounded-lg ring-1 ring-gray-300">
                    {user.id_photo_back ? (
                      <img
                        src={`/storage/${user.id_photo_back}`}
                        alt="ID Back"
                        className="h-full w-full rounded-md object-contain"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                        No Image
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID File</label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {user.id_file ? (
                      <span>{user.id_file.split("/").pop()}</span>
                    ) : (
                      <div className="flex flex-col justify-center">
                        <span>-</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Selfie Photo
                  </label>
                  <div className="relative h-32 rounded-lg ring-1 ring-gray-300">
                    {user.selfie_photo ? (
                      <img
                        src={`/storage/${user.selfie_photo}`}
                        alt="Selfie"
                        className="h-full w-full rounded-md object-contain"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                        No Image
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Verification Status
                  </label>
                  <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                    {capitalizeFirstLetter(user.verification_status || "-")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-center">
          <PrimaryButton onClick={closeModal}>Close</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
