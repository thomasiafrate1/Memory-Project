import React from "react";
import Navbar from "../components/Navbar.tsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <main className="dashboard-container">
        {/* ✅ SECTION HERO (Accueil) */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Memory App : Améliorez votre apprentissage 📚</h1>
            <p>Révisez intelligemment avec la répétition espacée et des cartes mémoire interactives.</p>
            <button className="cta-button">
              <Link to="/themes">Commencer</Link>
            </button>
          </div>
          <div className="hero-image">
            <img src="/brain.jpg" alt="Apprentissage interactif" />
          </div>
        </section>

        {/* ✅ SECTION AVANTAGES */}
        <section className="features-section">
          <h2>Pourquoi utiliser Memory App ?</h2>
          <div className="features-container">
            <div className="feature-card">
              <img src="/flashcard.png" alt="Cartes interactives" />
              <h3>Cartes Mémoire</h3>
              <p>Créez, révisez et personnalisez vos cartes pour une meilleure rétention.</p>
            </div>
            <div className="feature-card">
              <img src="/spaced-repetition.png" alt="Répétition espacée" />
              <h3>Répétition Espacée</h3>
              <p>Boostez votre mémoire en révisant aux bons moments.</p>
            </div>
            <div className="feature-card">
              <img src="/stats.png" alt="Suivi des performances" />
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
