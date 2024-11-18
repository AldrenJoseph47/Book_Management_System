const http = require('http');
const {
  createListing,
  getAllListings,
  getBookById,
  getAllBooks,
  updateListingById,
  deleteListingById
} = require('../controllers/listingController');

const listingRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/api/listings/all' && method === 'GET') {
    getAllBooks(req, res);
    return;
  } else if (url.startsWith('/api/listings/') && method === 'GET') {
    const id = url.split('/')[3];
    req.params = { id };
    getBookById(req, res);
    return;
  } else if (url.startsWith('/api/listings') && method === 'GET') {
    getAllListings(req, res);
    return;
  } else if (url === '/api/listings' && method === 'POST') {
    createListing(req, res);
    return;
  } else if (url.match(/^\/api\/listings\/([a-fA-F0-9]{24})$/) && method === 'PUT') {
    updateListingById(req, res);
    return;
  } else if (url.match(/^\/api\/listings\/([a-fA-F0-9]{24})$/) && method === 'DELETE') {
    deleteListingById(req, res);
    return;
  } else {
    if (!res.headersSent) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  }
};

module.exports = listingRoutes;