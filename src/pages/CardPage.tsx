import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const [cardToEdit, setCardToEdit] = useState(null);
  const navigate = useNavigate();

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
      const fixedSubCards = [...defaultSubCards, ...userSubCards].map(card => ({
        ...card,
        level: card.level ?? 0,
        nextReview: card.nextReview ?? new Date().toISOString(), 
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
    let storedSubCards = localStorage.getItem("subCards");
    let updatedSubCards = storedSubCards ? JSON.parse(storedSubCards) : [];
    if (cardToEdit) {
      const oldQuestion = cardToEdit.question;
      updatedSubCards = updatedSubCards.map(card =>
        card.question === oldQuestion && card.parent === questionanswerName ? {
              ...card,
              question: newQuestion,
              answer: newAnswer,
              color: newCardColor,
            } : card
      );
      const storedCalendarData = localStorage.getItem("calendarData");
      if (storedCalendarData) {
        let calendarEvents = JSON.parse(storedCalendarData);
        calendarEvents = calendarEvents.map(event =>
          event.question === oldQuestion && event.theme === questionanswerName
            ? { ...event, question: newQuestion }
            : event
        );
        localStorage.setItem("calendarData", JSON.stringify(calendarEvents));
      }
      setSubCards(subCards.map(card =>
        card.question === oldQuestion ? { ...card, question: newQuestion, answer: newAnswer, color: newCardColor } : card
      ));
      setCardToEdit(null);
    } else {
      const newSubCard = {
        question: newQuestion,
        answer: newAnswer,
        color: newCardColor,
        parent: questionanswerName,
        level: 0,
        nextReview: nextReviewDate.toISOString()
      };
      updatedSubCards.push(newSubCard);
      setSubCards([...subCards, newSubCard]);
    }
    updateLocalStorage(updatedSubCards); setNewQuestion(""); setNewAnswer(""); setNewCardColor(null); setIsModalOpen(false);
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
      console.error("❌ ERREUR: selectedCard est null !");
      return;
    }
    let storedSubCards = localStorage.getItem("subCards");
    let updatedCards = storedSubCards ? JSON.parse(storedSubCards) : [];
    let updatedCard = updatedCards.find(card => card.question === selectedCard.question);
    if (updatedCard) {
      let currentLevel = updatedCard.level ?? 0;
      let newLevel = Math.min(currentLevel + 1, INTERVALS.length - 1);
      let nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + INTERVALS[newLevel]);
      updatedCard.level = newLevel;
      updatedCard.nextReview = nextReviewDate.toISOString();
      localStorage.setItem("subCards", JSON.stringify(updatedCards));
      updateLocalStorage(updatedCards, updatedCard);

    }
    setSubCards(updatedCards);
    setSelectedCard(null);
    closeModal();
  };
  
  const markAsFailed = () => {
    if (!selectedCard) {
      console.error("❌ ERREUR: selectedCard est null !");
      return;
    }
    let storedSubCards = localStorage.getItem("subCards");
    let updatedCards = storedSubCards ? JSON.parse(storedSubCards) : [];
    let updatedCard = updatedCards.find(card => card.question === selectedCard.question);
    if (updatedCard) {
      let newLevel = 0;
      let nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + INTERVALS[newLevel]);
      updatedCard.level = newLevel;
      updatedCard.nextReview = nextReviewDate.toISOString();
      localStorage.setItem("subCards", JSON.stringify(updatedCards));
      updateLocalStorage(updatedCards, updatedCard);
    }
    setSubCards(updatedCards);
    setSelectedCard(null);
    closeModal();
  };
  
  const updateLocalStorage = (updatedCards, updatedCard) => {
    localStorage.setItem("subCards", JSON.stringify(updatedCards));
    if (!updatedCard) return;
    let storedCalendarData = localStorage.getItem("calendarData");
    let calendarEvents = storedCalendarData ? JSON.parse(storedCalendarData) : [];
    const existingCardIndex = calendarEvents.findIndex(event => event.question === updatedCard.question);
    if (existingCardIndex !== -1) {
      calendarEvents[existingCardIndex] = {
        ...calendarEvents[existingCardIndex],
        level: updatedCard.level,
        nextReview: updatedCard.nextReview
      };
    } else {
      calendarEvents.push({
        question: updatedCard.question,
        theme: updatedCard.parent,
        level: updatedCard.level,
        nextReview: updatedCard.nextReview,
      });
    }
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
              <button className="deleteButton" onClick={(e) => { e.stopPropagation(); confirmDeleteCard(card); }}>✖</button>
              <button className="editButton" onClick={(e) => {e.stopPropagation(); setCardToEdit(card); setNewQuestion(card.question); setNewAnswer(card.answer); setNewCardColor(card.color); setIsModalOpen(true);}}>✎</button>
            </div>
          ))
        ) : (
          <p>Aucune carte à réviser.</p>
        )}
      </div>

      <button className="buttonCreate" onClick={openCreateModal} aria-label="Créer une carte +"></button>
      <div className="buttonReturn" onClick={() => navigate(`/themes/${themeName}`)}>⭠</div>

      {cardToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Supprimer cette carte ?</h2>
            <p>Êtes-vous sûr de vouloir supprimer cette carte ?</p>
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
    </div>
  );
};

export default CardPage;