import React, { createContext, useState, useEffect } from 'react';

// Create a Context for Authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('User data fetch failed');

      const data = await response.json();
      setUser(data.user || null);
    } catch (error) {
      console.error(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

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
