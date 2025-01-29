import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";






const Dashboard = () => {
  const [categories, setCategories] = useState<string[]>(["Anglais", "Histoire", "Programmation", "Géographie", "Mathématiques", "Français", "Marketing", "Luxe", "Ecologie", "Politique"]);
  const [imageCat] = useState<string[]>([
    "/anglais.jpg",
    "/histoire.jpg",
    "/programmation.jpg",
    "/geographie.jpg",
    "/mathematiques.jpg",
    "/francais.jpg",
    "/marketing.jpg",
    "/luxe.jpg",
    "/ecologie.jpg",
    "/politique.jpg",
  ]);


  const addCategory = () => {
    const newCategory = prompt("Entrez le nom de la nouvelle catégorie :");
    if (newCategory) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className="catGeneral">
          <h2>Catégories</h2>
          <div className="cat">
            {categories.map((category, index) => (
              <div key={index} className="CarteCat" style={{ backgroundImage: `url(${imageCat[index]})` }}>
                <div className="titrebouton">
                <h3>{category}</h3>
                <button>Voir les thèmes</button>
                </div>
              </div>
            ))}
          </div>
          <button className="buttonCreate" onClick={addCategory}>Créer une catégorie</button>
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
