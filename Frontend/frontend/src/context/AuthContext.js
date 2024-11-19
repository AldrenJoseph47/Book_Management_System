import React, { createContext, useState, useEffect } from 'react';

// Create a Context for Authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Check if the user is logged in
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
