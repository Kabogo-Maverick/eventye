import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Navbar.css"; // Assuming you have a CSS file for styling


function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
<nav className="navbar">
  <div>
    <Link to="/">Home</Link>
    {user && <> | <Link to="/myevents">My Events</Link></>}
    {user?.is_admin && <span className="admin-label"> | Admin</span>}
  </div>

  <div>
    {user ? (
      <>
        <span className="user-greeting">Hi, {user.username}</span>
        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </>
    )}
  </div>
</nav>

  );
}

export default Navbar;
