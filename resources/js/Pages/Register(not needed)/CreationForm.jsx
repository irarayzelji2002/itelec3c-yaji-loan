const CreationForm = ({ onNext, onBack }) => {
  return (
    <div className="form-container">
      <h3>Welcome – let's create your account</h3>
      <p>Fill in your desired login information and security settings.</p>

      <h4>Account Information</h4>
      <div className="form-group">
        <input placeholder="Username *" />
        <input type="password" placeholder="Password *" />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Confirm Password *" />
      </div>

      <h4>Security Questions</h4>
      <div className="form-group">
        <input placeholder="Security Question 1 *" />
        <input placeholder="Answer 1 *" />
      </div>
      <div className="form-group">
        <input placeholder="Security Question 2 *" />
        <input placeholder="Answer 2 *" />
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

export default CreationForm;
