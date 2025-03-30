import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [userCategories, setUserCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState<string | null>(null);

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

  const getFilteredCategories = () => {
    if (filter === "original") return originalCategories;
    if (filter === "created") return userCategories;
    return [...originalCategories, ...userCategories];
  };


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleColorSelect = (color: string) => {
    setNewColor(color);
  };

  const addCategoryFromModal = () => {
    if (newTitle && newColor) {
      if (categoryToEdit) {
        const oldTitle = categoryToEdit.title;
        const updatedCategories = userCategories.map(cat =>
        cat.title === oldTitle ? { ...cat, title: newTitle, color: newColor } : cat
        );
        setUserCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));

        // 🔁 Mettre à jour les thèmes liés à cette catégorie
        const storedThemes = localStorage.getItem("themes");
        if (storedThemes) {
          try {
            const parsedThemes = JSON.parse(storedThemes);
            const updatedThemes = parsedThemes.map(theme =>
            theme.theme === oldTitle ? { ...theme, theme: newTitle } : theme
            );
            localStorage.setItem("themes", JSON.stringify(updatedThemes));
          } catch (error) {
            console.error("Erreur en mettant à jour les thèmes:", error);
          }
        }

        // 🔁 Mettre à jour les subCards liées à cette catégorie
        const storedSubCards = localStorage.getItem("subCards");
        if (storedSubCards) {
          try {
            const parsedSubCards = JSON.parse(storedSubCards);
            const updatedSubCards = parsedSubCards.map(card =>
            card.parent === oldTitle ? { ...card, parent: newTitle } : card
            );
            localStorage.setItem("subCards", JSON.stringify(updatedSubCards));
          } catch (error) {
            console.error("Erreur en mettant à jour les subCards:", error);
          }
        }
        setCategoryToEdit(null);

      } else {
        const newCategory = { title: newTitle, color: newColor, originalCat: false };
        const updatedCategories = [...userCategories, newCategory];
        setUserCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
      }

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
        <h1 className="titleCategory">Catégories</h1>
        <div className="filterCategory">
          <label htmlFor="categoryFilter">Filtrer :</label>
          <select id="categoryFilter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Toutes les catégories</option>
            <option value="original">Catégories originales</option>
            <option value="created">Catégories créées</option>
          </select>
        </div>
        <div className="cat">
          {getFilteredCategories().length > 0 ? (
            getFilteredCategories().map((category, index) => (
              <div key={index} className="CarteCat"
                style={{backgroundColor: category.originalCat ? "transparent" : category.color, backgroundImage: category.originalCat ? `url(${category.image})` : "none", cursor: "pointer" }}
                onClick={() => navigate(`/themes/${category.title}`)}>
                <h3>{category.title}</h3>
                 {!category.originalCat && (
                  <>
                  <button className="deleteButton" onClick={(e) => { e.stopPropagation(); confirmDeleteCategory(category); }}>✖</button>
                  <button className="editButton" onClick={(e) => {e.stopPropagation(); setCategoryToEdit(category); setNewTitle(category.title); setNewColor(category.color); setIsModalOpen(true);}}>✎</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>Aucune catégorie disponible.</p>
          )}
        </div>

        <button className="buttonCreate" onClick={() => setIsModalOpen(true)} aria-label="Créer une catégorie"></button>
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
                <button onClick={() => handleColorSelect("red")} style={{ backgroundColor: "red" }}></button>
                <button onClick={() => handleColorSelect("tomato")} style={{ backgroundColor: "tomato" }}></button>
                <button onClick={() => handleColorSelect("orange")} style={{ backgroundColor: "orange" }}></button>
                <button onClick={() => handleColorSelect("maroon")} style={{ backgroundColor: "maroon" }}></button>
                <button onClick={() => handleColorSelect("black")} style={{ backgroundColor: "black" }}></button>
                <button onClick={() => handleColorSelect("darkblue")} style={{ backgroundColor: "darkblue" }}></button>
                <button onClick={() => handleColorSelect("blue")} style={{ backgroundColor: "blue" }}></button>
                <button onClick={() => handleColorSelect("blueviolet")} style={{ backgroundColor: "blueviolet" }}></button>
                <button onClick={() => handleColorSelect("deeppink")} style={{ backgroundColor: "deeppink" }}></button>
                <button onClick={() => handleColorSelect("gray")} style={{ backgroundColor: "gray" }}></button>
                <button onClick={() => handleColorSelect("seagreen")} style={{ backgroundColor: "seagreen" }}></button>
                <button onClick={() => handleColorSelect("green")} style={{ backgroundColor: "green" }}></button>
              </div>
            </div>
            <button className="cta-button" onClick={addCategoryFromModal}>Ajouter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;