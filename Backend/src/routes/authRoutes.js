// src/routes/authRoutes.js
const { register, login, getUserData } = require('../controllers/authController');

const authRoutes = (req, res) => {
  if (req.method === 'POST' && req.url === '/api/auth/register') {
    register(req, res);
  } else if (req.method === 'POST' && req.url === '/api/auth/login') {
    login(req, res);
  } else if (req.method === 'GET' && req.url === '/api/auth/user') {
    getUserData(req, res);  // Handle fetching user data
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

module.exports = authRoutes;
