import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TertiaryButton from "@/Components/TertiaryButton";
import TextInput from "@/Components/TextInput";
import MemberLayout from "@/Layouts/MemberLayout";
import { numberWithCommas, showToast } from "@/utils/displayFunctions";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function LoanApplicationForm({ loanTypes }) {
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({});
  const [showOtherPurpose, setShowOtherPurpose] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState(null);
  const [estimationData, setEstimationData] = useState({
    interestRate: 0,
    monthlyPayment: 0,
    totalPayback: 0,
    approvalDate: "",
    disbursementDate: "",
    firstPaymentDate: "",
    finalDueDate: "",
  });

  const blankData = {
    loan_type_id: "",
    loan_amount: "",
    loan_term_period: "",
    loan_term_unit: "months",
    interest_rate: "",
    purpose: "",
    purpose_details: "",
    loan_files: [],
    agree: false,
  };

  const {
    data,
    setData,
    post,
    errors: serverErrors,
    setError: setServerError,
  } = useForm(blankData);

  // Handle loan type selection and set defaults
  const handleLoanTypeSelect = (loanType) => {
    setSelectedLoanType(loanType);
    setData({
      ...data,
      loan_type_id: loanType.loan_type_id,
      loan_amount: loanType.min_loan_amount,
      interest_rate: loanType.default_interest_rate,
      loan_term_unit: loanType.default_loan_term_unit,
      loan_term_period: loanType.default_loan_term_period,
    });
    setErrors({
      ...errors,
      loan_type_id: "",
      loan_amount: "",
      interest_rate: "",
      loan_term_unit: "",
      loan_term_period: "",
    });
    setServerError("loan_type_id", "");
    setServerError("loan_amount", "");
    setServerError("interest_rate", "");
    setServerError("loan_term_unit", "");
    setServerError("loan_term_period", "");
  };

  // File handling functions
  const handleFileButtonClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const MAX_FILES = 5;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Check maximum files
    if (files.length > MAX_FILES) {
      showToast("error", `Maximum ${MAX_FILES} files allowed`);
      return;
    }

    const invalidFiles = [];
    const validFiles = files.filter((file) => {
      const isValidType = file.type.match(/^(image\/(jpeg|png|jpg)|application\/pdf)$/);
      const isValidSize =
        file.type === "application/pdf"
          ? file.size <= 10 * 1024 * 1024 // 10MB for PDF
          : file.size <= 2 * 1024 * 1024; // 2MB for images
      if (!isValidType || !isValidSize) {
        invalidFiles.push({
          name: file.name,
          reason: !isValidType ? "Invalid file type" : "File too large",
        });
        return false;
      }
      return true;
    });

    // Show errors for invalid files
    invalidFiles.forEach((file) => {
      showToast("error", `${file.name}: ${file.reason}`);
    });

    if (validFiles.length > 0) {
      setData("loan_files", validFiles);
      setErrors((prevErrors) => ({ ...prevErrors, loan_files: "" }));
      setServerError("loan_files", "");
      // Create previews for valid files
      validFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews((prev) => ({
              ...prev,
              [file.name]: reader.result,
            }));
          };
          reader.readAsDataURL(file);
        } else {
          setPreviews((prev) => ({
            ...prev,
            [file.name]: "PDF Document",
          }));
        }
      });
    }
  };

  // Validation for loan amount range
  const validateLoanAmount = (amount) => {
    if (!selectedLoanType) return true;
    const numAmount = Number(amount);
    if (
      numAmount < selectedLoanType.min_loan_amount ||
      numAmount > selectedLoanType.max_loan_amount
    ) {
      showToast(
        "error",
        `Loan amount must be between ₱${selectedLoanType.min_loan_amount.toLocaleString()} and ₱${selectedLoanType.max_loan_amount.toLocaleString()}`
      );
      return false;
    }
    return true;
  };

  // Update loan amount handler
  const handleLoanAmountChange = (e) => {
    const amount = e.target.value;
    if (validateLoanAmount(amount)) {
      setData("loan_amount", amount);
      setErrors({ ...errors, loan_amount: "" });
      setServerError("loan_amount", "");
    }
  };

  // Purpose handling
  const handlePurposeChange = (e) => {
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      purpose: value,
      purpose_details: value === "Others" ? prevData.purpose_details : "",
    }));
    setShowOtherPurpose(value === "Others");
    setErrors((prevErrors) => ({ ...prevErrors, purpose: "" }));
    setServerError("purpose", "");
  };

  // Calculate estimation data
  const calculateEstimation = (formData) => {
    if (
      !formData.loan_type_id ||
      !formData.loan_amount ||
      !formData.loan_term_period ||
      !formData.loan_term_unit
    ) {
      return;
    }

    const selectedLoanType = loanTypes.find((lt) => lt.loan_type_id === formData.loan_type_id);
    if (!selectedLoanType) return;

    const totalAmount = parseFloat(formData.loan_amount);
    const interestRate = parseFloat(formData.interest_rate);
    const monthlyInterest = interestRate / 12 / 100;
    const numberOfPayments = parseInt(formData.loan_term_period);

    // Calculate monthly payment using amortization formula
    const monthlyPayment = selectedLoanType.is_amortized
      ? (totalAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) /
        (Math.pow(1 + monthlyInterest, numberOfPayments) - 1)
      : totalAmount * (1 + interestRate / 100);

    const totalPayback = selectedLoanType.is_amortized
      ? monthlyPayment * numberOfPayments
      : totalAmount * (1 + interestRate / 100);

    // Calculate dates
    const today = new Date();
    const approvalDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
    const disbursementDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    const firstPaymentDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    const finalDueDate = new Date(today.getTime() + numberOfPayments * 30 * 24 * 60 * 60 * 1000);

    setEstimationData({
      interestRate,
      monthlyPayment,
      totalPayback,
      approvalDate: approvalDate.toLocaleDateString(),
      disbursementDate: disbursementDate.toLocaleDateString(),
      firstPaymentDate: firstPaymentDate.toLocaleDateString(),
      finalDueDate: finalDueDate.toLocaleDateString(),
    });
  };

  useEffect(() => {
    calculateEstimation(data);
  }, [
    data.loan_type_id,
    data.loan_amount,
    data.loan_term_period,
    data.loan_term_unit,
    data.interest_rate,
  ]);

  // Validation
  const validate = (data) => {
    const errors = {};

    if (!data.loan_type_id) errors.loan_type_id = "Loan type is required";
    if (!data.loan_amount) errors.loan_amount = "Loan amount is required";
    if (!data.loan_term_period) errors.loan_term_period = "Loan term is required";
    if (!data.purpose) errors.purpose = "Purpose is required";
    else if (data.purpose === "Others" && !data.purpose_details)
      errors.purpose = "Please specify purpose";
    if (!data.loan_files || data.loan_files.length === 0) {
      errors.loan_files = "At least one supporting document is required";
    }
    if (!data.agree) errors.agree = "You must agree to the terms of service and privacy policy.";

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission started");
    console.log("Form data:", data);

    const { isValid, errors: validationErrors } = validate(data);
    console.log("Validation result:", { isValid, errors: validationErrors });

    if (!isValid) {
      console.log("Validation failed:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "loan_files") {
        for (let i = 0; i < data.loan_files.length; i++) {
          formData.append(`loan_files[]`, data.loan_files[i]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    console.log("Submitting form with data:", Object.fromEntries(formData));

    post(route("loan.store"), {
      data: formData,
      forceFormData: true,
      onSuccess: (response) => {
        console.log("Response: ", response);
        showToast("success", "Loan application submitted successfully");

        // Store summary data in localStorage before redirect
        const loan = response?.props?.flash?.messsage?.loan || {};
        const selectedLoanTypeDetails = loanTypes.find(
          (lt) => lt.loan_type_id === data.loan_type_id
        );
        const summaryData = {
          accountName: `${response.props.auth.user.first_name} ${response.props.auth.user.last_name}`,
          loanType: selectedLoanTypeDetails.loan_type_name,
          purpose: data.purpose,
          purposeDetails: data.purpose_details,
          loanAmount: parseFloat(data.loan_amount),
          interestRate: estimationData.interestRate,
          loanTerm: `${data.loan_term_period} ${data.loan_term_unit}`,
          monthlyPayment: estimationData.monthlyPayment,
          numberOfPayments: parseInt(data.loan_term_period),
          totalPayback: estimationData.totalPayback,
          estimatedApprovalDate: estimationData.approvalDate,
          estimatedDisbursementDate: estimationData.disbursementDate,
          estimatedFirstPaymentDate: estimationData.firstPaymentDate,
          estimatedFinalDueDate: estimationData.finalDueDate,
          referenceNumber: `L-${String(loan?.loan_id).padStart(7, "0")}`,
          createdAt: loan?.created_at,
        };
        console.log("Summary Data:", summaryData);
        localStorage.setItem("loanSummary", JSON.stringify(summaryData));

        // Redirect to success page
        // window.location.href = route("success.loan");
      },
      onError: (errors) => {
        console.error("Form submission failed:", errors);
        showToast("error", "Failed to submit loan application. Please try again.");
      },
    });
  };

  return (
    <MemberLayout
      header={
        <div className="flex items-center justify-between gap-2 sm:flex-row">
          <h2>Loan Application Form</h2>
          <TertiaryButton
            onClick={() => (window.location.href = "/member-dashboard")}
            className="whitespace-nowrap"
          >
            <a href={route("member.dashboard")} className="text-sm">
              <i className="fa-solid fa-chevron-left mr-2"></i> Back
            </a>
          </TertiaryButton>
        </div>
      }
    >
      <Head title="Loan Application Form" />
      <div className="w-90 mx-auto my-5 flex flex-col justify-center lg:flex-row">
        {/* Application Form */}
        <div className="my-3 flex max-w-4xl flex-grow self-stretch bg-white bg-opacity-60 p-8 shadow-lg sm:mx-5 md:rounded-lg">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Loan Type */}
            <div className="mb-5">
              <InputLabel
                htmlFor="loan_type_id"
                value="Loan Type"
                required={true}
                className="mb-3"
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" id="loan_type_id">
                {loanTypes
                  .filter((type) => type.status === "active")
                  .map((type) => (
                    <div
                      key={type.loan_type_id}
                      className={`transform cursor-pointer rounded-lg border border-transparent bg-white p-4 ring-2 ring-green-700 transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-700/50 ${
                        data.loan_type_id === type.loan_type_id
                          ? "scale-110 border-green-500 shadow-xl shadow-green-700/50"
                          : ""
                      }`}
                      onClick={() => handleLoanTypeSelect(type)}
                    >
                      <h3 className="mb-1 text-lg font-bold text-green-900">
                        {type.loan_type_name}
                      </h3>
                      <div className="mb-1 text-sm font-bold text-gray-700">
                        <div>Min: ₱{numberWithCommas(type.min_loan_amount)}</div>
                        <div>Max: ₱{numberWithCommas(type.max_loan_amount)}</div>
                      </div>
                      <p className="mb-1 text-xs text-gray-700">{type.description}</p>
                      <p className="text-xs font-bold text-green-800">
                        {type.is_amortized ? "Amortized" : "Non-amortized"}
                      </p>
                    </div>
                  ))}
              </div>
              <InputError
                message={errors.loan_type_id || serverErrors.loan_type_id}
                className="mt-1"
              />
            </div>

            {/* Loan Amount */}
            <div className="mb-4">
              <InputLabel htmlFor="loan_amount" value="Loan Amount" required={true} />
              <TextInput
                id="loan_amount"
                type="number"
                className="mt-1 block w-full"
                value={data.loan_amount}
                onChange={handleLoanAmountChange}
                placeholder="Enter amount"
              />
              {selectedLoanType && (
                <p className="mt-1 text-sm text-gray-600">
                  Range: ₱{numberWithCommas(selectedLoanType.min_loan_amount.toLocaleString())} - ₱
                  {numberWithCommas(selectedLoanType.max_loan_amount.toLocaleString())}
                </p>
              )}
              <InputError message={errors.loan_amount || serverErrors.loan_amount} />
            </div>

            {/* Loan Term */}
            <div className="mb-4">
              <InputLabel htmlFor="loan_term_period" value="Loan Term" required={true} />
              <div className="mt-1 flex flex-col gap-[10px] md:flex-row">
                <TextInput
                  id="loan_term_period"
                  type="number"
                  className="block w-full md:w-3/4"
                  value={data.loan_term_period}
                  onChange={(e) => {
                    setData("loan_term_period", e.target.value);
                    setErrors({ ...errors, loan_term_period: "" });
                    setServerError("loan_term_period", "");
                  }}
                  placeholder="Enter term"
                />
                <SelectInput
                  className="block w-full md:w-1/4"
                  value={data.loan_term_unit}
                  onChange={(e) => setData("loan_term_unit", e.target.value)}
                >
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </SelectInput>
              </div>
              <InputError message={errors.loan_term_period || serverErrors.loan_term_period} />
            </div>

            {/* Purpose with Others option */}
            <div className="mb-4">
              <InputLabel htmlFor="purpose" value="Purpose of Loan" required={true} />
              <div className="mt-1 flex flex-col gap-[10px] md:flex-row">
                <div className="flex-1">
                  <SelectInput
                    id="purpose"
                    className="block w-full"
                    value={data.purpose}
                    onChange={handlePurposeChange}
                  >
                    <option value="">Select purpose</option>
                    <optgroup label="Personal">
                      <option value="Emergency expenses">Emergency expenses</option>
                      <option value="Education">Education</option>
                      <option value="Medical bills">Medical bills</option>
                      <option value="Travel">Travel</option>
                      <option value="Household improvements">Household improvements</option>
                    </optgroup>
                    <optgroup label="Business">
                      <option value="Startup capital">Startup capital</option>
                      <option value="Operational expenses">Operational expenses</option>
                      <option value="Equipment purchase">Equipment purchase</option>
                      <option value="Inventory">Inventory</option>
                      <option value="Marketing and advertising">Marketing and advertising</option>
                    </optgroup>
                    <option value="Others">Others</option>
                  </SelectInput>
                </div>
                {showOtherPurpose && (
                  <TextInput
                    className="block w-full flex-1"
                    placeholder="Please specify purpose"
                    value={data.purpose_details}
                    onChange={(e) => setData("purpose_details", e.target.value)}
                  />
                )}
              </div>
              <InputError message={errors.purpose || serverErrors.purpose} />
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <InputLabel htmlFor="loan_files" value="Supporting Documents" required={true} />
              <div
                className="mt-1 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => handleFileButtonClick("loan_files")}
              >
                <input
                  type="file"
                  id="loan_files"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="flex flex-col items-center">
                  <i className="fas fa-cloud-upload-alt mb-2 text-3xl text-gray-400"></i>
                  <p className="text-sm text-gray-600">
                    Drag and drop files here or click to browse
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum {MAX_FILES} files allowed. PDF (max 10MB), Images (max 2MB)
                  </p>
                </div>
              </div>

              {/* File Previews */}
              {Object.keys(previews).length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {Object.entries(previews).map(([name, preview]) => (
                    <div key={name} className="relative rounded-lg border p-2">
                      {typeof preview === "string" && preview === "PDF Document" ? (
                        <div className="flex h-20 items-center justify-center bg-gray-100">
                          <i className="fas fa-file-pdf text-2xl text-gray-400"></i>
                        </div>
                      ) : (
                        <img src={preview} alt={name} className="h-20 w-full object-cover" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newPreviews = { ...previews };
                          delete newPreviews[name];
                          setPreviews(newPreviews);
                          setData(
                            "loan_files",
                            data.loan_files.filter((f) => f.name !== name)
                          );
                        }}
                        className="absolute right-0 top-[-5px] mr-[-8px] h-[22px] w-[22px] rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <i className="fa-solid fa-xmark mt-[-5px]"></i>
                      </button>
                      <p className="mt-1 truncate text-xs text-gray-500">{name}</p>
                    </div>
                  ))}
                </div>
              )}
              <InputError message={errors.loan_files || serverErrors.loan_files} />
            </div>

            {/* Agree Checkbox */}
            <div className="mt-4 flex flex-col justify-between">
              <label className="flex items-center">
                <Checkbox
                  name="agree"
                  checked={data.agree}
                  onChange={(e) => {
                    setData("agree", e.target.checked);
                    setErrors({ ...errors, agree: "" });
                    setServerError("agree", "");
                  }}
                />
                <span className="text-black-700 ml-2 text-sm font-bold">
                  I understand and agree with
                  <Link
                    href="/terms-of-service"
                    className="ml-1 text-green-800 underline hover:text-green-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </Link>
                  &nbsp;and
                  <Link
                    href="/privacy-policy"
                    className="ml-1 text-green-800 underline hover:text-green-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <InputError message={errors.agree || serverErrors.agree} />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <PrimaryButton type="submit" className="min-w-[150px]">
                <strong>Apply</strong>
              </PrimaryButton>
              <SecondaryButton
                type="button"
                onClick={() => (window.location.href = route("home"))}
                className="min-w-[150px]"
              >
                Cancel
              </SecondaryButton>
            </div>
          </form>
        </div>
        {/* Loan Estimation */}
        <div className="my-3 flex h-full max-w-4xl flex-shrink self-stretch bg-white bg-opacity-60 p-8 shadow-lg sm:mx-5 md:rounded-lg">
          <div className="w-full">
            <p className="text-center text-lg font-bold text-green-900">Estimated Loan Details</p>
            <div className="overflow-x-auto">
              <table className="mt-2 min-w-full">
                <tbody>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">
                      Estimated Interest Rate:
                    </td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {estimationData.interestRate ? `${estimationData.interestRate}%` : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">
                      Estimated Approval Date:
                    </td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {estimationData.approvalDate || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">
                      Estimated Disbursement Date:
                    </td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {estimationData.disbursementDate || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">
                      Estimated First Payment Due Date:
                    </td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {estimationData.firstPaymentDate || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">
                      Estimated Monthly Payment:
                    </td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {estimationData.monthlyPayment
                        ? `₱${numberWithCommas(estimationData.monthlyPayment.toFixed(2))}`
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">
                      Estimated Final Due Date:
                    </td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {estimationData.finalDueDate || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm font-medium text-black">Total Due Amount:</td>
                    <td className="py-2 pl-4 text-sm text-black">
                      {estimationData.totalPayback
                        ? `₱${numberWithCommas(estimationData.totalPayback.toFixed(2))}`
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
