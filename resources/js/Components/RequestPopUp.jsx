function RequestPopUp({ loanNo }) {
  return (
    <>
      <div className="request-header">
        Loan Request #{loanNo}
        <div style={{ gap: "1rem", display: "flex" }}>
          <button className="accept-button">Accept</button>
          <button className="decline-button">Decline</button>
        </div>
      </div>
      <div className="request-body">
        <div className="request-row">
          <div className="request-label">Client Name : </div>
          <div className="request-value"> &nbsp;Harry Edward Styles</div>
        </div>
        <div className="request-row">
          <div className="request-label">Loan Type : </div>
          <div className="request-value">&nbsp;Premium</div>
        </div>
        <div className="request-row">
          <div className="request-label">Due Date : </div>
          <div className="request-value">&nbsp;December 30,2024</div>
        </div>
        <div className="request-row">
          <div className="request-label">Amount Requested : </div>
          <div className="request-value">&nbsp;₱ 2,500.00</div>
        </div>
      </div>
    </>
  );
}

export default RequestPopUp;
