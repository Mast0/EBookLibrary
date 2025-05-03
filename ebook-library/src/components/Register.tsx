import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await register(username, email, password, role);
      navigate("/");
    } catch (error) {
      console.error("Register error", error);
      alert("Register Failed");
    }
  };

  return (
    <div>
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
      <button onClick={handleRegister}>Login</button>
    </div>
  )
};

export default Register;