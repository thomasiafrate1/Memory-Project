import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";



const Themes = () => {
  const navigate = useNavigate();

  const originalCategories = [
    { title: "Anglais", color: "blue", originalCat: true, image: "/anglais.jpg" },
    { title: "Histoire", color: "brown", originalCat: true, image: "/histoire.jpg"  },
    { title: "Programmation", color: "purple", originalCat: true, image: "/programmation.jpg"  },
    { title: "Géographie", color: "green", originalCat: true, image: "/geographie.jpg"  },
    { title: "Mathématiques", color: "orange", originalCat: true, image: "/mathematiques.jpg"  },
    { title: "Français", color: "red", originalCat: true, image: "/francais.jpg"  },
    { title: "Marketing", color: "yellow", originalCat: true, image: "/marketing.jpg"  },
    { title: "Luxe", color: "gold", originalCat: true, image: "/luxe.jpg"  },
    { title: "Ecologie", color: "lightgreen", originalCat: true, image: "/ecologie.jpg"  },
    { title: "Politique", color: "gray", originalCat: true, image: "/politique.jpg"  },
  ];


  const [userCategories, setUserCategories] = useState([]);
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      try {
        const parsedCategories = JSON.parse(storedCategories);
        if (Array.isArray(parsedCategories)) {
          setUserCategories(parsedCategories);
        }
      } catch (error) {
        console.error("Erreur de parsing du localStorage:", error);
      }
    }
  }, []);


  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const confirmDeleteCategory = (category) => {
    setCategoryToDelete(category);
  };

  const deleteCategory = () => {
    if (categoryToDelete) {
      const updatedCategories = userCategories.filter(cat => cat.title !== categoryToDelete.title);
      setUserCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setCategoryToDelete(null);
    }
  };

  const [filter, setFilter] = useState("all");
  const getFilteredCategories = () => {
    if (filter === "original") return originalCategories;
    if (filter === "created") return userCategories;
    return [...originalCategories, ...userCategories];
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState<string | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleColorSelect = (color: string) => {
    setNewColor(color);
  };

  const addCategoryFromModal = () => {
    if (newTitle && newColor) {
      const newCategory = { title: newTitle, color: newColor, originalCat: false };
      const updatedCategories = [...userCategories, newCategory];
      setUserCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewTitle("");
      setNewColor(null);
      setIsModalOpen(false);
    } else {
      alert("Veuillez entrer un titre et choisir une couleur !");
    }
  };
  return ( 
    <div>
      <Navbar />
      <main>
        <h1 style={{ textAlign: "center" }}>Catégories</h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label htmlFor="categoryFilter">Filtrer :</label>
          <select 
            id="categoryFilter" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="all">Toutes les catégories</option>
            <option value="original">Catégories originales</option>
            <option value="created">Catégories créées</option>
          </select>
        </div>
        <div className="cat" style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", padding: "20px" }}>
          {getFilteredCategories().length > 0 ? (
            getFilteredCategories().map((category, index) => (
              <div
                key={index}
                className="CarteCat"
                style={{     backgroundColor: category.originalCat ? "transparent" : category.color, backgroundImage: category.originalCat ? `url(${category.image})` : "none", cursor: "pointer", padding: "20px", borderRadius: "10px", margin: "10px" }}
                onClick={() => navigate(`/themes/${category.title}`)}
              >
                <h3>{category.title}</h3>
                 {!category.originalCat && (
                  <button className="deleteButton" onClick={(e) => { e.stopPropagation(); confirmDeleteCategory(category); }}>❌</button>
                )}
              </div>
            ))
          ) : (
            <p>Aucune catégorie disponible.</p>
          )}
        </div>

        <button className="buttonCreate" onClick={() => setIsModalOpen(true)} style={{ display: "block", margin: "20px auto", padding: "10px 20px", fontSize: "16px" }}>Créer une catégorie</button>
      </main>

      {categoryToDelete && (
        <div className="containerModal">
          <div className="modal">
            <h2>Supprimer {categoryToDelete.title} ?</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.</p>
            <button className="confirmDelete" onClick={deleteCategory}>Oui, supprimer</button>
            <button className="cancelDelete" onClick={() => setCategoryToDelete(null)}>Annuler</button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="containerModal">
          <div className="modal">
            <h1>Ajouter une catégorie</h1>
            <button className="closeModal" onClick={() => setIsModalOpen(false)}>✖</button>
            <input type="text" placeholder="Titre" value={newTitle} onChange={handleTitleChange} className="inputTitre"/>
            <div className="formulaireCouleurModal">
              <p>Choisissez une couleur :</p>
              <div>
                <button onClick={() => handleColorSelect("blue")} style={{ backgroundColor: "blue" }}></button>
                <button onClick={() => handleColorSelect("yellow")} style={{ backgroundColor: "yellow" }}></button>
                <button onClick={() => handleColorSelect("green")} style={{ backgroundColor: "green" }}></button>
                <button onClick={() => handleColorSelect("red")} style={{ backgroundColor: "red" }}></button>
                <button onClick={() => handleColorSelect("pink")} style={{ backgroundColor: "pink" }}></button>
                <button onClick={() => handleColorSelect("black")} style={{ backgroundColor: "black" }}></button>
                <button onClick={() => handleColorSelect("white")} style={{ backgroundColor: "white" }}></button>
                <button onClick={() => handleColorSelect("grey")} style={{ backgroundColor: "grey" }}></button>
              </div>
            </div>
            <button onClick={addCategoryFromModal} style={{ width: "10vw" }}>Ajouter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Themes;
