import DateInput from "@/Components/DateInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PassInput from "@/Components/PassInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { showToast } from "@/utils/displayFunctions";
import { clearFieldError } from "@/utils/formFunctions";
import { validateDateIsBeforeToday } from "@/utils/validationRules";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EmployeeForm() {
  const [errors, setErrors] = useState({});
  const blankData = {
    // Basic Information
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    birth_date: "",
    nationality: "",

    // Contact Information
    phone_number: "",
    email: "",
    street: "",
    barangay: "",
    city: "",
    province: "",

    // Account Creation
    password: "",
    role: "employee",
  };

  const {
    data,
    setData,
    post,
    errors: serverErrors,
    setError: setServerError,
  } = useForm(blankData);

  const validate = (data) => {
    const errors = {};
    // Basic Information validation
    if (!data.first_name) errors.first_name = "First name is required";
    if (!data.last_name) errors.last_name = "Last name is required";
    if (!data.gender) errors.gender = "Gender is required";
    if (!data.birth_date) errors.birth_date = "Birth date is required";
    else if (!validateDateIsBeforeToday(data.birth_date))
      errors.birth_date = "The date must be a date before today.";
    if (!data.nationality) errors.nationality = "Nationality is required";
    // Contact Information validation
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.phone_number) {
      errors.phone_number = "Phone number is required";
    } else if (!/^09\d{9}$/.test(data.phone_number)) {
      errors.phone_number = "Invalid phone number format (e.g., 09xxxxxxxxx)";
    }
    // Address validation
    if (!data.street) errors.street = "Street is required";
    if (!data.barangay) errors.barangay = "Barangay is required";
    if (!data.city) errors.city = "City is required";
    if (!data.province) errors.province = "Province is required";
    // Password validation
    if (!data.password) errors.password = "Password is required";
    if (!data.role) errors.role = "Role is required";

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedData = {
      first_name: data.first_name?.trim(),
      middle_name: data.middle_name?.trim(),
      last_name: data.last_name?.trim(),
      gender: data.gender,
      birth_date: data.birth_date,
      nationality: data.nationality,
      email: data.email?.trim(),
      phone_number: data.phone_number?.trim(),
      street: data.street?.trim(),
      barangay: data.barangay?.trim(),
      city: data.city?.trim(),
      province: data.province?.trim(),
      password: data.password,
      role: data.role,
    };
    setData(trimmedData);

    // Validation
    const { isValid, errors: validationErrors } = validate(trimmedData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // Register
    const formData = new FormData();
    Object.keys(trimmedData).forEach((key) => {
      if (trimmedData[key] !== null) {
        formData.append(key, trimmedData[key]);
      }
    });

    post(route("register.employee"), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        showToast("success", "Employee successfully registered!");
      },
    });
  };

  return (
    <AuthenticatedLayout header={<h2>Employee Form</h2>}>
      <Head title="Employee Form" />
      <div className="mx-auto my-10 max-w-4xl rounded-lg bg-white bg-opacity-60 p-8 shadow-lg">
        <form onSubmit={handleSubmit}>
          {/* BASIC INFORMATION */}
          <h3 className="text-md font-bold text-green-900">Basic Information</h3>
          <div className="form-group flex flex-col gap-4 md:flex-row">
            {/* First Name */}
            <div className="flex-1">
              <InputLabel htmlFor="first_name" value="First Name" required={true} />
              <TextInput
                id="first_name"
                type="text"
                className="mt-1 block w-full"
                value={data.first_name}
                onChange={(e) => {
                  setData("first_name", e.target.value);
                  clearFieldError("first_name", setErrors);
                  setServerError("first_name", "");
                }}
                placeholder="First Name"
                isFocused
                autoComplete="first_name"
              />
              <InputError message={errors.first_name || serverErrors.first_name} />
            </div>
            {/* Middle Name */}
            <div className="flex-1">
              <InputLabel htmlFor="middle_name" value="Middle Name" />
              <TextInput
                id="middle_name"
                type="text"
                className="mt-1 block w-full"
                value={data.middle_name}
                onChange={(e) => {
                  setData("middle_name", e.target.value);
                  clearFieldError("middle_name", setErrors);
                  setServerError("middle_name", "");
                }}
                placeholder="Middle Name"
                autoComplete="middle_name"
              />
              <InputError
                className="mt-1"
                message={errors.middle_name || serverErrors.middle_name}
              />
            </div>
          </div>
          <div className="form-group flex flex-col gap-4 md:flex-row">
            {/* Last Name */}
            <div className="flex-1">
              <InputLabel htmlFor="last_name" value="Last Name" required={true} />
              <TextInput
                id="last_name"
                type="text"
                className="mt-1 block w-full"
                value={data.last_name}
                onChange={(e) => {
                  setData("last_name", e.target.value);
                  clearFieldError("last_name", setErrors);
                  setServerError("last_name", "");
                }}
                placeholder="Last Name"
                autoComplete="last_name"
              />
              <InputError className="mt-1" message={errors.last_name || serverErrors.last_name} />
            </div>
            {/* Gender */}
            <div className="flex-1">
              <InputLabel htmlFor="gender" value="Gender" required={true} />
              <SelectInput
                id="gender"
                className="mt-1 block w-full"
                value={data.gender}
                onChange={(e) => {
                  setData("gender", e.target.value);
                  clearFieldError("gender", setErrors);
                  setServerError("gender", "");
                }}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </SelectInput>
              <InputError className="mt-1" message={errors.gender || serverErrors.gender} />
            </div>
          </div>
          <div className="form-group flex flex-col gap-4 md:flex-row">
            {/* Birth Date */}
            <div className="flex-1">
              <InputLabel htmlFor="birth_date" value="Birth Date" required={true} />
              <DateInput
                id="birth_date"
                className="mt-1 block w-full"
                value={data.birth_date}
                onChange={(e) => {
                  setData("birth_date", e.target.value);
                  clearFieldError("birth_date", setErrors);
                  setServerError("birth_date", "");
                }}
              />
              <InputError className="mt-1" message={errors.birth_date || serverErrors.birth_date} />
            </div>
            {/* Nationality*/}
            <div className="flex-1">
              <InputLabel htmlFor="nationality" value="Nationality" required={true} />
              <SelectInput
                id="nationality"
                className="mt-1 block w-full"
                value={data.nationality}
                onChange={(e) => {
                  setData("nationality", e.target.value);
                  clearFieldError("nationality", setErrors);
                  setServerError("nationality", "");
                }}
              >
                <option value="" disabled>
                  Select Nationality
                </option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="Korea">Korea</option>
                <option value="Philippines">Philippines</option>
                <option value="United States">United States</option>
                {/* Add more nationalities as needed */}
              </SelectInput>
              <InputError
                className="mt-1"
                message={errors.nationality || serverErrors.nationality}
              />
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <h3 className="text-md font-bold text-green-900">Contact Information</h3>
          <div className="form-group flex flex-col gap-4 md:flex-row">
            {/* Email */}
            <div className="flex-1">
              <InputLabel htmlFor="email" value="Email Addresss" required={true} />
              <TextInput
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => {
                  setData("email", e.target.value);
                  clearFieldError("email", setErrors);
                  setServerError("email", "");
                }}
                placeholder="Email Address"
                autoComplete="email"
              />
              <InputError className="mt-1" message={errors.email || serverErrors.email} />
            </div>
            {/* Phone Number */}
            <div className="flex-1">
              <InputLabel htmlFor="phone_number" value="Phone Number" required={true} />
              <TextInput
                id="phone_number"
                type="text"
                className="mt-1 block w-full"
                value={data.phone_number}
                onChange={(e) => {
                  setData("phone_number", e.target.value);
                  clearFieldError("phone_number", setErrors);
                  setServerError("phone_number", "");
                }}
                placeholder="09xxxxxxxxx"
              />
              <InputError
                className="mt-2"
                message={errors.phone_number || serverErrors.phone_number}
              />
            </div>
          </div>
          <div className="form-group flex flex-col gap-4 md:flex-row">
            {/* Street */}
            <div className="flex-1">
              <InputLabel htmlFor="street" value="Street" required={true} />
              <TextInput
                id="street"
                type="text"
                className="mt-1 block w-full"
                value={data.street}
                onChange={(e) => {
                  setData("street", e.target.value);
                  clearFieldError("street", setErrors);
                  setServerError("street", "");
                }}
                placeholder="Street"
              />
              <InputError className="mt-1" message={errors.street || serverErrors.street} />
            </div>
            {/* Barangay */}
            <div className="flex-1">
              <InputLabel htmlFor="barangay" value="Barangay" required={true} />
              <TextInput
                id="barangay"
                type="text"
                className="mt-1 block w-full"
                value={data.barangay}
                onChange={(e) => {
                  setData("barangay", e.target.value);
                  clearFieldError("barangay", setErrors);
                  setServerError("barangay", "");
                }}
                placeholder="Barangay (e.g., 143)"
              />
              <InputError className="mt-1" message={errors.barangay || serverErrors.barangay} />
            </div>
          </div>
          <div className="form-group flex flex-col gap-4 md:flex-row">
            {/* City */}
            <div className="flex-1">
              <InputLabel htmlFor="city" value="City" required={true} />
              <TextInput
                id="city"
                type="text"
                className="mt-1 block w-full"
                value={data.city}
                onChange={(e) => {
                  setData("city", e.target.value);
                  clearFieldError("city", setErrors);
                  setServerError("city", "");
                }}
                placeholder="City"
              />
              <InputError className="mt-1" message={errors.city || serverErrors.city} />
            </div>
            {/* Province */}
            <div className="flex-1">
              <InputLabel htmlFor="province" value="Province" required={true} />
              <TextInput
                id="province"
                type="text"
                className="mt-1 block w-full"
                value={data.province}
                onChange={(e) => {
                  setData("province", e.target.value);
                  clearFieldError("province", setErrors);
                  setServerError("province", "");
                }}
                placeholder="Province"
              />
              <InputError className="mt-1" message={errors.province || serverErrors.province} />
            </div>
          </div>
          {/* ACCOUNT INFORMATION */}
          <h3 className="text-md font-bold text-green-900">Account Information</h3>
          <div className="form-group flex flex-col gap-4 md:flex-row">
            {/* Password */}
            <div className="flex-1">
              <InputLabel htmlFor="password" value="Password" required={true} />
              <PassInput
                id="password"
                className="mt-1 block w-full"
                value={data.password}
                onChange={(e) => {
                  setData("password", e.target.value);
                  clearFieldError("password", setErrors);
                  setServerError("password", "");
                }}
                placeholder="Password"
              />
              <InputError message={errors.password || serverErrors.password} />
            </div>
            {/* Role */}
            <div className="flex-1">
              <InputLabel htmlFor="role" value="Role" required={true} />
              <SelectInput
                id="role"
                className="mt-1 block w-full"
                value={data.role}
                onChange={(e) => {
                  setData("role", e.target.value);
                  clearFieldError("role", setErrors);
                  setServerError("role", "");
                }}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </SelectInput>
              <InputError className="mt-1" message={errors.role || serverErrors.role} />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <PrimaryButton type="submit">
              <strong>Submit</strong>
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => (window.location.href = "/dashboard")}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
