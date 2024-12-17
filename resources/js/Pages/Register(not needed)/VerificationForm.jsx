const VerificationForm = ({ onNext, onBack }) => {
  return (
    <div className="form-container">
      <h3>Welcome – let's get started</h3>
      <p>Tell us about your basic details and account requirements</p>

      <h4>Identity Verification</h4>
      <input placeholder="Choose a verification process *" />
      <input placeholder="Enter your OTP *" />
      <input placeholder="How would you like to verify? *" />

      <h4>Attach your ID</h4>
      <div className="upload-container">Drag and drop a file</div>
      <div className="upload-container">Drag and drop a file</div>

      <h4>Upload a Selfie</h4>
      <p>Face forward and make sure your eyes are clearly visible.</p>
      <div className="button-group">
        <button>Upload a Photo</button>
        <button>Reupload Photo</button>
      </div>

      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button className="next-button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default VerificationForm;
