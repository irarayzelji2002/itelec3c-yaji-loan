import DottedButton from "@/Components/DottedButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import { useState } from "react";

const VerificationForm = ({
  data,
  setData,
  errors,
  onNext,
  onCancel,
  onBack,
  verificationTypes = [],
}) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleVerificationTypeChange = (e) => {
    const selectedValidId = e.target.value;
    const selected = verificationTypes.find((type) => type.valid_id === selectedValidId);
    setSelectedType(selected);
    setData("verification_type", selectedValidId);
    console.log(`selectedValidId: ${selectedValidId}`);
    console.log("selected", selected);
  };

  const handleNext = (e) => {
    e.preventDefault();

    // Validation
    onNext();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleFileChange = (field) => (e) => {
    setData(field, e.target.files[0]);
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
        <InputError className="mt-2" message={errors.verification_type} />
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
                onClick={() => {}}
                className="flex min-h-[80px] w-full flex-col items-center justify-center"
              >
                <span className="block">{`Drag and drop the front of your ${selectedType?.has_back ? "ID" : "document"}`}</span>
                <p className="mt-1 block text-xs text-gray-600">
                  Accepted File Types: JPEG, JPG, PNG; Allowable File Size: 2MB
                </p>
              </DottedButton>
              <InputError className="mt-2" message={errors.id_photo_front} />
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
                onClick={() => {}}
                className="flex min-h-[80px] w-full flex-col items-center justify-center"
              >
                <span className="block">Drag and drop the back of your ID</span>
                <p className="mt-1 block text-xs text-gray-600">
                  Accepted File Types: JPEG, JPG, PNG; Allowable File Size: 2MB
                </p>
              </DottedButton>
              <InputError className="mt-2" message={errors.id_photo_back} />
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
                onClick={() => {}}
                className="flex min-h-[80px] w-full flex-col items-center justify-center"
              >
                <span className="block">Drag and drop your document</span>
                <p className="mt-1 block text-xs text-gray-600">
                  Accepted File Type: PDF; Allowable File Size: 10MB
                </p>
              </DottedButton>
              <InputError className="mt-2" message={errors.id_photo_back} />
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
            onClick={() => {}}
            className="flex min-h-[80px] w-full flex-col items-center justify-center"
          >
            <span className="block">Drag and drop your selfie</span>
            <p className="mt-1 block text-xs text-gray-600">
              Accepted File Types: JPEG, JPG, PNG; Allowable File Size: 2MB
            </p>
          </DottedButton>
          <InputError className="mt-2" message={errors.selfie_photo} />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-[25px] flex flex-col items-center gap-4 md:flex-row">
        <div className="flex-1">
          <SecondaryButton onClick={onBack} className="w-full text-lg">
            Back
          </SecondaryButton>
        </div>
        <div className="flex-1">
          <SecondaryButton onClick={handleCancel} className="w-full text-lg">
            Cancel
          </SecondaryButton>
        </div>
        <div className="flex-1">
          <PrimaryButton onClick={handleNext} className="w-full text-lg">
            Next
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;
