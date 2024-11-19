// src/app.js
const http = require('http');
const url = require('url');
const connectDatabase = require('./config/database');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
connectDatabase();

// Define server port
const PORT = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

// Create an instance of the HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Preflight request handling (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204); // No Content
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true); // Parse the request URL
  const { pathname, method } = parsedUrl;

  try {
    // Routing
    if (pathname.startsWith('/api/auth')) {
      authRoutes(req, res, parsedUrl, method);
    } else if (pathname.startsWith('/api/listings')) {
      listingRoutes(req, res, parsedUrl, method);
    } else {
      // Handle unknown routes
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch (error) {
    // Centralized error handling
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
