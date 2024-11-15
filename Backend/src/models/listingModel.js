// src/models/listingModel.js

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    ISBN: { type: String, unique: true, required: true },
    cover_image_url: { type: String },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', listingSchema);
