// src/App.tsx
import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Themes from "./pages/Themespage.tsx";
import Settings from "./pages/Settingspage.tsx";
import Notification from "./pages/Notificationpage.tsx";
import Connexion from "./pages/Connexionpage.tsx";
// import ThemesPage from "./pages/ThemesPage";  // Page de gestion des thèmes
// import SettingsPage from "./pages/SettingsPage";  // Page de paramètres

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/themes" element={<Themes />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/connexion" element={<Connexion />} />
      </Routes>
    </Router>
  );
};


export default App;
