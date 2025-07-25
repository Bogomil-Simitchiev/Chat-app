import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import AuthContext from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="header">
      <div className="header-container">
        
        <Link to="/" className="logo">
          Talkie
        </Link>
        <nav className="nav-links">
          <span className="welcome">{user.token ? " Welcome, " + user.user.nickname : <></>}</span>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link className="nav-link">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
