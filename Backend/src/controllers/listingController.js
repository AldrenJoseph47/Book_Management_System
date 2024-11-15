const Listing = require('../models/listingModel');

// Get all listings with optional query filters and pagination
const getAllListings = async (req, res) => {
  try {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const filter = {};
    const genre = urlParams.get('genre');
    const author = urlParams.get('author');
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Add genre and author filtering
    if (genre) filter.genre = genre;
    if (author) filter.author = author;

    // Price filtering
    if (minPrice) filter.price = { $gte: parseFloat(minPrice) };  // Greater than or equal to minPrice
    if (maxPrice) {
      filter.price = filter.price || {};  // Ensure filter.price exists before applying maxPrice filter
      filter.price.$lte = parseFloat(maxPrice);  // Less than or equal to maxPrice
    }

    // Fetch listings from database with filters, pagination
    const listings = await Listing.find(filter).skip(skip).limit(limit);

    // Get the total number of listings matching the filter
    const totalListings = await Listing.countDocuments(filter);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalListings / limit);

    // Send the response with listings and pagination data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ listings, page, totalPages, totalListings }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};




// Create a new listing
const createListing = async (req, res) => {
  try {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      const { title, author, genre, price, ISBN, cover_image_url, availability } = JSON.parse(body);
      const listing = new Listing({ title, author, genre, price, ISBN, cover_image_url, availability });
      await listing.save();

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Listing created successfully', listing }));
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};

// Get all books without filtering or pagination (returns all listings)
const getAllBooks = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ listings }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const listing = await Listing.findById(id); // Find the listing by ID

    if (!listing) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Listing not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ listing }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};


// Update a listing by ID
const updateListingById = async (req, res) => {
  try {
    const listingId = req.url.split('/').pop();
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      const updates = JSON.parse(body);
      const listing = await Listing.findByIdAndUpdate(listingId, updates, { new: true });

      if (!listing) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Listing not found' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Listing updated successfully', listing }));
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};

// Delete a listing by ID
const deleteListingById = async (req, res) => {
  try {
    const listingId = req.url.split('/').pop();
    const listing = await Listing.findByIdAndDelete(listingId);

    if (!listing) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Listing not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Listing deleted successfully' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server error', error }));
  }
};

module.exports = { getAllListings,createListing, getBookById, getAllBooks, updateListingById, deleteListingById };
