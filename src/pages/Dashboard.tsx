import React from "react";
import Navbar from "../components/Navbar.tsx";
import { Link } from "react-router-dom";
import "../App.css";

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <main className="dashboard-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Echo Memories : Améliorez votre apprentissage</h1>
            <p>Révisez intelligemment avec la répétition espacée et des cartes mémoire interactives.</p>
            <button className="cta-button">
              <Link to="/themes">Commencer</Link>
            </button>
          </div>
          <div className="hero-image">
            <img src="/brain.jpg" />
          </div>
        </section>
        <section className="features-section">
          <h2>Pourquoi utiliser Echo Memories ?</h2>
          <div className="features-container">
            <div className="feature-card">
              <img src="/memoire.png"/>
              <h3>Cartes Mémoire</h3>
              <p>Créez, révisez et personnalisez vos cartes pour une meilleure rétention.</p>
            </div>
            <div className="feature-card">
              <img src="/horloge.png" />
              <h3>Répétition Espacée</h3>
              <p>Boostez votre mémoire en révisant aux bons moments.</p>
            </div>
            <div className="feature-card">
              <img src="/20sur20.gif"/>
              <h3>Suivi des progrès</h3>
              <p>Analysez vos performances pour optimiser votre apprentissage.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
