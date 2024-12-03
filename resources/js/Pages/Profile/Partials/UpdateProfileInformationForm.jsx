import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
  const user = usePage().props.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    profile_picture: null,
    name: user.name,
    email: user.email,
    contact_information: user.contact_information,
    address: user.address,
  });

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("_method", "PATCH");

    if (data.profile_picture) {
      formData.append("profile_picture", data.profile_picture);
    }

    post(route("profile.update"), {
      preserveScroll: true,
      data: formData,
      forceFormData: true,
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
        {/* Name */}
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        {/* Email */}
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        {/* Contact Info */}
        <div>
          <InputLabel htmlFor="contact_information" value="Contact Information" />

          <TextInput
            id="contact_information"
            type="text"
            className="mt-1 block w-full"
            value={data.contact_information}
            onChange={(e) => setData("contact_information", e.target.value)}
            required
          />

          <InputError className="mt-2" message={errors.contact_information} />
        </div>

        {/* Address */}
        <div>
          <InputLabel htmlFor="address" value="Address" />

          <TextInput
            id="address"
            type="text"
            className="mt-1 block w-full"
            value={data.address}
            onChange={(e) => setData("address", e.target.value)}
            required
          />

          <InputError className="mt-2" message={errors.address} />
        </div>

        {/* Profile picture */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setData("profile_picture", e.target.files[0])}
            className="mt-1 block w-full"
            accept="image/*"
          />
          {errors.profile_picture && <div className="text-red-500">{errors.profile_picture}</div>}
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
