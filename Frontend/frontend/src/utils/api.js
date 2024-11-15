// src/utils/api.js

export const getAllBooks = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/listings/all`);
    if (!response.ok) throw new Error(`Failed to fetch books: ${response.statusText}`);
    
    const data = await response.json();
    console.log('Fetched Books:', data); // Check what `data` contains
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Function to fetch book by ID
export const getListingById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/listings/${id}`);
  if (!response.ok) throw new Error('Failed to fetch book details');
  return await response.json();
};

// Function to add a new book
export const addNewListing = async (bookData) => {
  const response = await fetch(`http://localhost:3000/api/listings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error('Failed to add book');
  return await response.json();
};

export const updateListing = async (id, formData) => {
  try {
    // Convert bookData to a JSON string
    const response = await fetch(`http://localhost:3000/api/listings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
      body: JSON.stringify(formData), // Convert to raw JSON
    });

    if (!response.ok) {
      throw new Error(`Failed to update book: ${response.statusText}`);
    }
    
    // Return the response as JSON
    return await response.json();
  } catch (error) {
    console.error('Error in updateListing:', error);
    throw error; // Re-throw error for further handling
  }
};

// Function to delete a book
export const deleteListing = async (id) => {
  const response = await fetch(`http://localhost:3000/api/listings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete book');
  return await response.json();
};

// src/utils/api.js

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An error occurred during registration' };
  }
};
