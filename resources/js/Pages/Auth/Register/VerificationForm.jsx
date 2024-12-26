import DottedButton from "@/Components/DottedButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import { clearFieldError } from "@/utils/formFunctions";
import { validateStep2 } from "@/utils/validationRules";
import { useState } from "react";

const VerificationForm = ({
  data,
  setData,
  errors: serverErrors,
  onNext,
  onCancel,
  onBack,
  verificationTypes = [],
  selectedType,
  setSelectedType,
  previews,
  setPreviews,
}) => {
  const [errors, setErrors] = useState({});

  const handleVerificationTypeChange = (e) => {
    const selectedValidId = e.target.value;
    const selected = verificationTypes.find((type) => type.valid_id === selectedValidId);
    setSelectedType(selected);
    setData("verification_type", selectedValidId);
    clearFieldError("verification_type", setErrors);
  };

  const handleNext = (e) => {
    e.preventDefault();

    const trimmedData = {
      ...data,
      verification_type: data.verification_type?.trim(),
    };
    setData(trimmedData);

    // Validation
    const { isValid, errors: validationErrors } = validateStep2(trimmedData, selectedType);
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

  const handleFileButtonClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length) {
      // Create a synthetic event object
      const event = {
        target: {
          files: files,
        },
      };
      handleFileChange(field)(event);
    }
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    setData(field, file);
    clearFieldError(field, setErrors);
    const hasError = handleValidation(field, file);
    if (!hasError) handlePreview(file, field);
  };

  const handleValidation = (field, file) => {
    let hasError = false;

    if (field === "id_photo_front" || field === "id_photo_back" || field === "selfie_photo") {
      if (!file) {
        setErrors((prev) => ({
          ...prev,
          [field]: `${field.replace(/_/g, " ")} is required`,
        }));
        hasError = true;
      } else if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [field]: "File must be in JPEG, JPG, or PNG format",
        }));
        hasError = true;
      } else if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [field]: "File size must not exceed 2MB",
        }));
        hasError = true;
      }
    } else if (field === "id_file") {
      if (!file) {
        setErrors((prev) => ({
          ...prev,
          [field]: "PDF file is required",
        }));
        hasError = true;
      } else if (file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          [field]: "File must be in PDF format",
        }));
        hasError = true;
      } else if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [field]: "File size must not exceed 10MB",
        }));
        hasError = true;
      }
    }
    return hasError;
  };

  const handlePreview = (file, field) => {
    if (!file) {
      setPreviews((prev) => ({
        ...prev,
        [field]: null,
      }));
      return;
    }

    // Create preview URL for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({
          ...prev,
          [field]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      // For PDFs, show the filename
      setPreviews((prev) => ({
        ...prev,
        [field]: file.name || "PDF File",
      }));
    }
  };

  return (
    <div className="form-container">
      <div className="mb-4">
        <h3 className="text-center text-xl font-bold text-gray-900">Welcome – let's get started</h3>
        <p className="mt-1 block text-center text-sm text-gray-600">
          Tell us about your basic details and account requirements
        </p>
      </div>

      <h3 className="text-md font-bold text-gray-900">Identity Verification</h3>
      {/* <input placeholder="Choose a verification process *" />
      <input placeholder="Enter your OTP *" />
      <input placeholder="How would you like to verify? *" /> */}

      <div className="mb-4 mt-4">
        <InputLabel htmlFor="verification_type" value="Valid ID" required={true} />
        <SelectInput
          id="verification_type"
          className="mt-1 block w-full"
          value={data.verification_type}
          onChange={handleVerificationTypeChange}
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a Valid ID
          </option>
          {verificationTypes.map((type) => (
            <option key={type.id} value={type.valid_id}>
              {type.valid_id}
            </option>
          ))}
        </SelectInput>
        <InputError
          className="mt-2"
          message={errors.verification_type || serverErrors.verification_type}
        />
      </div>

      <InputLabel value="Attach your ID" required={true} className="mb-2" />
      {selectedType && (
        <div className="form-group flex flex-col gap-4 md:flex-row">
          {/* Front of ID */}
          {!!(selectedType?.has_front && !selectedType?.is_pdf) && (
            <div className="flex-1">
              <input
                type="file"
                id="id_photo_front"
                name="id_photo_front"
                onChange={handleFileChange("id_photo_front")}
                style={{ display: "none" }}
                accept=".jpeg, .jpg, .png"
              />
              <DottedButton
                onClick={() => handleFileButtonClick("id_photo_front")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "id_photo_front")}
                className="flex min-h-[80px] w-full flex-col items-center justify-center"
              >
                {previews.id_photo_front ? (
                  <div className="relative h-full min-h-[80px] w-full">
                    <img
                      src={previews.id_photo_front}
                      alt="ID Front Preview"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviews((prev) => ({ ...prev, id_photo_front: null }));
                        setData("id_photo_front", null);
                      }}
                      className="absolute right-0 top-0 mr-[-7px] h-[22px] w-[22px] rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <i className="fa-solid fa-xmark mt-[-5px]"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="block">{`Drag and drop the front of your ${selectedType?.has_back ? "ID" : "document"}`}</span>

                    <p className="mt-1 block text-xs text-gray-600">
                      Accepted File Types: JPEG, JPG, PNG; Allowable File Size: 2MB
                    </p>
                  </>
                )}
              </DottedButton>
              <InputError
                className="mt-2"
                message={errors.id_photo_front || serverErrors.id_photo_front}
              />
            </div>
          )}
          {/* Back of ID */}
          {!!(selectedType?.has_back && !selectedType?.is_pdf) && (
            <div className="flex-1">
              <input
                type="file"
                id="id_photo_back"
                name="id_photo_back"
                onChange={handleFileChange("id_photo_back")}
                style={{ display: "none" }}
                accept=".jpeg, .jpg, .png"
              />
              <DottedButton
                onClick={() => handleFileButtonClick("id_photo_back")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "id_photo_back")}
                className="flex min-h-[80px] w-full flex-col items-center justify-center"
              >
                {previews.id_photo_back ? (
                  <div className="relative h-full min-h-[80px] w-full">
                    <img
                      src={previews.id_photo_back}
                      alt="ID Front Preview"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviews((prev) => ({ ...prev, id_photo_back: null }));
                        setData("id_photo_back", null);
                      }}
                      className="absolute right-0 top-0 mr-[-7px] h-[22px] w-[22px] rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="block">{`Drag and drop the back of your ID`}</span>
                    <p className="mt-1 block text-xs text-gray-600">
                      Accepted File Types: JPEG, JPG, PNG; Allowable File Size: 2MB
                    </p>
                  </>
                )}
              </DottedButton>
              <InputError className="mt-1" message={errors.id_photo_back} />
            </div>
          )}
          {/* Multiple Pages (PDF) */}
          {!!selectedType?.is_pdf && (
            <div className="flex-1">
              <input
                type="file"
                id="id_file"
                name="id_file"
                onChange={handleFileChange("id_file")}
                style={{ display: "none" }}
                accept=".pdf"
              />
              <DottedButton
                onClick={() => handleFileButtonClick("id_file")}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "id_file")}
                className="flex min-h-[80px] w-full flex-col items-center justify-center"
              >
                {previews.id_file ? (
                  <div className="relative flex h-full min-h-[80px] w-full flex-col">
                    <span className="flex w-full flex-1 items-center justify-center">
                      <i className="fa-regular fa-file-pdf mr-2 text-lg"></i>
                      {previews.id_file}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviews((prev) => ({ ...prev, id_file: null }));
                        setData("id_file", null);
                      }}
                      className="absolute right-0 top-0 mr-[-7px] h-[22px] w-[22px] rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="block">Drag and drop your document</span>
                    <p className="mt-1 block text-xs text-gray-600">
                      Accepted File Type: PDF; Allowable File Size: 10MB
                    </p>
                  </>
                )}
              </DottedButton>
              <InputError className="mt-2" message={errors.id_file || serverErrors.id_file} />
            </div>
          )}
        </div>
      )}
      <div className="mb-2">
        <InputLabel value="Upload a Selfie" required={true} />
        <p className="mt-1 block text-xs text-gray-600">
          Face forward and make sure your whole face is visible together with your ID
        </p>
      </div>
      <div className="form-group flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <input
            type="file"
            id="selfie_photo"
            name="selfie_photo"
            onChange={handleFileChange("selfie_photo")}
            style={{ display: "none" }}
            accept=".jpeg, .jpg, .png"
          />
          <DottedButton
            onClick={() => handleFileButtonClick("selfie_photo")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "selfie_photo")}
            className="flex min-h-[80px] w-full flex-col items-center justify-center"
          >
            {previews.selfie_photo ? (
              <div className="relative h-full min-h-[80px] w-full">
                <img
                  src={previews.selfie_photo}
                  alt="ID Front Preview"
                  className="absolute inset-0 h-full w-full object-contain"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviews((prev) => ({ ...prev, selfie_photo: null }));
                    setData("selfie_photo", null);
                  }}
                  className="absolute right-0 top-0 mr-[-7px] h-[22px] w-[22px] rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ) : (
              <>
                <span className="block">Drag and drop your selfie</span>
                <p className="mt-1 block text-xs text-gray-600">
                  Accepted File Types: JPEG, JPG, PNG; Allowable File Size: 2MB
                </p>
              </>
            )}
          </DottedButton>
          <InputError className="mt-1" message={errors.selfie_photo || serverErrors.selfie_photo} />
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

export default VerificationForm;
