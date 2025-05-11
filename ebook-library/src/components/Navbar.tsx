import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/Navbar.css";
import "../styles/FormPage.css"
import { FaHome } from 'react-icons/fa'; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    logout();

    if (window.location.pathname === '/') window.location.reload();
    else navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <Link to="/" className="icon-home">
          <FaHome />
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="navbar-button">Logout</button>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
