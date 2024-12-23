const Reminders = ({ reminder, title }) => {
  return (
    <div className="reminders">
      <div className="request-header">
        {title}
        <div style={{ gap: "1rem", display: "flex" }}>
          <button className="decline-button">Dismiss</button>
        </div>
      </div>
      <div className="request-body">
        <div className="request-value"> {reminder}</div>
      </div>
    </div>
  );
};

export default Reminders;
