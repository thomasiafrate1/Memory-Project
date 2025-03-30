import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Themes from "./pages/CategoryPage.tsx";
import Notification from "./pages/NotificationPage.tsx";
import CardTheme from "./pages/ThemePage.tsx";
import QuestionAnswer from "./pages/CardPage.tsx";
import Calendar from "./pages/CalendarPage.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/themes" element={<Themes />} />
      <Route path="/notifications" element={<Notification />} />
      <Route path="/themes/:themeName" element={<CardTheme />} />
      <Route path="/themes/:themeName/:questionanswerName" element={<QuestionAnswer />} />
      <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};


export default App;
