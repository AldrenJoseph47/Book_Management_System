import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import ListBooksPage from './pages/ListBooksPage';
import ListingDetailPage from './pages/ListingDetailPage';
import Footer from './components/Footer';
import CombinedLoginRegister from './pages/CombinedLoginRegister';
import './App.css';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/list-books" element={<ListBooksPage />} />
          <Route path="/CombinedLoginRegister" element={<CombinedLoginRegister />} />
          <Route path="/view-book/:id" element={<ListingDetailPage />} />

        </Routes>
      </div>
      <Footer />
    </Router>
    </AuthProvider>
  );
};

export default App;
