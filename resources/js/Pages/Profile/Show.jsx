import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Show() {
  const user = usePage().props.auth.user;

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}
    >
      <Head title="Profile" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <section>
              <header className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                  View your account's profile information.
                </p>
              </header>

              {/* Profile Picture */}
              <div className="mb-6 flex justify-center">
                <div
                  className="relative h-32 w-32"
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

              {/* Name */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="mt-1 rounded-md bg-gray-50 p-2">{user.name}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 rounded-md bg-gray-50 p-2">{user.email}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <div className="mt-1 rounded-md bg-gray-50 p-2">
                    {capitalizeFirstLetter(user.roles?.map((role) => role.name).join(", ") || "-")}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact</label>
                  <div className="mt-1 rounded-md bg-gray-50 p-2">
                    {user.contact_information || "-"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1 rounded-md bg-gray-50 p-2">{user.address || "-"}</div>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={route("profile.edit")}
                    className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
