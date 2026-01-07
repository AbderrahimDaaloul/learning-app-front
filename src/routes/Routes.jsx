import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OffersPage from "../pages/OffersPage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutUs";
import StudentDashboard from "../pages/StudentDashboard";

import AdminDashboard from "../pages/AdminDashboard";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/offres" element={<OffersPage />} />
      <Route path="/Contacter" element={<ContactPage />} />
      <Route path="/propos" element={<AboutPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />


      {/* Nested Routes for Dashboard */}
      <Route
        path="/Contenu"
        element={<div className="p-8 text-center text-2xl">Contenu Page</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
