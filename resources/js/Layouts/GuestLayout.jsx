import logosDark from "/public/img/logosDark.png";

export default function GuestLayout({ children }) {
  return (
    <div style={{ paddingBottom: "10%" }}>
      <div className="guest flex items-center justify-center">
        <img src={logosDark} alt="YAJI Corp Logo" className="logo" />

        <div
          style={{ border: "1px solid #043C3C", width: "100%" }}
          className="bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
