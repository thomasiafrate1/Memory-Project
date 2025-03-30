import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { defaultThemes } from "../store/defaultData.ts";

const ThemePage = () => {
  const { themeName } = useParams<{ themeName: string }>();
  const [cards, setCards] = useState<{ title: string; color: string; theme: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardColor, setNewCardColor] = useState<string | null>(null);
  const [cardToDelete, setCardToDelete] = useState<{ title: string; color: string; theme: string } | null>(null);
  const [cardToEdit, setCardToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (themeName) {
      const storedThemes = localStorage.getItem("themes");
      let userThemes = [];

      if (storedThemes) {
        try {
          userThemes = JSON.parse(storedThemes).filter((theme) => theme.theme === themeName);
        } catch (error) {
          console.error("Erreur de parsing du localStorage:", error);
        }
      }

      const defaultThemeList = defaultThemes[themeName] || [];
      setCards([...defaultThemeList, ...userThemes]);
    }
  }, [themeName]);

  const addCard = () => {
    const storedThemes = localStorage.getItem("themes");
    let updatedThemes = [];
    if (!newCardTitle || !newCardColor) {
      alert("Veuillez entrer un titre et choisir une couleur !");
      return;
    }
    if (storedThemes) {
      try {
        updatedThemes = JSON.parse(storedThemes);
      } catch (error) {
        console.error("Erreur de parsing du localStorage:", error);
      }
    }
  
    if (cardToEdit) {
      const oldTitle = cardToEdit.title;
      const modifiedThemes = updatedThemes.map((card) =>
        card.title === oldTitle && card.theme === themeName
          ? { ...card, title: newCardTitle, color: newCardColor }
          : card
      );
      const storedSubCards = localStorage.getItem("subCards");
      if (storedSubCards) {
        try {
          const parsedSubCards = JSON.parse(storedSubCards);
          const updatedSubCards = parsedSubCards.map(card =>
            card.parent === oldTitle ? { ...card, parent: newCardTitle } : card
          );
          localStorage.setItem("subCards", JSON.stringify(updatedSubCards));
        } catch (error) {
          console.error("Erreur en mettant à jour les subCards:", error);
        }
      }
      setCards(cards.map(card =>
        card.title === oldTitle ? { ...card, title: newCardTitle, color: newCardColor } : card
      ));
      localStorage.setItem("themes", JSON.stringify(modifiedThemes));
      setCardToEdit(null);
    } else {
      const newCard = { title: newCardTitle, color: newCardColor, theme: themeName };
      updatedThemes.push(newCard);
      setCards([...cards, newCard]);
      localStorage.setItem("themes", JSON.stringify(updatedThemes));
    }
    setNewCardTitle("");
    setNewCardColor(null);
    setIsModalOpen(false);
  };

  const confirmDeleteCard = (card) => {
    setCardToDelete(card);
  };

  const deleteCard = () => {
    if (cardToDelete) {
      const updatedCards = cards.filter(card => card.title !== cardToDelete.title);
      setCards(updatedCards);
      localStorage.setItem("themes", JSON.stringify(updatedCards));
      setCardToDelete(null);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="titleTheme">{themeName}</h1>
      
      <div className="cardTheme">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} className="card" style={{ backgroundColor: card.color }} onClick={() => navigate(`${window.location.pathname}/${card.title}`)}>
              <h3>{card.title}</h3>
              <button className="deleteButton" onClick={(e) => { e.stopPropagation(); confirmDeleteCard(card); }}>
                ✖
              </button>
              <button className="editButton" onClick={(e) => {e.stopPropagation(); setCardToEdit(card); setNewCardTitle(card.title); setNewCardColor(card.color); setIsModalOpen(true);}}>
                ✎
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>Aucune carte disponible pour ce thème.</p>
        )}
      </div>

      <button className="buttonCreate" onClick={() => setIsModalOpen(true)} aria-label="Créer un thème +"></button>
      <div className="buttonReturn" onClick={() => navigate('/themes')}>⭠</div>

      {isModalOpen && (
        <div className="containerModal">
          <div className="modal">
            <h1>Ajouter un thème</h1>
            <button className="closeModal" onClick={() => setIsModalOpen(false)}>✖</button>
            <input
              type="text"
              placeholder="Titre"
              className="inputTitre"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            <div className="formulaireCouleurModal">
              <p>Choisissez une couleur :</p>
              <div className="divCouleur">
                <button onClick={() => setNewCardColor("red")} style={{ backgroundColor: "red" }}></button>
                <button onClick={() => setNewCardColor("tomato")} style={{ backgroundColor: "tomato" }}></button>
                <button onClick={() => setNewCardColor("orange")} style={{ backgroundColor: "orange" }}></button>
                <button onClick={() => setNewCardColor("maroon")} style={{ backgroundColor: "maroon" }}></button>
                <button onClick={() => setNewCardColor("black")} style={{ backgroundColor: "black" }}></button>
                <button onClick={() => setNewCardColor("darkblue")} style={{ backgroundColor: "darkblue" }}></button>
                <button onClick={() => setNewCardColor("blue")} style={{ backgroundColor: "blue" }}></button>
                <button onClick={() => setNewCardColor("blueviolet")} style={{ backgroundColor: "blueviolet" }}></button>
                <button onClick={() => setNewCardColor("deeppink")} style={{ backgroundColor: "deeppink" }}></button>
                <button onClick={() => setNewCardColor("gray")} style={{ backgroundColor: "gray" }}></button>
                <button onClick={() => setNewCardColor("seagreen")} style={{ backgroundColor: "seagreen" }}></button>
                <button onClick={() => setNewCardColor("green")} style={{ backgroundColor: "green" }}></button>
              </div>
            </div>
            <button className="cta-button" onClick={addCard}>Ajouter</button>
          </div>
        </div>
      )}

      {cardToDelete && (
        <div className="containerModal">
          <div className="modal">
            <h2>Supprimer {cardToDelete.title} ?</h2>
            <p>Êtes-vous sûr de vouloir supprimer ce thème ? Cette action est irréversible.</p>
            <button className="confirmDelete" onClick={deleteCard}>Oui, supprimer</button>
            <button className="cancelDelete" onClick={() => setCardToDelete(null)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePage;