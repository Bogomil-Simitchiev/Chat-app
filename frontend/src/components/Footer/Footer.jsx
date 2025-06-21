import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} <span className="brand">Talkie</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
