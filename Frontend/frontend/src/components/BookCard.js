// src/components/BookCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={book.cover_image_url} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">Author: {book.author}</p>
        <p className="card-text">Price: ${book.price}</p>
        <p className="card-text">ISBN: {book.ISBN}</p>
        <Link to={`/view-book/${book._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
