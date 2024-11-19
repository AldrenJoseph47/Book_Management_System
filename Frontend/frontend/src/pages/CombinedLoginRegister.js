// src/pages/CombinedLoginRegister.js

import React, { useState, useContext } from 'react';
import './CombinedLoginRegister.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CombinedLoginRegister = () => {
  const { login } = useContext(AuthContext); // Get the login function from AuthContext
  const navigate = useNavigate(); // Navigate to different pages after successful login
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input changes for both forms
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler for login or register
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister
      ? 'http://localhost:3000/api/auth/register'
      : 'http://localhost:3000/api/auth/login';

    const payload = isRegister
      ? { username: formData.username, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Authentication failed');
        return;
      }

      if (data.token) {
        login(data.token); // Store token and update AuthContext
        navigate('/list-books'); // Navigate to the list-books page
      } else {
        alert('Unexpected error. Please try again.');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setIsRegister(!isRegister)} // Toggle between forms
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            {/* Login Form */}
            <div className={`flip-card__front ${!isRegister ? 'active' : ''}`}>
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button className="flip-card__btn" type="submit">
                  Let`s go!
                </button>
              </form>
            </div>
            {/* Registration Form */}
            <div className={`flip-card__back ${isRegister ? 'active' : ''}`}>
              <div className="title">Sign up</div>
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  name="username"
                  placeholder="UserName"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required={isRegister} // Only required during registration
                />
                <input
                  className="flip-card__input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="flip-card__input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button className="flip-card__btn" type="submit">
                  Confirm!
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default CombinedLoginRegister;
