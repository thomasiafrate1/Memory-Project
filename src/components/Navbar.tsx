import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/navbar.css";
import "../styles/dashboard.css";
import "../styles/categories.css";
import "../styles/themes.css";
import "../styles/card.css";
import "../styles/base.css";
import "../styles/calendar.css";
import "../styles/modals.css";
import "../styles/notifications.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Echo Memories</h1>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Accueil</Link></li>
        <li><Link to="/themes" onClick={() => setIsOpen(false)}>Mes Catégories</Link></li>
        <li><Link to="/notifications" onClick={() => setIsOpen(false)}>Notifications</Link></li>
        <li><Link to="/calendar" onClick={() => setIsOpen(false)}>Calendrier</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
