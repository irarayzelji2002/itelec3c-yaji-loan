import { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>

      {isVisible && (
        <div className="absolute -top-full left-1/2 z-10 min-w-max -translate-x-1/2 -translate-y-2 transform rounded-lg bg-gray-800 px-3 py-2 text-sm text-white shadow-lg">
          {content}
          <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
