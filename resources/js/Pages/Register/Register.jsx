import { useState } from "react";
import CreationForm from "./CreationForm";
import IdentificationForm from "./IdentificationForm";
import "./Register.css";
import SuccessPage from "./SuccessPage";
import VerificationForm from "./VerificationForm";

const Register = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="app">
      <h2>Signing up for Online Banking</h2>
      <div className="progress-bar">
        <div className={`circle ${step >= 1 ? "active" : ""}`}>Identification</div>
        <div className={`circle ${step >= 2 ? "active" : ""}`}>Verification</div>
        <div className={`circle ${step >= 3 ? "active" : ""}`}>Creation</div>
        <div className={`circle ${step >= 4 ? "active" : ""}`}>Success</div>
      </div>
      {step === 1 && <IdentificationForm onNext={handleNext} />}
      {step === 2 && <VerificationForm onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <CreationForm onNext={handleNext} onBack={handleBack} />}
      {step === 4 && <SuccessPage />}
    </div>
  );
};

export default Register;
