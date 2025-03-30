import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";

const NotificationPage = () => {
  const [dueCards, setDueCards] = useState([]);
  const [notificationTime, setNotificationTime] = useState(() => { return localStorage.getItem("notificationTime") || "20:00";});
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => { return localStorage.getItem("notificationsEnabled") === "true";});

  useEffect(() => {
    const storedSubCards = localStorage.getItem("subCards");
    if (storedSubCards) {
      try {
        const parsedSubCards = JSON.parse(storedSubCards);
        const today = new Date().toISOString().split("T")[0];
        const filteredCards = parsedSubCards.filter(
          (card) => new Date(card.nextReview).toISOString().split("T")[0] === today
        );
        setDueCards(filteredCards);
      } catch (error) {
        console.error("Erreur parsing subCards:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!notificationsEnabled) return;
    const interval = setInterval(() => {
      const now = new Date();
      const [hour, minute] = notificationTime.split(":");
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const today = new Date().toISOString().split("T")[0];
      const alreadyNotified = localStorage.getItem("notifiedToday");
      if (Notification.permission === "granted") {
        if (now.getMinutes() % 5 === 0 && now.getSeconds() === 0) {
          new Notification("Tick !", {
            body: `Il est ${now.toLocaleTimeString()}`,
          });
        }
      }
      if (parseInt(hour) === currentHour && parseInt(minute) === currentMinute && alreadyNotified !== today) {
        if (Notification.permission === "granted") {
          new Notification("C'est l'heure de réviser !");
          localStorage.setItem("notifiedToday", today);
        } else {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("C'est l'heure de réviser !");
              localStorage.setItem("notifiedToday", today);
            }
          });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [notificationTime, notificationsEnabled]);

  useEffect(() => {
    if (notificationsEnabled && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          alert("Les notifications sont désactivées.");
        }
      });
    }
  }, [notificationsEnabled]);

  const handleConfirmReminder = () => {
    localStorage.setItem("notificationTime", notificationTime);
    localStorage.setItem("notificationsEnabled", "true");
    setNotificationsEnabled(true);
    if (Notification.permission === "granted") {
      new Notification("Rappel enregistré", {
        body: `Vous serez notifié chaque jour à ${notificationTime}`,
      });
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Rappel activé !");
        } else {
          alert("Les notifications ont été refusées.");
        }
      });
    }
  };

  const clearNotifications = () => {
    const storedSubCards = localStorage.getItem("subCards");
    if (storedSubCards) {
      try {
        let parsedSubCards = JSON.parse(storedSubCards);
        const today = new Date().toISOString().split("T")[0];
        const updatedCards = parsedSubCards.filter(
          (card) => new Date(card.nextReview).toISOString().split("T")[0] !== today
        );
        localStorage.setItem("subCards", JSON.stringify(updatedCards));
        setDueCards([]);
      } catch (error) {
        console.error("Erreur lors de clear:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="notification-settings">
        <h2>Paramètres de rappel quotidien</h2>
        <label> Heure de notification :
          <input type="time" value={notificationTime} onChange={(e) => { setNotificationTime(e.target.value); localStorage.setItem("notificationTime", e.target.value);}}/>
        </label>
        <button onClick={handleConfirmReminder} className="buttonNotifRegister">
          Enregistrer le rappel
        </button>
        <button className="buttonNotifStop" onClick={() => { setNotificationsEnabled(false); localStorage.setItem("notificationsEnabled", "false"); alert("🔕 Notifications désactivées !");}}>
          Stopper les notifications
        </button>
      </div>
      <div className="notification-container">
        <div className="notification-header">
          <h1>Notifications <span className="notification-dot">🔴</span></h1>
          <button className="clear-all" onClick={clearNotifications}>Clear all</button>
        </div>
        <div className="notification-list">
          {dueCards.length > 0 ? (
            dueCards.map((card, index) => (
              <div key={index} className="notification-card">
                <div className="icon">🧑‍🏫</div>
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