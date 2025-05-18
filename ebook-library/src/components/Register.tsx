import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import "../styles/FormPage.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    
    try {
      await register(username, email, password, role);
      navigate("/login");
    } catch (error: any) {
      console.error("Register error", error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Register</h2>
        <input 
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  )
};

export default Register;