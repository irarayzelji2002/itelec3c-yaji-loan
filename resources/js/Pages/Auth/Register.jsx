import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    contact_information: "",
    address: "",
    date_of_birth: "",
    nationality: "",
    profile_picture: null,
    preview_image: null,
    id_upload: null,
    id_preview_image: null,
  });

  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("profile_picture", file);
      setData("preview_image", URL.createObjectURL(file));
    }
  };

  const handleIdChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("id_upload", file);
      setData("id_preview_image", URL.createObjectURL(file));
    }
  };

  const validateFields = () => {
    const errors = [];
    if (!data.name) errors.push("Name is required");
    if (!data.email) errors.push("Email is required");
    if (!data.password) errors.push("Password is required");
    if (data.password !== data.password_confirmation) errors.push("Passwords do not match");
    if (!data.contact_information) errors.push("Contact Information is required");
    if (!data.address) errors.push("Address is required");
    if (!data.date_of_birth) errors.push("Date of Birth is required");
    if (!data.nationality) errors.push("Nationality is required");
    // if (!data.profile_picture) errors.push("Profile Picture is required");
    // if (!data.id_upload) errors.push("ID Upload is required");
    return errors;
  };

  const submit = (e) => {
    e.preventDefault();
    const errors = validateFields();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "preview_image" && key !== "id_preview_image" && data[key]) {
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
      <div className="mb-4 flex items-center justify-center">
        <span
          className={`mr-4 cursor-pointer ${step === 1 ? "highlight font-bold" : "out-focus"}`}
          onClick={() => setStep(1)}
        >
          Identification
        </span>
        <div className="w-8 border-t border-gray-400"></div>
        <span
          className={`mr-4 cursor-pointer ${step === 2 ? "highlight font-bold" : "out-focus"}`}
          onClick={() => setStep(2)}
        >
          Verification
        </span>
        <div className="w-8 border-t border-gray-400"></div>
        <span
          className={`ml-4 cursor-pointer ${step === 3 ? "highlight font-bold" : "out-focus"}`}
          onClick={() => setStep(3)}
        >
          Creation
        </span>
      </div>
      {validationErrors.length > 0 && (
        <div className="mb-4 text-red-600">
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>*{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={submit} encType="multipart/form-data">
        {step === 1 && (
          <>
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

            {/* Contact Information */}
            <div className="mt-4">
              <InputLabel
                htmlFor="contact_information"
                value="Contact Information"
                required={true}
              />
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

            {/* Date of Birth */}
            <div className="mt-4">
              <InputLabel htmlFor="date_of_birth" value="Date of Birth" required={true} />
              <TextInput
                id="date_of_birth"
                type="date"
                name="date_of_birth"
                value={data.date_of_birth}
                className="mt-1 block w-full"
                onChange={(e) => setData("date_of_birth", e.target.value)}
                required
              />
              <InputError message={errors.date_of_birth} className="mt-2" />
            </div>

            {/* Nationality */}
            <div className="mt-4">
              <InputLabel htmlFor="nationality" value="Nationality" required={true} />
              <TextInput
                id="nationality"
                type="text"
                name="nationality"
                value={data.nationality}
                className="mt-1 block w-full"
                onChange={(e) => setData("nationality", e.target.value)}
                required
              />
              <InputError message={errors.nationality} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center justify-end">
              <PrimaryButton className="ms-4" onClick={() => setStep(2)}>
                Next
              </PrimaryButton>
            </div>
          </>
        )}
        {step === 2 && (
          <>
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

            {/* ID Upload */}
            <div className="mt-4">
              <InputLabel htmlFor="id_upload" value="ID Upload" required={true} />
              <div className="mt-2 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="h-212 w-337 overflow-hidden bg-gray-100"
                    style={{ padding: "20px" }}
                  >
                    {data.id_preview_image ? (
                      <img
                        src={data.id_preview_image}
                        alt="ID Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-center text-gray-400">Upload ID</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="id_upload"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={handleIdChange}
                    accept="image/*"
                  />
                </div>
              </div>
              <InputError message={errors.id_upload} className="mt-2" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <PrimaryButton className="ms-4" onClick={() => setStep(1)}>
                Back
              </PrimaryButton>
              <PrimaryButton className="ms-4" onClick={() => setStep(3)}>
                Next
              </PrimaryButton>
            </div>
          </>
        )}
        {step === 3 && (
          <>
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
              <InputLabel
                htmlFor="password_confirmation"
                value="Confirm Password"
                required={true}
              />
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

            <div className="mt-4 flex items-center justify-between">
              <PrimaryButton className="ms-4" onClick={() => setStep(2)}>
                Back
              </PrimaryButton>
              <PrimaryButton className="ms-4" disabled={processing}>
                Register
              </PrimaryButton>
            </div>
          </>
        )}
      </form>
    </GuestLayout>
  );
}
