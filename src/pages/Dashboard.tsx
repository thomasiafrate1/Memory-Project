import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
// import Footer from "../components/Footer.tsx";

const Dashboard = () => {
  const [categories, setCategories] = useState<string[]>(["Langues", "Histoire", "Programmation"]);

  const addCategory = () => {
    const newCategory = prompt("Entrez le nom de la nouvelle catégorie :");
    if (newCategory) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div>
      <Navbar />
      <main style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <h2>Catégories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {categories.map((category, index) => (
              <div key={index}>
                <h3>{category}</h3>
                <button>Voir les thèmes</button>
              </div>
            ))}
          </div>
          <button style={{ marginTop: "20px" }} onClick={addCategory}>Créer une catégorie</button>
        </div>

        <div style={{ width: "300px", padding: "10px" }}>
          <h3>Statistiques</h3>
          <p>Cartes révisées aujourd'hui : 5</p>
          <p>Niveau atteint : 2</p>
          <h3>Rappel quotidien</h3>
          <p>Prochaine révision : 18:00</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
