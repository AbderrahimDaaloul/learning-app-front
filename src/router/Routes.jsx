import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import RegisterPage from "../pages/RegisterPage";
import OffersPage from "../pages/OffersPage";
import { Contact } from "lucide-react";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutUs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/offres"
       element={<OffersPage />}
      />
      <Route
        path="/Contacter"
        element={<ContactPage/>}
      />
      <Route
        path="/propos"
        element={<AboutPage />}
      />
      <Route
        path="/Contenu"
        element={<div className="p-8 text-center text-2xl">Contenu Page</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
