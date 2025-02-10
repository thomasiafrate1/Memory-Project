// src/App.tsx
import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Themes from "./pages/Themespage.tsx";
import Settings from "./pages/Settingspage.tsx";
import Notification from "./pages/NotificationPage.tsx";
import Connexion from "./pages/Connexionpage.tsx";
import CardTheme from "./pages/cardThemepage.tsx";
import QuestionAnswer from "./pages/questionAnswerpage.tsx";
import Calendar from "./pages/CalendarPage.tsx";
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
      <Route path="/themes/:themeName" element={<CardTheme />} />
      <Route path="/themes/:themeName/:questionanswerName" element={<QuestionAnswer />} />
      <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};


export default App;
