import DateInput from "@/Components/DateInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { clearFieldError } from "@/utils/formFunctions";
import { validateStep1 } from "@/utils/validationRules";
import { useState } from "react";

const IdentificationForm = ({
  data,
  setData,
  errors: serverErrors,
  setError: setServerError,
  onNext,
  onCancel,
}) => {
  const [errors, setErrors] = useState({});

  const handleNext = (e) => {
    e.preventDefault();

    const trimmedData = {
      ...data,
      first_name: data.first_name?.trim(),
      middle_name: data.middle_name?.trim(),
      last_name: data.last_name?.trim(),
      email: data.email?.trim(),
      phone_number: data.phone_number?.trim(),
      street: data.street?.trim(),
      barangay: data.barangay?.trim(),
      city: data.city?.trim(),
      province: data.province?.trim(),
    };
    setData(trimmedData);

    // Validation
    const { isValid, errors: validationErrors } = validateStep1(trimmedData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onNext();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="form-container">
      <div className="mb-4">
        <h3 className="text-center text-xl font-bold text-gray-900">Welcome – let's get started</h3>
        <p className="mt-1 block text-center text-sm text-gray-600">
          Tell us about your basic details and account requirements
        </p>
      </div>

      {/* BASIC INFORMATION */}
      <h3 className="text-md font-bold text-gray-900">Basic Information</h3>
      <div className="space-y-4">
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
              required
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
            <InputError className="mt-1" message={errors.middle_name || serverErrors.middle_name} />
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
              required
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
              required
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
              required
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
              required
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
            <InputError className="mt-1" message={errors.nationality || serverErrors.nationality} />
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <h3 className="text-md font-bold text-gray-900">Contact Information</h3>
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
            />
            <InputError className="mt-1" message={errors.province || serverErrors.province} />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-[25px] flex flex-col items-center gap-4 md:flex-row">
        <div className="w-full flex-grow md:w-auto">
          <SecondaryButton onClick={handleCancel} className="w-full text-lg">
            Cancel
          </SecondaryButton>
        </div>
        <div className="w-full flex-grow md:w-auto">
          <PrimaryButton onClick={handleNext} className="w-full text-lg">
            Next
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default IdentificationForm;
