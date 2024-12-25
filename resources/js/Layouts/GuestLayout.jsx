import logosDark from "/public/img/logosDark.png";

export default function GuestLayout({ children }) {
  return (
    <div style={{ paddingBottom: "10%" }}>
      <div className="guest flex items-center justify-center">
        <img src={logosDark} alt="YAJI Corp Logo" className="logo" />

        <div
          style={{ width: "100%" }}
          className="border-green-900 bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
