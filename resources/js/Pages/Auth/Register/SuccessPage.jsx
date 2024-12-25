const SuccessPage = () => {
  return (
    <div className="form-container success-container">
      <h3>Account Created Successfully!</h3>
      <p>
        Your online banking account has been successfully created. You can now log in and start
        managing your account.
      </p>
      <div className="success-icon">&#10004;</div> {/* Checkmark icon */}
      <div className="button-group">
        <button className="next-button">Go to Login</button>
      </div>
    </div>
  );
};

export default SuccessPage;
