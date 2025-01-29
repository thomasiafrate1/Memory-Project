import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Memory App</h1>
      <ul className="">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/themes">Mes Thèmes</Link></li>
        <li><Link to="/settings">Paramètres</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/connexion" >Se connecter</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
