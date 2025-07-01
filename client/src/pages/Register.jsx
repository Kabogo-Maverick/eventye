import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Register.css"; // 👈 Import elegant styles

function Register() {
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
      const res = await api.post("/auth/register", formData);
      console.log("Registered:", res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
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
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
