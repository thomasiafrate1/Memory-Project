import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  // Fonction pour charger les événements
  const fetchCalendarEvents = () => {
    const storedCalendarData = localStorage.getItem("calendarData");
    if (storedCalendarData) {
      try {
        const parsedCalendarData = JSON.parse(storedCalendarData);
        setEvents(parsedCalendarData);
      } catch (error) {
        console.error("Erreur de parsing du localStorage:", error);
        setEvents([]);
      }
    }
  };

  // ✅ Fonction pour supprimer toutes les révisions du calendrier
  const clearCalendar = () => {
    localStorage.removeItem("calendarData"); // Supprime les données du stockage local
    setEvents([]); // Vide l'état React
    console.log("✅ Toutes les révisions ont été supprimées !");
  };

  return (
    <div>
      <Navbar />
      <div className="calendar-container">
        <div className="calendar-header">
          <h1>Calendrier des révisions</h1>
          <button className="clear-all" onClick={clearCalendar}>Clear all</button> {/* Bouton ajouté ici */}
        </div>
        <div className="calendar-list">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="calendar-card">
                <div className="icon">📊</div>
                <div className="calendar-content">
                  <h3>{event.theme} - {event.question}</h3>
                  <p>Prochaine révision : <strong>{new Date(event.nextReview).toLocaleDateString()}</strong></p>
                  <span className="level">Niveau : {event.level + 1}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">Aucune révision prévue.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
