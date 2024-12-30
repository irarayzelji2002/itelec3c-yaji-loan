const ProgressBar = ({ percentage, label, usedAmount }) => {
  const formattedUsedAmount = parseFloat(usedAmount || 0).toFixed(2);

  return (
    <div className="progress-bar-container">
      {/* Label and Used Amount */}
      <div className="column-down">
        <h1>{label} Loans Made</h1>
        <h2>₱ {formattedUsedAmount} left to pay</h2>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-background">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
