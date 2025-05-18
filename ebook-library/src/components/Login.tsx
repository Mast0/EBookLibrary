import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "../styles/FormPage.css";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const { login: authLogin } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const tokens = await login(email, password);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("userEmail", email);
      authLogin();
      navigate("/");
    } catch (error: any) {
      console.error("Login error", error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button onClick={handleLogin}>Login</button>
      <a href="/register">Register</a>
    </div>
  )
};

export default Login;
