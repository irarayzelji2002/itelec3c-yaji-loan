import PrimaryButton from "@/Components/PrimaryButton";
import { CheckCircle } from "@/Icons/GeneralIcons";

const SuccessPage = () => {
  const handleOK = () => {
    window.location.href = route("dashboard");
  };

  return (
    <div className="form-container success-container">
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <CheckCircle size={33} />
          <h3 className="mt-[2px] text-center text-xl font-bold text-gray-900">
            Credential successfully created
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <p className="mt-1 block text-left text-sm text-gray-600">
            Your YAJI Loan account has been successfully created.
          </p>
          <p className="mt-1 block text-left text-sm text-gray-600">
            Please wait for you account to be verified before you can log in with your credentials.
            You will be notified through your registered email address.
          </p>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-[25px] flex flex-col items-center gap-4 md:flex-row">
        <div className="flex-1">
          <PrimaryButton onClick={handleOK} className="w-full text-lg">
            OK
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
