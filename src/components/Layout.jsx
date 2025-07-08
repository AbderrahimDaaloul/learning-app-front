// src/components/Layout.jsx
import Navbar from "./NavBar";
import Footer from "./Footer";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;