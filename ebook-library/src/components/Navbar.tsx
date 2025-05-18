import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/Navbar.css";
import "../styles/FormPage.css"

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
      <div className="navbar-left">
      <Link to="/" className="navbar-item">Home</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="navbar-item">Logout</button>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
