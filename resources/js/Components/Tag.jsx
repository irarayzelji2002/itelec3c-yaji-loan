const Tag = ({ color, bgColor, children }) => {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
      style={{ color, backgroundColor: bgColor }}
    >
      {children}
    </span>
  );
};

export default Tag;
