// import PrimaryButton from "@/Components/PrimaryButton";
import TertiaryButton from "@/Components/TertiaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between gap-2 sm:flex-row">
          <h2>Edit Profile</h2>
          <TertiaryButton
            onClick={() => (window.location.href = "/employee-form")}
            className="whitespace-nowrap"
          >
            <a href={route("profile.show")} className="text-sm">
              <i className="fa-solid fa-chevron-left mr-2"></i> Back to Profile
            </a>
          </TertiaryButton>
        </div>
      }
    >
      <Head title="Edit Profile" />

      <div className="pb-12">
        <div className="max-w-100 mx-auto space-y-6 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-60 p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="bg-white bg-opacity-60 p-4 shadow sm:rounded-lg sm:p-8">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="bg-white bg-opacity-60 p-4 shadow sm:rounded-lg sm:p-8">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
