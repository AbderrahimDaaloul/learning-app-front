
import React from 'react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
};

export default App;