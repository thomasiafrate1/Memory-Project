import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const Themes = () => {
  const [categories, setCategories] = useState<{ title: string; image: string; originalCat: boolean }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);

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
    } else {
      console.log("Salut")
    }
  };

  // Chargement des catégories au montage du composant
  useEffect(() => {
    loadCategories();
  }, []);

  // Gérer le changement de titre dans le modal
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  // Gérer le changement d'image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };

  // Ajouter une nouvelle catégorie
  const addCategoryFromModal = () => {
    if (newTitle && newImage) {
      const newCategory = { title: newTitle, image: newImage, originalCat: false };
      const updatedCategories = [...categories, newCategory];

      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));

      setNewTitle("");
      setNewImage(null);
      setIsModalOpen(false);
    } else {
      alert("Veuillez entrer un titre et sélectionner une image !");
    }
  };

  // Réinitialiser les catégories
  const resetCategories = () => {
    localStorage.removeItem("categories");
    loadCategories(); // Recharge les valeurs par défaut
  };

  return (
    <div>
      <Navbar />
      <main>
        <h2>Catégories</h2>
        <div className="cat">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className="CarteCat" style={{ backgroundColor: `red` }}>
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
        <div className="modal">
          <h1>Ajouter une catégorie</h1>
          <button className="closeModal" onClick={() => setIsModalOpen(false)}>✖ Fermer</button>
          <div>
            <p>Titre :</p>
            <input type="text" className="inputTitre" onChange={handleTitleChange} />
          </div>
          <div>
            <p>Image de fond :</p>
            <input type="file" className="inputImage" onChange={handleImageChange} />
          </div>
          <button onClick={addCategoryFromModal}>Ajouter</button>
        </div>
      )}
    </div>
  );
};

export default Themes;
