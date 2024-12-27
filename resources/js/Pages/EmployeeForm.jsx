import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function EmployeeForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!firstName) validationErrors.firstName = "First name is required";
    if (!lastName) validationErrors.lastName = "Last name is required";
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    if (!gender) validationErrors.gender = "Gender is required";
    if (!birthDate) validationErrors.birthDate = "Birth date is required";
    if (!nationality) validationErrors.nationality = "Nationality is required";
    if (!phoneNumber) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (!phoneNumber.startsWith("09")) {
      validationErrors.phoneNumber = "Phone number should start with 09";
    }
    if (!street) validationErrors.street = "Street is required";
    if (!barangay) validationErrors.barangay = "Barangay is required";
    if (!city) validationErrors.city = "City is required";
    if (!province) validationErrors.province = "Province is required";
    if (!role) validationErrors.role = "Role is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed to submit
    window.location.href = "/success-employee";
  };

  return (
    <AuthenticatedLayout>
      <Head title="Employee Form" />
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-green-900">Employee Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                maxLength="50"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((prev) => ({ ...prev, firstName: "" }));
                }}
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                maxLength="50"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((prev) => ({ ...prev, lastName: "" }));
                }}
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                maxLength="100"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                maxLength="50"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="gender">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setErrors((prev) => ({ ...prev, gender: "" }));
                }}
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="birthDate">
                Birth Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="birthDate"
                maxLength="10"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter birth date"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setErrors((prev) => ({ ...prev, birthDate: "" }));
                }}
              />
              {errors.birthDate && <p className="text-sm text-red-500">{errors.birthDate}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="nationality">
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nationality"
                maxLength="30"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter nationality"
                value={nationality}
                onChange={(e) => {
                  setNationality(e.target.value);
                  setErrors((prev) => ({ ...prev, nationality: "" }));
                }}
              />
              {errors.nationality && <p className="text-sm text-red-500">{errors.nationality}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="phoneNumber">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phoneNumber"
                maxLength="15"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter phone number (Ex. 09123456789)"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                }}
              />
              {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="street">
                Street <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="street"
                maxLength="100"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter street"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  setErrors((prev) => ({ ...prev, street: "" }));
                }}
              />
              {errors.street && <p className="text-sm text-red-500">{errors.street}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="barangay">
                Barangay <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="barangay"
                maxLength="50"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter barangay"
                value={barangay}
                onChange={(e) => {
                  setBarangay(e.target.value);
                  setErrors((prev) => ({ ...prev, barangay: "" }));
                }}
              />
              {errors.barangay && <p className="text-sm text-red-500">{errors.barangay}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="city">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                maxLength="50"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors((prev) => ({ ...prev, city: "" }));
                }}
              />
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="province">
                Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="province"
                maxLength="50"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter province"
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setErrors((prev) => ({ ...prev, province: "" }));
                }}
              />
              {errors.province && <p className="text-sm text-red-500">{errors.province}</p>}
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="role">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setErrors((prev) => ({ ...prev, role: "" }));
                }}
              >
                <option value="">Select role</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div>
            <div className="flex justify-center gap-4">
              <PrimaryButton
                type="submit"
                className="!rounded-lg bg-green-700 px-6 py-2 font-bold text-black hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
              >
                <strong>Submit</strong>
              </PrimaryButton>

              <SecondaryButton
                type="button"
                className="!rounded-lg border-2 border-green-700 bg-white px-6 py-2 font-bold text-black hover:bg-green-100 focus:outline-none focus:ring focus:ring-green-700"
                onClick={() => (window.location.href = "/")}
              >
                Cancel
              </SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
