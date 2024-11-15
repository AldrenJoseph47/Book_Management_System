// src/config/database.js

const mongoose = require('mongoose');
const uri = "mongodb+srv://aldrenjoseph:aldrenjoseph47@faith.y6xji.mongodb.net/book_management?retryWrites=true&w=majority&appName=faith";

const connectDB = async () => {
  try {
    await mongoose.connect(uri); // Removed deprecated options
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
