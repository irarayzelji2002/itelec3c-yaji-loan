import logo from "/public/img/logosText.png";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="YAJI Corp Logo" style={styles.logo} />
        {/* <span style={styles.companyName}>YAJI CORP.</span> */}
      </div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.link}>
          Home
        </a>
        <a href="#" style={styles.link}>
          Terms & Condition
        </a>
        <a href="#" style={styles.link}>
          About Us
        </a>

        <div>
          <button style={styles.applyButton}>Apply for Loan</button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#003333", // Dark Teal
    padding: "15px 30px",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "auto",
    height: "40px",
    marginRight: "10px",
  },
  companyName: {
    fontWeight: "bold",
    fontSize: "20px",
    textTransform: "uppercase",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    gap: "20px",
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
  },
  applyButton: {
    backgroundColor: "#4CAF50", // Green
    border: "none",
    borderRadius: "20px",
    color: "#ffffff",
    padding: "10px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
