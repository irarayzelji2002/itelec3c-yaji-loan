import DateInput from "@/Components/DateInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
  const user = usePage().props.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    profile_picture: null,
    first_name: user.first_name || "",
    middle_name: user.middle_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    gender: user.gender || "",
    birth_date: user.birth_date || "",
    nationality: user.nationality || "",
    phone_number: user.phone_number || "",
    street: user.street || "",
    barangay: user.barangay || "",
    city: user.city || "",
    province: user.province || "",
    security_question_1: user.security_question_1 || "",
    security_question_2: user.security_question_2 || "",
    security_answer_1: user.security_answer_1 || "",
    security_answer_2: user.security_answer_2 || "",
  });

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all form fields
    Object.keys(data).forEach((key) => {
      if (key === "profile_picture" && data[key]) {
        formData.append(key, data[key]);
      } else if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    formData.append("_method", "PATCH");
    console.log("formData", formData);

    post(route("profile.update"), {
      preserveScroll: true,
      data: formData,
      forceFormData: true,
    });
  };

  // Security questions
  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was your first pet's name?",
    "What city were you born in?",
    "What is your favorite book?",
    "What was the name of your first school?",
  ];

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information here.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
        {/* BASIC INFORMATION */}
        <h3 className="text-md font-medium text-gray-900">Basic Information</h3>
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
        {/* First Name */}
        <div className="mt-4">
          <InputLabel htmlFor="first_name" value="First Name" required={true} />
          <TextInput
            id="first_name"
            type="text"
            className="mt-1 block w-full"
            value={data.first_name}
            onChange={(e) => setData("first_name", e.target.value)}
            maxLength={50}
            placeholder="First Name"
            required
            isFocused
            autoComplete="first_name"
          />
          <InputError className="mt-1" message={errors.first_name} />
        </div>
        {/* Middle Name */}
        <div className="mt-4">
          <InputLabel htmlFor="middle_name" value="Middle Name" />
          <TextInput
            id="middle_name"
            type="text"
            className="mt-1 block w-full"
            value={data.middle_name}
            maxLength={50}
            onChange={(e) => setData("middle_name", e.target.value)}
            placeholder="Middle Name"
            autoComplete="middle_name"
          />
          <InputError className="mt-1" message={errors.middle_name} />
        </div>
        {/* Last Name */}
        <div className="mt-4">
          <InputLabel htmlFor="last_name" value="Last Name" required={true} />
          <TextInput
            id="last_name"
            type="text"
            className="mt-1 block w-full"
            value={data.last_name}
            onChange={(e) => setData("last_name", e.target.value)}
            placeholder="Last Name"
            maxLength={50}
            required
            autoComplete="last_name"
          />
          <InputError className="mt-1" message={errors.last_name} />
        </div>
        {/* Gender */}
        <div className="mt-4">
          <InputLabel htmlFor="gender" value="Gender" required={true} />
          <SelectInput
            id="gender"
            className="mt-1 block w-full"
            value={data.gender}
            onChange={(e) => setData("gender", e.target.value)}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </SelectInput>
          <InputError className="mt-1" message={errors.gender} />
        </div>
        {/* Birth Date */}
        <div className="mt-4">
          <InputLabel htmlFor="birth_date" value="Birth Date" required={true} />
          <DateInput
            id="birth_date"
            className="mt-1 block w-full"
            value={data.birth_date}
            onChange={(e) => setData("birth_date", e.target.value)}
            required
          />
          <InputError className="mt-1" message={errors.birth_date} />
        </div>
        {/* Nationality*/}
        <div className="mt-4">
          <InputLabel htmlFor="nationality" value="Nationality" required={true} />
          <SelectInput
            id="nationality"
            className="mt-1 block w-full"
            value={data.nationality}
            onChange={(e) => setData("nationality", e.target.value)}
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
          <InputError className="mt-1" message={errors.nationality} />
        </div>

        {/* CONTACT INFORMATION */}
        <h3 className="text-md font-medium text-gray-900">Contact Information</h3>
        {/* Email */}
        <div>
          <InputLabel htmlFor="email" value="Email Addresss" required={true} />
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            placeholder="Email Address"
            required
            autoComplete="email"
          />
          <InputError className="mt-1" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="!rounded-lg text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
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
        {/* Phone Number */}
        <div>
          <InputLabel htmlFor="phone_number" value="Phone Number" required={true} />
          <TextInput
            id="phone_number"
            type="text"
            className="mt-1 block w-full"
            value={data.phone_number}
            onChange={(e) => setData("phone_number", e.target.value)}
            placeholder="09xxxxxxxxx"
            required
          />
          <InputError className="mt-1" message={errors.phone_number} />
        </div>
        {/* Street */}
        <div>
          <InputLabel htmlFor="street" value="Street" required={true} />
          <TextInput
            id="street"
            type="text"
            className="mt-1 block w-full"
            value={data.street}
            maxLength={100}
            onChange={(e) => setData("street", e.target.value)}
            placeholder="Street"
            required
          />
          <InputError className="mt-1" message={errors.street} />
        </div>
        {/* Barangay */}
        <div>
          <InputLabel htmlFor="barangay" value="Barangay" required={true} />
          <TextInput
            id="barangay"
            type="text"
            className="mt-1 block w-full"
            value={data.barangay}
            maxLength={50}
            onChange={(e) => setData("barangay", e.target.value)}
            placeholder="Barangay"
            required
          />
          <InputError className="mt-1" message={errors.barangay} />
        </div>
        {/* City */}
        <div>
          <InputLabel htmlFor="city" value="City" required={true} />
          <TextInput
            id="city"
            type="text"
            className="mt-1 block w-full"
            maxLength={50}
            value={data.city}
            onChange={(e) => setData("city", e.target.value)}
            placeholder="City"
            required
          />
          <InputError className="mt-1" message={errors.city} />
        </div>
        {/* Province */}
        <div>
          <InputLabel htmlFor="province" value="Province" required={true} />
          <TextInput
            id="province"
            type="text"
            maxLength={50}
            className="mt-1 block w-full"
            value={data.province}
            onChange={(e) => setData("province", e.target.value)}
            placeholder="Province"
            required
          />
          <InputError className="mt-1" message={errors.province} />
        </div>

        {/* SECURITY QUESTION */}
        <h3 className="text-md font-medium text-gray-900">Security Questions</h3>
        {/* Security Question 1 */}
        <div className="mt-4">
          <InputLabel htmlFor="security_question_1" value="Security Question 1" required={true} />
          <SelectInput
            id="security_question_1"
            className="mt-1 block w-full"
            value={data.security_question_1}
            onChange={(e) => setData("security_question_1", e.target.value)}
            required
          >
            <option value="" disabled>
              Select Security Question
            </option>
            {securityQuestions.map((question, index) => (
              <option key={index} value={question} disabled={question === data.security_question_2}>
                {question}
              </option>
            ))}
          </SelectInput>
          <InputError className="mt-1" message={errors.security_question_1} />
        </div>
        {/* Security Question 1 Answer */}
        <div className="mt-4">
          <InputLabel
            htmlFor="security_answer_1"
            value="Answer to Security Question 1"
            required={true}
          />
          <TextInput
            id="security_answer_1"
            type="text"
            className="mt-1 block w-full"
            value={data.security_answer_1}
            onChange={(e) => setData("security_answer_1", e.target.value)}
            placeholder="Answer to Security Question 1"
            required
          />
          <InputError className="mt-1" message={errors.security_answer_1} />
        </div>
        {/* Security Question 2 */}
        <div className="mt-4">
          <InputLabel htmlFor="security_question_2" value="Security Question 2" required={true} />
          <SelectInput
            id="security_question_2"
            className="mt-1 block w-full"
            value={data.security_question_2}
            onChange={(e) => setData("security_question_2", e.target.value)}
            required
          >
            <option value="" disabled>
              Select Security Question
            </option>
            {securityQuestions.map((question, index) => (
              <option key={index} value={question} disabled={question === data.security_question_1}>
                {question}
              </option>
            ))}
          </SelectInput>
          <InputError className="mt-1" message={errors.security_question_2} required={true} />
        </div>
        {/* Security Question 2 Answer */}
        <div className="mt-4">
          <InputLabel htmlFor="security_answer_2" value="Answer to Security Question 2" />
          <TextInput
            id="security_answer_2"
            type="text"
            className="mt-1 block w-full"
            value={data.security_answer_2}
            onChange={(e) => setData("security_answer_2", e.target.value)}
            placeholder="Answer to Security Question 2"
            required
          />
          <InputError className="mt-1" message={errors.security_answer_2} />
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
