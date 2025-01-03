import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { capitalizeFirstLetter, formatDateMMDDYYY } from "@/utils/displayFunctions";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Show() {
  const user = usePage().props.auth.user;

  return (
    <AuthenticatedLayout header={<h2>Profile</h2>}>
      <Head title="Profile" />

      <div className="py-12">
        <div className="max-w-100 mx-auto space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-60 p-4 shadow sm:rounded-lg sm:p-8">
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

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.full_name} {/* Using the getFullNameAttribute accessor */}
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
                        {formatDateMMDDYYY(user.birth_date) || "-"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nationality</label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.nationality || "-"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.phone_number || "-"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Complete Address
                      </label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.full_address || ""} {/* Using the getFullAddressAttribute accessor */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role and Verification */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Security Question 1
                      </label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.security_question_1 || "-"}
                      </div>
                      <label className="block text-sm font-medium text-gray-700">Answer</label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.security_answer_1 || "-"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Security Question 2
                      </label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.security_question_2 || "-"}
                      </div>
                      <label className="block text-sm font-medium text-gray-700">Answer</label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {user.security_answer_2 || "-"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {/* {capitalizeFirstLetter(
                          user.roles?.map((role) => role.name).join(", ") || "-"
                        )} */}
                        {capitalizeFirstLetter(user.role_name)}{" "}
                        {/* Using the getRoleNameAttribute accessor */}
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

                <div className="flex items-center gap-4">
                  <Link
                    href={route("profile.edit")}
                    className="text-md inline-flex items-center !rounded-lg border border-transparent bg-green-700 px-4 py-2 font-semibold text-black transition duration-150 ease-in-out hover:bg-green-500 focus:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 active:bg-green-800"
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
