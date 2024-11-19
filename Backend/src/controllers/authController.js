// src/controllers/authController.js

const User = require('../models/userModel');
const { createToken } = require('../utils/jwtUtils');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { verifyToken } = require('../utils/jwtUtils'); // Import verifyToken function

// Register a new user
const register = async (req, res) => {
  try {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const { username, email, password } = JSON.parse(body);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'User already exists' }));
        }

        // Hash the password and save the user
        const hashedPassword = await hashPassword(password);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User registered successfully' }));
      } catch (error) {
        // Error in JSON parsing or user creation
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid input or user registration failed', error }));
      }
    });
  } catch (error) {
    // Server error (e.g., database connection issues)
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};

// Login user
const login = async (req, res) => {
  try {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(body);

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }

        // Verify password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }

        // Create and send JWT
        const token = createToken({ userId: user._id });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login successful', token }));
      } catch (error) {
        // Error in JSON parsing or other issues
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid input or login failed', error }));
      }
    });
  } catch (error) {
    // Server error
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};

// Get user data
const getUserData = async (req, res) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.writeHead(401, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'Authorization token is missing' }));
    }

    // Verify the token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.writeHead(401, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'Invalid or expired token' }));
    }

    // Fetch the user data from the database
    const user = await User.findById(decoded.userId).select('-password'); // Exclude password from the response
    if (!user) {
      return res.writeHead(404, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User not found' }));
    }

    // Respond with user data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ user }));
  } catch (error) {
    // Server error (logging the error for debugging purposes)
    console.error('Error fetching user data:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};

module.exports = { register, login, getUserData };
