import { useState } from "react";

const WalletTabs = () => {
  const [activeTab, setActiveTab] = useState("loan");

  const renderContent = () => {
    if (activeTab === "loan") {
      return (
        <div className="tab-content">
          <h3>BORROW UP TO</h3>
          <h1>₱ 0.00</h1>
          <h2>Fully pay your loans to borrow again!</h2>
        </div>
      );
    } else if (activeTab === "wallet") {
      return (
        <div className="tab-content">
          <p>Fully pay your loans to borrow again!</p>
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
