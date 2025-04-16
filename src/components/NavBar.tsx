import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaUser, FaHistory, FaComment, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        localStorage.removeItem("token");
        document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const sidebarItems = [
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "History", icon: <FaHistory />, path: "/history" },
    { name: "Chatbot", icon: <FaComment />, path: "/chatbot" },
    { name: "Subscription", icon: <FaCreditCard />, path: "/subscription" },
    { name: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "#270C4A",
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        color: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        position: "fixed",
        top: 0,
        zIndex: 50,
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
        <motion.img
          src={logo}
          alt="Logo"
          style={{ height: "40px", cursor: "pointer" }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/home")}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <ul style={{ display: "flex", gap: "20px", fontSize: "18px", listStyle: "none" }}>
            {["home", "services", "analytics", "about"].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  fontWeight: active === item ? "600" : "400",
                  color: active === item ? "#852FFF" : "white",
                }}
                onClick={() => handleClick(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.li>
            ))}
          </ul>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ cursor: "pointer" }}
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "250px",
              height: "100vh",
              backgroundColor: "#2c1250",
              boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.3)",
              zIndex: 100,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsSidebarOpen(false)}
              style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}
            >
              <FaTimes size={24} />
            </motion.div>
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  color: "white",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                }}
                whileHover={{ backgroundColor: "#693b93" }}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;