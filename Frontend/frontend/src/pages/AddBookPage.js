import React, { useState } from 'react';
import { addNewListing } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './AddBookPage.css'; // Import the CSS for styling

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    ISBN: '',
    cover_image_url: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewListing(formData);
      navigate('/list-books');
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-book-card">
        <h1 className="add-book-title">Add a New Book</h1>
        <form onSubmit={handleSubmit} className="add-book-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>ISBN</label>
            <input
              type="text"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Cover Image URL</label>
            <input
              type="text"
              name="cover_image_url"
              value={formData.cover_image_url}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="add-book-btn">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
