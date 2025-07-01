import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Login.css"; // 🩷 Import the styles

function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
