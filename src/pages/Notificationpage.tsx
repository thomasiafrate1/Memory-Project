import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";

const NotificationPage = () => {
  const [dueCards, setDueCards] = useState([]);

  useEffect(() => {
    const storedSubCards = localStorage.getItem("subCards");
    if (storedSubCards) {
      try {
        const parsedSubCards = JSON.parse(storedSubCards);
        const today = new Date().toISOString().split("T")[0];

        const dueCards = parsedSubCards.filter(
          (card) => new Date(card.nextReview).toISOString().split("T")[0] === today
        );

        setDueCards(dueCards);
      } catch (error) {
        console.error("Erreur de parsing du localStorage:", error);
        setDueCards([]);
      }
    }
  }, []);

  return (
    
    <div >
      <Navbar />
      <div className="notification-container">
      <div className="notification-header">
        <h1>Notifications <span className="notification-dot">🔴</span></h1>
        <button className="clear-all">Clear all</button>
      </div>

      <div className="notification-list">
        {dueCards.length > 0 ? (
          dueCards.map((card, index) => (
            <div key={index} className="notification-card">
              <div className="icon">0</div>
              <div className="notification-content">
                <h3>{card.question}</h3>
                <p>Révision prévue aujourd'hui</p>
                <span className="time">Niveau : {card.level}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notifications">Aucune carte à réviser aujourd'hui.</p>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default NotificationPage;
