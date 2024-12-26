import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PassInput from "@/Components/PassInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { clearFieldError } from "@/utils/formFunctions";
import { validateStep3 } from "@/utils/validationRules";
import { useState } from "react";

const CreationForm = ({ data, setData, errors: serverErrors, onNext, onCancel, onBack }) => {
  const [errors, setErrors] = useState({});

  const handleNext = (e) => {
    e.preventDefault();

    const trimmedData = {
      ...data,
      password: data.password?.trim(),
      confirm_password: data.confirm_password?.trim(),
      security_answer_1: data.security_answer_1?.trim(),
      security_answer_2: data.security_answer_2?.trim(),
    };
    setData(trimmedData);

    // Validation
    const { isValid, errors: validationErrors } = validateStep3(trimmedData);
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

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was your first pet's name?",
    "What city were you born in?",
    "What is your favorite book?",
    "What was the name of your first school?",
  ];

  return (
    <div className="form-container">
      <div className="mb-4">
        <h3 className="text-center text-xl font-bold text-gray-900">Welcome – let's get started</h3>
        <p className="mt-1 block text-center text-sm text-gray-600">
          Tell us about your basic details and account requirements
        </p>
      </div>

      <h3 className="text-md font-medium text-gray-900">Account Information</h3>
      <div className="form-group flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <InputLabel htmlFor="password" value="Password" />
          <PassInput
            id="password"
            className="mt-1 block w-full"
            value={data.password}
            onChange={(e) => {
              setData("password", e.target.value);
              clearFieldError("password", setErrors);
            }}
            placeholder="Password"
            required
          />
          <InputError message={errors.password || serverErrors.password} />
        </div>
        <div className="flex-1">
          <InputLabel htmlFor="confirm_password" value="Confirm Password" />
          <PassInput
            id="confirm_password"
            className="mt-1 block w-full"
            value={data.confirm_password}
            onChange={(e) => {
              setData("confirm_password", e.target.value);
              clearFieldError("confirm_password", setErrors);
            }}
            placeholder="Confirm Password"
            required
          />
          <InputError message={errors.confirm_password || serverErrors.confirm_password} />
        </div>
      </div>

      <h3 className="text-md font-medium text-gray-900">Security Questions</h3>
      <div className="form-group flex flex-col gap-4 md:flex-row">
        {/* Security Question 1 */}
        <div className="flex-1">
          <InputLabel htmlFor="security_question_1" value="Security Question 1" required={true} />
          <SelectInput
            id="security_question_1"
            className="mt-1 block w-full"
            value={data.security_question_1}
            onChange={(e) => {
              setData("security_question_1", e.target.value);
              clearFieldError("security_question_1", setErrors);
            }}
            defaultValue=""
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
          <InputError
            className="mt-2"
            message={errors.security_question_1 || serverErrors.security_question_1}
          />
        </div>
        {/* Security Question 1 Answer */}
        <div className="flex-1">
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
            onChange={(e) => {
              setData("security_answer_1", e.target.value);
              clearFieldError("security_answer_1", setErrors);
            }}
            placeholder="Answer to Security Question 1"
            required
          />
          <InputError
            className="mt-2"
            message={errors.security_answer_1 || serverErrors.security_answer_1}
          />
        </div>
      </div>
      <div className="form-group flex flex-col gap-4 md:flex-row">
        {/* Security Question 2 */}
        <div className="flex-1">
          <InputLabel htmlFor="security_question_2" value="Security Question 2" required={true} />
          <SelectInput
            id="security_question_2"
            className="mt-1 block w-full"
            value={data.security_question_2}
            onChange={(e) => {
              setData("security_question_2", e.target.value);
              clearFieldError("security_question_2", setErrors);
            }}
            defaultValue=""
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
          <InputError
            className="mt-2"
            message={errors.security_question_2 || serverErrors.security_question_2}
            required={true}
          />
        </div>
        {/* Security Question 2 Answer */}
        <div className="flex-1">
          <InputLabel htmlFor="security_answer_2" value="Answer to Security Question 2" />
          <TextInput
            id="security_answer_2"
            type="text"
            className="mt-1 block w-full"
            value={data.security_answer_2}
            onChange={(e) => {
              setData("security_answer_2", e.target.value);
              clearFieldError("security_answer_2", setErrors);
            }}
            placeholder="Answer to Security Question 2"
            required
          />
          <InputError
            className="mt-2"
            message={errors.security_answer_2 || serverErrors.security_answer_2}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-[25px] flex flex-col items-center gap-4 md:flex-row">
        <div className="w-full flex-grow md:w-auto">
          <SecondaryButton onClick={onBack} className="w-full text-lg">
            Back
          </SecondaryButton>
        </div>
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

export default CreationForm;
