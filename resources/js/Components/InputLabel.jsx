export default function InputLabel({
  value,
  className = "",
  required = false,
  children,
  ...props
}) {
  return (
    <label {...props} className={`block text-sm font-medium text-black ` + className}>
      {value ? value : children}
      {required && <span className="ml-2 text-red-500">*</span>}
    </label>
  );
}
