import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // Styles globaux

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => {
          console.log("✅ Service Worker enregistré :", registration);
        })
        .catch((error) => {
          console.error("❌ Erreur lors de l'enregistrement du Service Worker :", error);
        });
    });
  }
  
  
  
