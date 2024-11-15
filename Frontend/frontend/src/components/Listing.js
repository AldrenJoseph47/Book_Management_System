// src/components/Listing.js
import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../utils/api';
import BookCard from './BookCard';

const Listing = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="row">
      {books.map((book) => (
        <div className="col-md-4 mb-4" key={book._id}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default Listing;
