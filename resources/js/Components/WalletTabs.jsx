import { useState } from "react";

const WalletTabs = ({ loans }) => {
  const [activeTab, setActiveTab] = useState("loan");

  const totalLoanAmount = loans.reduce((sum, loan) => sum + (parseFloat(loan.loan_amount) || 0), 0);
  const totalWallet = loans.reduce(
    (sum, loan) => sum + (parseFloat(loan.outstanding_balance) || 0),
    0
  );
  const usedAmount = loans.length;

  const renderContent = () => {
    if (activeTab === "loan") {
      return (
        <div className="tab-content">
          <h3>Your overall loan is</h3>
          <h1>₱ {totalLoanAmount.toFixed(2)}</h1>
          <h2>Fully pay your loans to borrow again!</h2>
        </div>
      );
    } else if (activeTab === "wallet") {
      return (
        <div className="tab-content">
          <h3>Your Wallet Amount is</h3>
          <h1>₱ {totalWallet.toFixed(2)}</h1>
          <h2>Fully pay your loans to borrow again!</h2>
        </div>
      );
    }
  };

  return (
    <div className="loan-wallet-tabs">
      {/* Tabs */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "loan" ? "active" : ""}`}
          onClick={() => setActiveTab("loan")}
        >
          LOAN
        </div>
        <div
          className={`tab ${activeTab === "wallet" ? "active" : ""}`}
          onClick={() => setActiveTab("wallet")}
        >
          WALLET
        </div>
      </div>
      {/* Content */}
      <div
        className="content-container"
        style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default WalletTabs;
