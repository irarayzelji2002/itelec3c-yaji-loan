const ProgressBar = ({ percentage, label, usedAmount }) => {
  return (
    <div className="progress-bar-container">
      {/* Label and Used Amount */}
      <div className="column-down">
        <h1>{label} Loan Available</h1>
        <h2>₱ {usedAmount} used</h2>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-background">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
