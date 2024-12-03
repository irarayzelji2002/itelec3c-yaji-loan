import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    contact_information: "",
    address: "",
    profile_picture: null,
    preview_image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("profile_picture", file);
      setData("preview_image", URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Exclude preview_image
    Object.keys(data).forEach((key) => {
      if (key !== "preview_image" && data[key]) {
        formData.append(key, data[key]);
      }
    });

    post(route("register"), {
      data: formData,
      forceFormData: true,
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />
      <form onSubmit={submit} encType="multipart/form-data">
        {/* Name */}
        <div>
          <InputLabel htmlFor="name" value="Name" required={true} />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData("name", e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        {/* Email */}
        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" required={true} />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" required={true} />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password", e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        {/* Password Confirmation */}
        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" required={true} />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        {/* Contact Information */}
        <div className="mt-4">
          <InputLabel htmlFor="contact_information" value="Contact Information" required={true} />

          <TextInput
            id="contact_information"
            type="text"
            name="contact_information"
            value={data.contact_information}
            className="mt-1 block w-full"
            onChange={(e) => setData("contact_information", e.target.value)}
            required
          />

          <InputError message={errors.contact_information} className="mt-2" />
        </div>

        {/* Address */}
        <div className="mt-4">
          <InputLabel htmlFor="address" value="Address" required={true} />

          <TextInput
            id="address"
            type="text"
            name="address"
            value={data.address}
            className="mt-1 block w-full"
            onChange={(e) => setData("address", e.target.value)}
            required
          />

          <InputError message={errors.address} className="mt-2" />
        </div>

        {/* Profile Picture */}
        <div className="mt-4">
          <InputLabel htmlFor="profile_picture" value="Profile Picture" />

          <div className="mt-2 flex items-center justify-center">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                {data.preview_image ? (
                  <img
                    src={data.preview_image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-center text-gray-400">Upload Image</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="profile_picture"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          <InputError message={errors.profile_picture} className="mt-2" />
        </div>

        {/* Already Registered, Register Button */}
        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route("login")}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ms-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
