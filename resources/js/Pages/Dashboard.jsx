import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const user = usePage().props.auth.user;
  console.log("User props:", user);
  const roles = user?.roles || [];
  console.log("user?.roles:", user?.roles);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState([
    { id: "name", order: "asc" },
    { id: "email", order: "asc" },
    { id: "role", order: "asc" },
    { id: "contact_information", order: "asc" },
    { id: "address", order: "asc" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!users.length) return;

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const filteredData = filterData(users, searchQuery);
      setFilteredUsers(filteredData);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, users]);

  const getSortOrder = (id) => {
    return sort.find((col) => col.id === id).order;
  };

  const handleChangeOrder = (id) => {
    const newSort = sort.map((col) => {
      if (col.id === id) {
        const newOrder = col.order === "asc" ? "desc" : "asc";
        const sortedData = sortData(filteredUsers, id, newOrder);
        setFilteredUsers(sortedData);
        return { ...col, order: newOrder };
      }
      return col;
    });
    setSort(newSort);
  };

  // Sorting
  const sortData = (data, columnId, order) => {
    return [...data].sort((a, b) => {
      let aValue = columnId === "role" ? a.roles.map((role) => role.name).join(", ") : a[columnId];
      let bValue = columnId === "role" ? b.roles.map((role) => role.name).join(", ") : b[columnId];

      // Handle null/undefined values
      aValue = aValue || "";
      bValue = bValue || "";

      if (order === "asc") {
        return aValue.toString().localeCompare(bValue.toString());
      } else {
        return bValue.toString().localeCompare(aValue.toString());
      }
    });
  };

  // Searching
  const filterData = (data, query) => {
    if (!query) return data;

    return data.filter((item) => {
      const searchStr = [
        item.name,
        item.email,
        item.roles.map((role) => role.name).join(", "),
        item.contact_information,
        item.address,
      ]
        .join(" ")
        .toLowerCase();

      return searchStr.includes(query.toLowerCase());
    });
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="py-3">
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <h1>Welcome, {user.name}</h1>
                  <TextInput
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search here..."
                  />
                </div>
                {isSearching && <h1>Searching {searchQuery}...</h1>}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th id="profile" className="px-6 py-3 text-xs font-medium uppercase">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span className="text-dark">Profile</span>
                        </div>
                      </th>
                      <th id="name" className="px-6 py-3 text-xs font-medium uppercase">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span className="text-dark">Name</span>
                          <button
                            className="uppercase text-gray-500"
                            onClick={() => handleChangeOrder("name")}
                          >
                            {getSortOrder("name")}
                          </button>
                        </div>
                      </th>
                      <th
                        id="email"
                        className="d-flex justify-content-between px-6 py-3 text-xs font-medium uppercase"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span className="text-dark">Email</span>
                          <button
                            className="uppercase text-gray-500"
                            onClick={() => handleChangeOrder("email")}
                          >
                            {getSortOrder("email")}
                          </button>
                        </div>
                      </th>
                      <th
                        id="role"
                        className="d-flex justify-content-between px-6 py-3 text-xs font-medium uppercase"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span className="text-dark">Role</span>
                          <button
                            className="uppercase text-gray-500"
                            onClick={() => handleChangeOrder("role")}
                          >
                            {getSortOrder("role")}
                          </button>
                        </div>
                      </th>
                      <th
                        id="contact_information"
                        className="d-flex justify-content-between px-6 py-3 text-xs font-medium uppercase"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span className="text-dark">Contact</span>
                          <button
                            className="uppercase text-gray-500"
                            onClick={() => handleChangeOrder("contact_information")}
                          >
                            {getSortOrder("contact_information")}
                          </button>
                        </div>
                      </th>
                      <th
                        id="address"
                        className="d-flex justify-content-between px-6 py-3 text-xs font-medium uppercase"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span className="text-dark">Address</span>
                          <button
                            className="uppercase text-gray-500"
                            onClick={() => handleChangeOrder("address")}
                          >
                            {getSortOrder("address")}
                          </button>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {loading && (
                      <tr>
                        <td colSpan="5" className="whitespace-nowrap px-6 py-4 text-center">
                          Loading...
                        </td>
                      </tr>
                    )}
                    {!loading && filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-4 text-center">
                          No results found
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap p-1">
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
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.roles.map((role) => role.name).join(", ")}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {user.contact_information || "-"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{user.address || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {roles.includes("employee") && <p>Hello Employee!</p>}
              {roles.includes("member") && <p>Hello Member!</p>}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
