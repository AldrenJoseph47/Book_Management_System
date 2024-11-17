// src/app.js
const http = require('http');
const url = require('url');
const connectDatabase = require('./config/database');
// Load environment variables
require('dotenv').config();
const cors = require('cors');

// Connect to MongoDB
connectDatabase();

// Define server port
const PORT = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

// CORS Configuration
const corsOptions = {
  'Access-Control-Allow-Origin': 'http://localhost:3001', // Allow requests from any origin (change * to a specific origin if needed)
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
  'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allowed headers
  'Access-Control-Allow-Credentials': 'true', // Allow credentials (cookies, authorization headers)
};
  // Create an instance of the HTTP server
const server = http.createServer((req, res) => {
  // Apply CORS for all incoming requests
  cors(corsOptions)(req, res, () => {}); // Apply CORS before processing routes
  const parsedUrl = url.parse(req.url, true); // Parse the request URL
  const { pathname, method } = parsedUrl;
  // Routing
  if (pathname.startsWith('/api/auth')) {
    authRoutes(req, res);
  } else if (pathname.startsWith('/api/listings')) {
    listingRoutes(req, res);
  } else {
    // Handle unknown routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});
// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});