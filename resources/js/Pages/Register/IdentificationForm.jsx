const IdentificationForm = ({ onNext }) => {
  return (
    <div className="form-container">
      <h3>Welcome – let's get started</h3>
      <p>Tell us about your basic details and account requirements</p>

      <h4>Basic Information</h4>
      <div className="form-group">
        <input placeholder="First Name *" />
        <input placeholder="Middle Name" />
      </div>
      <div className="form-group">
        <input placeholder="Last Name *" />
        <input placeholder="Gender *" />
      </div>
      <div className="form-group">
        <input placeholder="Date of Birth *" />
        <input placeholder="Nationality *" />
      </div>

      <h4>Contact Information</h4>
      <div className="form-group">
        <input placeholder="Phone Number *" />
        <input placeholder="Email Address *" />
      </div>
      <div className="form-group">
        <input placeholder="Street Address *" />
        <input placeholder="Barangay *" />
      </div>
      <div className="form-group">
        <input placeholder="City *" />
        <input placeholder="Province *" />
      </div>

      <button className="next-button" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default IdentificationForm;
