import { validateStep1, validateStep2, validateStep3 } from "@/utils/validationRules";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CreationForm from "./CreationForm";
import IdentificationForm from "./IdentificationForm";
import "./Register.css";
import SuccessPage from "./SuccessPage";
import VerificationForm from "./VerificationForm";

const Register = ({ verificationTypes = [] }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [previews, setPreviews] = useState({
    id_photo_front: null,
    id_photo_back: null,
    selfie_photo: null,
    id_file: null,
  });

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

    // Verification
    verification_type: "",
    id_photo_front: null,
    id_photo_back: null,
    id_file: null,
    selfie_photo: null,

    // Account Creation
    password: "",
    password_confirmation: "",
    security_question_1: "",
    security_answer_1: "",
    security_question_2: "",
    security_answer_2: "",
  };

  const { data, setData, post, processing, errors } = useForm(blankData);

  const handleSubmit = () => {
    const formData = new FormData();

    // Append all form fields
    Object.keys(data).forEach((key) => {
      if (
        ["id_photo_front", "id_photo_back", "id_file", "selfie_photo"].includes(key) &&
        data[key]
      ) {
        formData.append(key, data[key]);
      } else if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    post(route("register"), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        setStep(4); // Move to success page
      },
    });
  };

  const handleNext = () => {
    if (step === 1) {
      const { isValid } = validateStep1(data);
      if (!isValid) return;
    } else if (step === 2) {
      const { isValid } = validateStep2(data, selectedType);
      if (!isValid) return;
    } else if (step === 3) {
      const { isValid } = validateStep3(data);
      if (!isValid) return;
      handleSubmit();
      return;
    }
    setStep(step + 1);
  };

  const handleCancel = () => {
    setData(blankData);
    window.location.href = route("login");
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    return () => {
      // Cleanup preview URLs when component unmounts
      Object.values(previews).forEach((preview) => {
        if (preview && typeof preview === "string" && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, []);

  return (
    <div className="app">
      <h3 className="text-left text-xl font-bold text-gray-900">Signing up for Online Banking</h3>
      <div className="progress-bar">
        <div className={`circle ${step >= 1 ? "active" : ""}`}>Identification</div>
        <div className={`circle ${step >= 2 ? "active" : ""}`}>Verification</div>
        <div className={`circle ${step >= 3 ? "active" : ""}`}>Creation</div>
        <div className={`circle ${step >= 4 ? "active" : ""}`}>Success</div>
      </div>
      {step === 1 && (
        <IdentificationForm
          data={data}
          setData={setData}
          errors={errors}
          onNext={handleNext}
          onCancel={handleCancel}
        />
      )}
      {step === 2 && (
        <VerificationForm
          data={data}
          setData={setData}
          errors={errors}
          onNext={handleNext}
          onBack={handleBack}
          onCancel={handleCancel}
          verificationTypes={verificationTypes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          previews={previews}
          setPreviews={setPreviews}
        />
      )}
      {step === 3 && (
        <CreationForm
          data={data}
          setData={setData}
          errors={errors}
          onNext={handleNext}
          onBack={handleBack}
          onCancel={handleCancel}
          processing={processing}
        />
      )}
      {step === 4 && <SuccessPage />}
    </div>
  );
};

export default Register;
