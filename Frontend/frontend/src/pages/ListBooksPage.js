import React, { useEffect, useState } from 'react';
import { getAllBooks, deleteListing } from '../utils/api';
import { Link } from 'react-router-dom';
import './Pagination.css'; // Import the CSS file for pagination styles
import './ListBooksPage.css'; // Import custom CSS for the page styling

const ListBooksPage = () => {
  const [books, setBooks] = useState([]); // Initialize as an empty array
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books based on search
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [booksPerPage] = useState(6); // Number of books per page (6 books per page)
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        console.log('Fetched Books Data:', data); // Log data to check structure
        if (data && Array.isArray(data.listings)) {
          setBooks(data.listings); // Ensure that data is in the expected format
          setFilteredBooks(data.listings); // Initialize the filtered books
        } else {
          console.warn('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on the search term
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to page 1 when a new search is performed
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleDelete = async (id) => {
    try {
      await deleteListing(id);
      setBooks(books.filter((book) => book._id !== id)); // Remove deleted book from state
      setFilteredBooks(filteredBooks.filter((book) => book._id !== id)); // Update filtered books as well
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div>
      <h1>List of Books</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {currentBooks.length > 0 ? (
        <div className="book-cards-container">
          {currentBooks.map((book) => (
            <div key={book._id} className="book-card">
              <h5>{book.title}</h5>
              <p>{book.author}</p>

              {/* Render the book's cover image */}
              {book.cover_image_url && (
                <img
                  src={book.cover_image_url}
                  alt={`Cover of ${book.title}`}
                  className="book-cover"
                />
              )}

              <Link to={`/view-book/${book._id}`} className="btn btn-primary me-2">
                View Details
              </Link>
              <button onClick={() => handleDelete(book._id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}

      {/* Pagination Buttons */}
      <div className="pagination-container">
        <button
          title="previous"
          type="button"
          className="pagination-button"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)} // Previous button
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pagination-icon"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Page Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            type="button"
            className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
            title={`Page ${index + 1}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          title="next"
          type="button"
          className="pagination-button"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)} // Next button
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pagination-icon"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ListBooksPage;
