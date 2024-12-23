import { useState } from "react";

const DropdownInfo = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      {/* Dropdown Header */}
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdown-title">{title}</span>
        <span className={`dropdown-icon ${isOpen ? "open" : ""}`}>{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown Content */}
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default DropdownInfo;
