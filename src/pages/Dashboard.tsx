import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [categories] = useState<{ title: string; image: string; originalCat: boolean }[]>([
    { title: "Anglais", image: "/anglais.jpg", originalCat: true },
    { title: "Histoire", image: "/histoire.jpg", originalCat: true },
    { title: "Programmation", image: "/programmation.jpg", originalCat: true },
    { title: "Géographie", image: "/geographie.jpg", originalCat: true },
    { title: "Mathématiques", image: "/mathematiques.jpg", originalCat: true },
    { title: "Français", image: "/francais.jpg", originalCat: true },
    { title: "Marketing", image: "/marketing.jpg", originalCat: true },
    { title: "Luxe", image: "/luxe.jpg", originalCat: true },
    { title: "Ecologie", image: "/ecologie.jpg", originalCat: true },
    { title: "Politique", image: "/politique.jpg", originalCat: true },
  ]);
  
  
  return (
    <div>
      <Navbar />
      <main>
        <div className="catGeneral">
          <h2>Catégories</h2>
          <div className="cat">
            {categories.map((category, index) => (
              <div key={index} className="CarteCat" style={{ backgroundImage: `url(${category.image})` }}>
                <div className="titrebouton">
                  <h3>{category.title}</h3>
                  <button><Link to="/themes">Aller</Link></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="Stats">
          <h2>Statistiques</h2>
          <p>Cartes révisées aujourd'hui : 5</p>
          <p>Niveau atteint : 2</p>
          <h2>Rappel quotidien</h2>
          <p>Prochaine révision : 18:00</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
