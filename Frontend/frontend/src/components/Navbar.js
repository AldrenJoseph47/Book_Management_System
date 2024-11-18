import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Get the current location to determine the active link

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          Book Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* Pushes links to the right */}
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/list-books' ? 'active' : ''}`}
                to="/list-books"
              >
                List Books
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/add-book' ? 'active' : ''}`}
                to="/add-book"
              >
                Add Book
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/CombinedLoginRegister' ? 'active' : ''}`}
                to="/CombinedLoginRegister"
              >
                Authenticate
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
