const Reminders = ({ reminder, title }) => {
  return (
    // , icon
    <div className="reminder-card">
      <div className="reminder-body">
        <div className="column-down">
          <div className="reminder-header">{title}</div>
          <p>{reminder}</p>{" "}
        </div>

        {/* {icon && <img src={icon} alt="icon" className="reminder-icon" />} */}
      </div>
    </div>
  );
};

export default Reminders;
