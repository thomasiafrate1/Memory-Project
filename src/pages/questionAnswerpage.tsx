import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

const INTERVALS = [1, 3, 7, 15, 30];

const QuestionAnswerPage = () => {
  const { themeName, questionanswerName } = useParams<{ themeName: string; questionanswerName: string }>();
  const [subCards, setSubCards] = useState<{ question: string; answer: string; color: string; parent: string; level: number; nextReview: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{ question: string; answer: string; color: string; level: number; nextReview: string } | null>(null);
  const [cardToDelete, setCardToDelete] = useState<{ question: string } | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCardColor, setNewCardColor] = useState<string | null>(null);

  useEffect(() => {
    if (questionanswerName) {
      const storedSubCards = localStorage.getItem("subCards");
      if (storedSubCards) {
        try {
          const parsedSubCards = JSON.parse(storedSubCards);
          const filteredSubCards = parsedSubCards.filter(
            (card: { parent: string }) => card.parent === questionanswerName
          );
          setSubCards(filteredSubCards);
        } catch (error) {
          console.error("Erreur de parsing du localStorage:", error);
          setSubCards([]);
        }
      }
    }
  }, [questionanswerName]);

  const openCreateModal = () => {
    setIsModalOpen(true);
    setNewQuestion("");
    setNewAnswer("");
    setNewCardColor(null);
  };

  const addCard = () => {
    if (!newQuestion || !newAnswer || !newCardColor) {
      alert("Veuillez entrer une question, une réponse et choisir une couleur !");
      return;
    }
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + INTERVALS[0]);

    const newSubCard = {
      question: newQuestion,
      answer: newAnswer,
      color: newCardColor,
      parent: questionanswerName,
      level: 0, 
      nextReview: nextReviewDate.toISOString()
    };

    const updatedSubCards = [...subCards, newSubCard];

    setSubCards(updatedSubCards);
    localStorage.setItem("subCards", JSON.stringify(updatedSubCards));

    setIsModalOpen(false);
  };

  const confirmDeleteCard = (card) => {
    setCardToDelete(card);
  };

  const deleteCard = () => {
    if (cardToDelete) {
      const updatedCards = subCards.filter(card => card.question !== cardToDelete.question);
      setSubCards(updatedCards);
      localStorage.setItem("subCards", JSON.stringify(updatedCards));
      setCardToDelete(null);
    }
  };

  const openCardModal = (card) => {
    setSelectedCard(card);
    setIsFlipped(false);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const markAsReviewed = () => {
    if (!selectedCard) return;
  
    let newLevel = Math.min(selectedCard.level + 1, INTERVALS.length - 1);
    let nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + INTERVALS[newLevel]);
  
    const updatedCards = subCards.map(card =>
      card.question === selectedCard.question
        ? { ...card, level: newLevel, nextReview: nextReviewDate.toISOString() }
        : card
    );
  
    setSubCards(updatedCards);
  
    // 🔥 1️⃣ Charger les cartes déjà enregistrées dans le calendrier
    const storedCalendarData = localStorage.getItem("calendarData");
    let calendarEvents = storedCalendarData ? JSON.parse(storedCalendarData) : [];
  
    // 🔥 2️⃣ Vérifier si la carte est déjà présente et la mettre à jour
    const existingCardIndex = calendarEvents.findIndex(event => event.question === selectedCard.question);
    if (existingCardIndex !== -1) {
      calendarEvents[existingCardIndex] = { 
        ...calendarEvents[existingCardIndex], 
        level: newLevel, 
        nextReview: nextReviewDate.toISOString() 
      };
    } else {
      // 🔥 3️⃣ Ajouter la carte avec sa prochaine révision
      calendarEvents.push({
        question: selectedCard.question,
        theme: selectedCard.parent, // Associe la catégorie
        level: newLevel,
        nextReview: nextReviewDate.toISOString(),
      });
    }
  
    // 🔥 4️⃣ Sauvegarder toutes les cartes révisées dans localStorage
    localStorage.setItem("calendarData", JSON.stringify(calendarEvents));
  
    closeModal();
  };
  

  return (
    <div>
      <Navbar />
      <h1>{questionanswerName}</h1>
      <p>Page de révision de "{questionanswerName}" dans le thème "{themeName}".</p>

      {/* Liste des cartes */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {subCards.length > 0 ? (
          subCards.map((card, index) => (
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
                fontSize: "18px",
                cursor: "pointer",
                position: "relative"
              }}
              onClick={() => openCardModal(card)}
            >
              {card.question}

              {/* ❌ Bouton de suppression */}
              <button 
                className="deleteButton" 
                onClick={(e) => { e.stopPropagation(); confirmDeleteCard(card); }}
              >
                ❌
              </button>
            </div>
          ))
        ) : (
          <p>Aucune carte à réviser.</p>
        )}
      </div>

      {/* Bouton pour créer une nouvelle carte */}
      <button className="buttonCreate" onClick={openCreateModal}>Créer une carte</button>

      {/* 🔥 Popup de confirmation pour suppression */}
      {cardToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Supprimer cette carte ?</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette carte ? Cette action est irréversible.</p>
            <button className="confirmDelete" onClick={deleteCard}>Oui, supprimer</button>
            <button className="cancelDelete" onClick={() => setCardToDelete(null)}>Annuler</button>
          </div>
        </div>
      )}

            {/* Modal d'affichage d'une carte */}
            {selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className={`card-container ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
              <div className="card-content">
                <div className="card-front" style={{ backgroundColor: selectedCard.color }}>
                  <p>{selectedCard.question}</p>
                </div>
                <div className="card-back">
                  <p>{selectedCard.answer}</p>
                </div>
              </div>
            </div>
            <button onClick={markAsReviewed}>✅ Révisée</button>
            <button className="closeModal" onClick={closeModal}>✖</button>
          </div>
        </div>
      )}

      {/* Modal de création d'une nouvelle carte */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h1>Créer une carte</h1>
            <button className="closeModal" onClick={() => setIsModalOpen(false)}>✖</button>
            <input type="text" placeholder="Question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
            <input type="text" placeholder="Réponse" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
            <p>Choisissez une couleur :</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "10px" }}>
              {["blue", "yellow", "green", "pink", "black", "white", "red"].map((color) => (
                <button key={color} onClick={() => setNewCardColor(color)} style={{ backgroundColor: color, width: "40px", height: "40px" }}></button>
              ))}
            </div>
            <button onClick={addCard}>Ajouter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerPage;
