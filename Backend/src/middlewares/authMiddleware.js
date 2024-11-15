// src/middleware/authMiddleware.js

const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Authorization header missing' }));
  }

  const token = authHeader.split(' ')[1]; // Expecting 'Bearer <token>'

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Invalid token' }));
    }

    // Attach user data from token to the request
    req.user = decoded;
    next();
  } catch (error) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Token verification failed' }));
  }
};

module.exports = authMiddleware;
