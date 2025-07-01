import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-logo">Risen Events</h3>

        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>

        <p className="footer-contact">📬 hello@risenevents.co.ke</p>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Risen Events. Crafted with love </p>
      </div>
    </footer>
  );
}

export default Footer;
