import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const CardThemePage = () => {
  const { themeName } = useParams<{ themeName: string }>();
  const [cards, setCards] = useState<{ title: string; color: string; theme: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardColor, setNewCardColor] = useState<string | null>(null);
  const [cardToDelete, setCardToDelete] = useState<{ title: string; color: string; theme: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (themeName) {
      const storedCards = localStorage.getItem("cards");
      if (storedCards) {
        try {
          const parsedCards = JSON.parse(storedCards);
          const filteredCards = parsedCards.filter((card: { theme: string }) => card.theme === themeName);
          setCards(filteredCards);
        } catch (error) {
          console.error("Erreur de parsing du localStorage:", error);
          setCards([]);
        }
      }
    }
  }, [themeName]);

  const addCard = () => {
    if (!newCardTitle || !newCardColor) {
      alert("Veuillez entrer un titre et choisir une couleur !");
      return;
    }
    const newCard = { title: newCardTitle, color: newCardColor, theme: themeName };
    const updatedCards = [...cards, newCard];

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify([...JSON.parse(localStorage.getItem("cards") || "[]"), newCard]));

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
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      setCardToDelete(null);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>{themeName}</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", padding: "20px" }}>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div 
              key={index} 
              className="card" 
              style={{ 
                backgroundColor: card.color, 
                width: "150px", 
                height: "200px", 
                borderRadius: "10px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: card.color === "black" ? "white" : "black",
                fontWeight: "bold",
                fontSize: "18px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                position: "relative",
                cursor: "pointer"
              }}
              onClick={() => navigate(`${window.location.pathname}/${card.title}`)}
            >
              {card.title}
              
              <button 
                className="deleteButton" 
                onClick={(e) => { e.stopPropagation(); confirmDeleteCard(card); }}
              >
                X
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>Aucune carte disponible pour ce thème.</p>
        )}
      </div>
      <button 
        className="buttonCreate" 
        onClick={() => setIsModalOpen(true)} 
        style={{ display: "block", margin: "20px auto", padding: "10px 20px", fontSize: "16px" }}
      >
        Ajouter une carte
      </button>

      <Footer />

      {isModalOpen && (
        <div className="modal">
          <h1>Ajouter une carte</h1>
          <button className="closeModal" onClick={() => setIsModalOpen(false)}>✖</button>
          <div className="formulaireModal">
            <div>
              <input 
                type="text" 
                placeholder="Titre" 
                className="inputTitre" 
                value={newCardTitle} 
                onChange={(e) => setNewCardTitle(e.target.value)} 
              />
            </div>
            <div className="formulaireCouleurModal">
              <p>Choisissez une couleur :</p>
              <div className="divCouleur">
                <button onClick={() => setNewCardColor("blue")} style={{ backgroundColor: "blue" }}></button>
                <button onClick={() => setNewCardColor("yellow")} style={{ backgroundColor: "yellow" }}></button>
                <button onClick={() => setNewCardColor("green")} style={{ backgroundColor: "green" }}></button>
                <button onClick={() => setNewCardColor("pink")} style={{ backgroundColor: "pink" }}></button>
                <button onClick={() => setNewCardColor("black")} style={{ backgroundColor: "black", color: "white" }}></button>
                <button onClick={() => setNewCardColor("white")} style={{ backgroundColor: "white", border: "1px solid black" }}></button>
                <button onClick={() => setNewCardColor("red")} style={{ backgroundColor: "red" }}></button>
              </div>
            </div>
            <button onClick={addCard}>Ajouter</button>
          </div>
        </div>
      )}

      {cardToDelete && (
        <div className="containerModal">
          <div className="modal">
            <h2>Supprimer {cardToDelete.title} ?</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette carte ? Cette action est irréversible.</p>
            <button className="confirmDelete" onClick={deleteCard}>Oui, supprimer</button>
            <button className="cancelDelete" onClick={() => setCardToDelete(null)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardThemePage;
