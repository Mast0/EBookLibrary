import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "../styles/FormPage.css";
import ThemeToggle from "./ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const tokens = await login(email, password);
      localStorage.setItem("accessToken", tokens.accessToken);
      navigate("/books");
    } catch (error) {
      console.error("Login error", error);
      alert("Login Failed");
    }
  };

  return (
    <>
      <ThemeToggle />
      <div className="form-container">
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
        <a href="/register">Register</a>
      </div>
    </>
  )
};

export default Login;