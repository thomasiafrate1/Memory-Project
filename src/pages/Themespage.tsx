import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const Themes = () => {
  const [categories, setCategories] = useState<{ title: string; color: string; originalCat: boolean }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState<string | null>(null);

  // Fonction pour récupérer les catégories depuis localStorage
  const loadCategories = () => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        if (Array.isArray(parsedCategories)) {
          setCategories(parsedCategories);
        } else {
          console.error("Format incorrect des catégories dans localStorage");
          setCategories([]);
        }
      } catch (error) {
        console.error("Erreur de parsing du localStorage:", error);
        setCategories([]);
      }
    }
  };

  // Chargement des catégories au montage du composant
  useEffect(() => {
    loadCategories();
  }, []);

  // Gérer le changement de titre
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  // Gérer la sélection de couleur
  const handleColorSelect = (color: string) => {
    setNewColor(color);
  };

  // Ajouter une nouvelle catégorie avec la couleur sélectionnée
  const addCategoryFromModal = () => {
    if (newTitle && newColor) {
      const newCategory = { title: newTitle, color: newColor, originalCat: false };
      const updatedCategories = [...categories, newCategory];

      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));

      setNewTitle("");
      setNewColor(null);
      setIsModalOpen(false);
    } else {
      alert("Veuillez entrer un titre et choisir une couleur !");
    }
  };

  // Réinitialiser les catégories
  const resetCategories = () => {
    localStorage.removeItem("categories");
    loadCategories();
  };

  return (
    <div>
      <Navbar />
      <main>
        <h2>Catégories</h2>
        <div className="cat">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div 
                key={index} 
                className="CarteCat" 
                style={{ backgroundColor: category.color, padding: "20px", borderRadius: "10px", margin: "10px" }}
              >
                <h3>{category.title}</h3>
              </div>
            ))
          ) : (
            <p>Aucune catégorie disponible.</p>
          )}
        </div>
        <button className="buttonCreate" onClick={() => setIsModalOpen(true)}>Créer une catégorie</button>
        <button onClick={resetCategories}>Réinitialiser les catégories</button>
      </main>

      <Footer />

      {isModalOpen && (
        <div className="modal" style={{ padding: "20px", border: "1px solid #ccc", background: "#fff" }}>
          <h1>Ajouter une catégorie</h1>
          <button className="closeModal" onClick={() => setIsModalOpen(false)}>✖ Fermer</button>
          <div>
            <p>Titre :</p>
            <input type="text" className="inputTitre" value={newTitle} onChange={handleTitleChange} />
          </div>
          <div>
            <p>Choisissez une couleur :</p>
            <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
              <button className="buttonBleu" style={{ backgroundColor: "blue", width: "40px", height: "40px" }} onClick={() => handleColorSelect("blue")}></button>
              <button className="buttonJaune" style={{ backgroundColor: "yellow", width: "40px", height: "40px" }} onClick={() => handleColorSelect("yellow")}></button>
              <button className="buttonVert" style={{ backgroundColor: "green", width: "40px", height: "40px" }} onClick={() => handleColorSelect("green")}></button>
              <button className="buttonRose" style={{ backgroundColor: "pink", width: "40px", height: "40px" }} onClick={() => handleColorSelect("pink")}></button>
              <button className="buttonNoir" style={{ backgroundColor: "black", width: "40px", height: "40px", color: "white" }} onClick={() => handleColorSelect("black")}></button>
              <button className="buttonBlanc" style={{ backgroundColor: "white", width: "40px", height: "40px", border: "1px solid black" }} onClick={() => handleColorSelect("white")}></button>
              <button className="buttonRouge" style={{ backgroundColor: "red", width: "40px", height: "40px" }} onClick={() => handleColorSelect("red")}></button>
            </div>
          </div>
          <button onClick={addCategoryFromModal}>Ajouter</button>
        </div>
      )}
    </div>
  );
};

export default Themes;
