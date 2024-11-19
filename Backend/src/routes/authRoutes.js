// src/routes/authRoutes.js
const { register, login, getUserData } = require('../controllers/authController');

const authRoutes = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Handle POST requests to /api/auth/register
  if (req.method === 'POST' && pathname === '/api/auth/register') {
    return register(req, res);
  }

  // Handle POST requests to /api/auth/login
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    return login(req, res);
  }

  // Handle GET requests to /api/auth/user
  if (req.method === 'GET' && pathname === '/api/auth/user') {
    return getUserData(req, res);
  }

  // Handle route not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
};

module.exports = authRoutes;
