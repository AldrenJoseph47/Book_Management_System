// src/utils/jwtUtils.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // Return null if the token is invalid or expired
  }
};

module.exports = { createToken, verifyToken };
