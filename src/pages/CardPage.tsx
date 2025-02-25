import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { defaultQuestions } from "../store/defaultData.ts";

const INTERVALS = [1, 3, 7, 15, 30];

const CardPage = () => {
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
      let userSubCards = [];
  
      if (storedSubCards) {
        try {
          userSubCards = JSON.parse(storedSubCards).filter(
            (card) => card.parent === questionanswerName
          );
        } catch (error) {
          console.error("Erreur de parsing du localStorage:", error);
        }
      }
  
      const defaultSubCards = defaultQuestions[questionanswerName] || [];
  
      // 🔥 Correction : Vérifier que chaque carte a bien level et nextReview
      const fixedSubCards = [...defaultSubCards, ...userSubCards].map(card => ({
        ...card,
        level: card.level ?? 0, // Si level est manquant, on met 0
        nextReview: card.nextReview ?? new Date().toISOString(), // Si nextReview est manquant, on met la date actuelle
      }));
  
      setSubCards(fixedSubCards);
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
      alert("Faut entrer une question, une réponse et choisir une couleur !");
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
    updateLocalStorage(updatedSubCards);

    setIsModalOpen(false);
  };
  const confirmDeleteCard = (card) => {
    setCardToDelete(card);
  };

  const deleteCard = () => {
    if (cardToDelete) {
      const updatedCards = subCards.filter(card => card.question !== cardToDelete.question);
      setSubCards(updatedCards);
      updateLocalStorage(updatedCards);
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
    if (!selectedCard) {
      console.error("ERREUR: selectedCard est null !");
      return;
    }
  
    console.log("🔍 Avant mise à jour - Carte sélectionnée :", selectedCard);
  
    setSubCards(prevCards => {
      const updatedCards = prevCards.map(card => {
        if (card.question === selectedCard.question) {
          let currentLevel = card.level ?? 0;
          let newLevel = Math.min(currentLevel + 1, INTERVALS.length - 1);
  
          console.log(`⬆️ Passage de niveau : ${currentLevel} ➡️ ${newLevel}`);
  
          let nextReviewDate = new Date();
          nextReviewDate.setDate(nextReviewDate.getDate() + INTERVALS[newLevel]);
  
          console.log(`📅 Nouvelle date de révision : ${nextReviewDate.toISOString()}`);
  
          return { 
            ...card, 
            level: newLevel, 
            nextReview: nextReviewDate.toISOString() 
          };
        }
        return card;
      });
  
      console.log("🔄 Mise à jour des cartes dans le state :", updatedCards);
  
      updateLocalStorage(updatedCards);
      return updatedCards; // Mise à jour de l'état React
    });
  
    closeModal();
  };
  
  
  
  
  
  


  const markAsFailed = () => {
    if (!selectedCard) return;

    let newLevel = 0; // Remet au niveau 0
    let nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + INTERVALS[newLevel]);

    const updatedCards = subCards.map(card =>
      card.question === selectedCard.question
        ? { ...card, level: newLevel, nextReview: nextReviewDate.toISOString() }
        : card
    );

    setSubCards(updatedCards);
    updateLocalStorage(updatedCards);

    closeModal();
  };

  const updateLocalStorage = (updatedCards) => {
    localStorage.setItem("subCards", JSON.stringify(updatedCards));

    let storedCalendarData = localStorage.getItem("calendarData");
    let calendarEvents = storedCalendarData ? JSON.parse(storedCalendarData) : [];

    updatedCards.forEach(card => {
      const existingCardIndex = calendarEvents.findIndex(event => event.question === card.question);
      if (existingCardIndex !== -1) {
        calendarEvents[existingCardIndex] = {
          ...calendarEvents[existingCardIndex],
          level: card.level,
          nextReview: card.nextReview
        };
      } else {
        calendarEvents.push({
          question: card.question,
          theme: card.parent,
          level: card.level,
          nextReview: card.nextReview,
        });
      }
    });

    localStorage.setItem("calendarData", JSON.stringify(calendarEvents));
  };
  
  

  return (
    <div>
      <Navbar />
      <h1 className="titleTheme">{questionanswerName}</h1>
      <p className="descriptionTitle">Page de révision de "{questionanswerName}" dans le thème "{themeName}".</p>
      <div className="containerQuestionAnswerTheme">
        {subCards.length > 0 ? (
          subCards.map((card, index) => (
            <div key={index} className="card" style={{backgroundColor: card.color}} onClick={() => openCardModal(card)}>
               <h3>{card.question}</h3>
              <button className="deleteButton" onClick={(e) => { e.stopPropagation(); confirmDeleteCard(card); }}>
              ✖
              </button>
            </div>
          ))
        ) : (
          <p>Aucune carte à réviser.</p>
        )}
      </div>

      <button className="buttonCreate" onClick={openCreateModal}>Créer une carte +</button>

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
            <div className="buttonRewied">
              <button onClick={markAsReviewed}>Réussi ✅</button>
              <button onClick={markAsFailed}>Échoué ❌</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="containerModal">
          <div className="modal">
            <h1>Créer une carte</h1>
            <button className="closeModal" onClick={() => setIsModalOpen(false)}>✖</button>
            <input className="inputTitre" type="text" placeholder="Question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
            <input className="inputTitre" type="text" placeholder="Réponse" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
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
                <button onClick={() => setNewCardColor("grey")} style={{ backgroundColor: "grey" }}></button>
              </div>
            </div>
            <button className="cta-button" onClick={addCard}>Ajouter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPage;
