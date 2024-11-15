const http = require('http');
const { createListing, getAllListings, getBookById, getAllBooks, updateListingById, deleteListingById } = require('../controllers/listingController');

// Define the routes
const listingRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  // Route for listing all books without pagination (retrieves all books)
  if (url === '/api/listings/all' && method === 'GET') {
    getAllBooks(req, res); // Fetches all listings without any filtering or pagination
  }
  else if (url.startsWith('/api/listings/') && method === 'GET') {
    // Extract the ID from the URL
    const id = url.split('/')[3]; // Assumes URL structure is /api/listings/:id
    req.params = { id }; // Add the ID to the request object
    getBookById(req, res); // Fetches a listing by ID
  }
  // // Route for getting all listings with filtering (author, genre, price range) and pagination
  else if (url.startsWith('/api/listings') && method === 'GET') {
    getAllListings(req, res); // Handles filtering and pagination for listings
  }



  // Route for creating a new listing
  else if (url === '/api/listings' && method === 'POST') {
    createListing(req, res);
  }  
  // Route for updating a specific listing by ID
  else if (url.match(/^\/api\/listings\/([a-fA-F0-9]{24})$/) && method === 'PUT') {
    updateListingById(req, res); // Updates a specific listing based on the ID in the URL
  }
  // Route for deleting a specific listing by ID
  else if (url.match(/^\/api\/listings\/([a-fA-F0-9]{24})$/) && method === 'DELETE') {
    deleteListingById(req, res); // Deletes a specific listing based on the ID in the URL
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

module.exports = listingRoutes;
