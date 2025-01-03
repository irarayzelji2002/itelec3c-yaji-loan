// resources/js/Pages/TableView.jsx
import DangerButton from "@/Components/DangerButton";
import IconButton from "@/Components/IconButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
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
  const [disableRoleBtn, setDisableRoleBtn] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    verificationStatus: "all_verification",
    role: "all_roles",
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("Users:", data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [filters]);

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
      render: (user) => (
        <span className="flex flex-grow">{capitalizeFirstLetter(user.role_name)}</span>
      ),
    },
    {
      id: "created_at",
      label: "Created At",
      sortable: true,
      type: "timestamp",
      minWidth: "130px",
      render: (user) =>
        new Date(user.created_at).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
          hour12: true,
        }),
    },
    {
      id: "updated_at",
      label: "Updated At",
      sortable: true,
      type: "timestamp",
      minWidth: "130px",
      render: (user) =>
        new Date(user.updated_at).toLocaleString("en-US", {
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
      type: "number",
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
      render: (user) => user.verificationType?.valid_id || "-",
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
      id: "view_action",
      label: "View",
      isAction: true,
      sortable: false,
      minWidth: "80px",
      component: (user) => (
        <div className="flex justify-center">
          <TertiaryButton onClick={() => handleViewDetails(user)}>View</TertiaryButton>
        </div>
      ),
    },
    {
      id: "verification_actions",
      label: "Change Verification Status",
      isAction: true,
      sortable: false,
      minWidth: "200px",
      component: (user) => (
        <div className="flex justify-center gap-3">
          <PrimaryButton
            onClick={() => handleChangeVerificationStatus(user, "verified")}
            disabled={user.verification_status === "verified" || disableAcceptBtn}
          >
            Accept
          </PrimaryButton>
          <DangerButton
            onClick={() => handleChangeVerificationStatus(user, "denied")}
            disabled={user.verification_status === "denied" || disableDenyBtn}
          >
            Deny
          </DangerButton>
        </div>
      ),
    },
    {
      id: "role_action",
      label: "Change Role",
      isAction: true,
      sortable: false,
      minWidth: "150px",
      component: (user) => (
        <div className="flex justify-center">
          <select
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            onChange={(e) => handleChangeRole(user, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            disabled={disableRoleBtn}
            value={user.role_name}
          >
            <option value="" disabled>
              Change Role
            </option>
            <option value="member">Member</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ),
    },
  ];

  const statusGroups = {
    verificationStatus: {
      label: "Verification Status",
      defaultSelected: "all_verification",
      statuses: [
        {
          id: "all_verification",
          label: "All",
          column: "verification_status",
          color: "black",
          bgColor: "#c4c4c4",
        },
        {
          id: "pending",
          label: "Pending",
          column: "verification_status",
          color: "black",
          bgColor: "#FFD563",
        },
        {
          id: "verified",
          label: "Verified",
          column: "verification_status",
          color: "black",
          bgColor: "#7FE5B0",
        },
        {
          id: "denied",
          label: "Denied",
          column: "verification_status",
          color: "black",
          bgColor: "#FF7D7D",
        },
      ],
    },
    role: {
      label: "Role",
      defaultSelected: "all_roles",
      statuses: [
        {
          id: "all_roles",
          label: "All",
          column: "role_name",
          color: "black",
          bgColor: "#c4c4c4",
        },
        {
          id: "member",
          label: "Member",
          column: "role_name",
          color: "black",
          bgColor: "#62E19E",
        },
        {
          id: "employee",
          label: "Employee",
          column: "role_name",
          color: "white",
          bgColor: "#31896b",
        },
        {
          id: "admin",
          label: "Admin",
          column: "role_name",
          color: "white",
          bgColor: "#043C3C",
        },
      ],
    },
  };

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
        <DangerButton
          onClick={() => handleChangeVerificationStatus(user, "denied")}
          disabled={user.verification_status === "denied" || disableDenyBtn}
        >
          Deny
        </DangerButton>
      ),
    },
    {
      id: "change_role",
      label: "Change Role",
      render: (user) => (
        <div className="relative inline-block">
          <select
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            onChange={(e) => handleChangeRole(user, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            disabled={disableRoleBtn}
            value={user.role_name}
          >
            <option value="" disabled>
              Change Role
            </option>
            <option value="member">Member</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleChangeVerificationStatus = async (user, new_verification_status) => {
    try {
      setSelectedUser(user);
      if (new_verification_status === "verified") setDisableAcceptBtn(true);
      else if (new_verification_status === "denied") setDisableDenyBtn(true);

      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      if (!csrfToken) throw new Error("CSRF token not found");

      console.log(`Sending request to: /api/employee/users/${user.user_id}/verification-status`);
      const response = await fetch(`/api/employee/users/${user.user_id}/verification-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrfToken,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ verification_status: new_verification_status }),
      });
      console.log("Response status:", response.status);
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You do not have permission to perform this action");
        }
        throw new Error("Failed to update verification status");
      }
      const data = await response.json();
      console.log("Response data:", data);

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.user_id === user.user_id ? { ...u, verification_status: new_verification_status } : u
        )
      );
      showToast(
        "success",
        `User "${user.full_name}"'s verification status changed to ${new_verification_status}`,
        5000
      );
    } catch (error) {
      console.error("Error:", error);
      showToast("error", error.message);
    } finally {
      if (new_verification_status === "verified") {
        setDisableAcceptBtn(false);
      } else if (new_verification_status === "denied") {
        setDisableDenyBtn(false);
      }
    }
  };

  const handleChangeRole = async (user, new_role) => {
    try {
      setSelectedUser(user);
      setDisableRoleBtn(true);

      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      if (!csrfToken) throw new Error("CSRF token not found");

      console.log("Making request to:", `/api/employee/users/${user.user_id}/role`);
      console.log("CSRF Token:", csrfToken);

      const response = await fetch(`/api/employee/users/${user.user_id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrfToken,
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
        body: JSON.stringify({ role: new_role }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You do not have permission to perform this action");
        }
        throw new Error("Failed to update user role");
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Update both the users list and the selected user
      const updatedUser = { ...user, role_name: new_role };
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.user_id ? updatedUser : u)));
      setSelectedUser(updatedUser);
      showToast("success", `User role changed to ${new_role} successfully`);
    } catch (error) {
      console.error("Error:", error);
      showToast("error", error.message);
    } finally {
      setDisableRoleBtn(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between gap-2 sm:flex-row">
          <h2>Users Table</h2>
          <TertiaryButton
            onClick={() => (window.location.href = "/employee-form")}
            className="whitespace-nowrap"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Employee
          </TertiaryButton>
        </div>
      }
    >
      <Head title="Users Table" />
      <div className="flex hidden gap-4">
        <button onClick={() => showToast("success", "Test Success")}>
          Click for Toast Success
        </button>
        <button onClick={() => showToast("error", "Test Error")}>Click for Toast Error</button>
        <button onClick={() => showToast("info", "Test Info")}>Click for Toast Info</button>
        <button onClick={() => showToast("warn", "Test Warn")}>Click for Toast Warn</button>
      </div>
      <div className="py-6">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 overflow-hidden shadow-sm sm:rounded-lg">
            <Table
              columns={columns}
              data={users}
              loading={loading}
              showSearch={true}
              showStatusBar={true}
              itemsPerPage={10}
              defaultSort={{ column: "created_at", direction: "desc" }}
              statusGroups={statusGroups}
              actions={actions}
              selectedRow={selectedUser}
              setSelectedRow={setSelectedUser}
              idField="user_id"
              onFilterChange={handleFilterChange}
            />
            <UserDetailsExpanded
              user={selectedUser}
              columns={columns}
              isDetailsExpanded={isDetailsExpanded}
              onExpand={() => setIsDetailsExpanded(true)}
              onCollapse={() => setIsDetailsExpanded(false)}
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
                    {user.verificationType?.valid_id || "-"}
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

const UserDetailsExpanded = ({ user, columns, isDetailsExpanded, onExpand, onCollapse }) => {
  if (!user) return null;

  return (
    <div className="rounded-lg bg-white p-2">
      <div className="flex items-center justify-start gap-2">
        {isDetailsExpanded ? (
          <IconButton onClick={onCollapse} className="min-w-[32px]">
            <i className="fa-solid fa-chevron-down"></i>
          </IconButton>
        ) : (
          <IconButton onClick={onExpand} className="min-w-[32px]">
            <i className="fa-solid fa-chevron-right"></i>
          </IconButton>
        )}
        <h3 className="text-md font-semibold">{`User Details (${String(user.user_id)})`}</h3>
      </div>
      {isDetailsExpanded && (
        <div className="view-loan-details grid grid-cols-1 gap-5 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {columns
            .filter((column) => column.id !== "status_action")
            .map((column) => (
              <div key={column.id}>
                {!column.isAction && (
                  <label className="block text-sm font-medium text-gray-700">{column.label}</label>
                )}
                <div>
                  {column.isAction ? (
                    <></>
                  ) : column.render ? (
                    <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                      {column.render(user)}
                    </div>
                  ) : (
                    <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                      {user[column.id] || column.defaultValue || "-"}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
