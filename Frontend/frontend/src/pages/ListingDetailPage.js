import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { getListingById, updateListing, deleteListing } from '../utils/api';

const ListingDetailPage = () => {
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    ISBN: '',
    cover_image_url: '',
  });

  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getListingById(id);
        setBook(data.listing);
        setFormData({
          title: data.listing.title,
          author: data.listing.author,
          genre: data.listing.genre,
          price: data.listing.price,
          ISBN: data.listing.ISBN,
          cover_image_url: data.listing.cover_image_url,
        });
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Ensure formData is structured as expected
      await updateListing(id, formData);
      navigate('/list-books'); // Redirect after successful update
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteListing(id);
      navigate('/list-books'); // Redirect to the book list page after deletion
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  const handleBack = () => {
    navigate('/list-books'); // Navigate back to the List of Books page
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      <button onClick={handleBack} className="btn btn-secondary mb-3">
        Back to List
      </button>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            name="ISBN"
            value={formData.ISBN}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cover Image URL</label>
          <input
            type="text"
            name="cover_image_url"
            value={formData.cover_image_url}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Update Book
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="btn btn-danger"
        >
          Delete Book
        </button>
      </form>
    </div>
  );
};

export default ListingDetailPage;
