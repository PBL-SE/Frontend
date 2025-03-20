import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import profilePic from "../assets/profile.png";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string>("home");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/home") setActive("home");
    else if (currentPath === "/services") setActive("services");
    else if (currentPath === "/analytics") setActive("analytics");
    else if (currentPath === "/about") setActive("about");
  }, [location.pathname]);

  const handleClick = (section: string) => {
    setActive(section);
    navigate(`/${section}`);
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        // Call backend logout route to destroy session
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include", // Ensures cookies are sent with the request
        });
  
        // Clear local storage and cookies
        localStorage.removeItem("token");
        document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
        // Redirect to login page
        window.location.replace("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };  

  return (
    <div
      style={{
        backgroundColor: "#270C4A",
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        color: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
        }}
       
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "30px", position: "relative" }}>
          <ul style={{ display: "flex", gap: "20px", fontSize: "18px", listStyle: "none" }}>
            {["home", "services", "analytics", "about"].map((item) => (
              <h3
                key={item}
                style={{
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  fontWeight: active === item ? "600" : "400",
                  color: active === item ? "#852FFF" : "white",
                }}
                onClick={() => handleClick(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </h3>
            ))}
          </ul>

          <div style={{ position: "relative" }}>
            <img
              src={profilePic}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "2px solid white",
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50px",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  width: "150px",
                  zIndex: 10,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </div>
                <div
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
