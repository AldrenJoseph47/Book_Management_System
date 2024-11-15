import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import ListBooksPage from './pages/ListBooksPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListingDetailPage from './pages/ListingDetailPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <h1>React is Working!</h1> {/* Basic text to verify rendering */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/list-books" element={<ListBooksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/view-book/:id" element={<ListingDetailPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
