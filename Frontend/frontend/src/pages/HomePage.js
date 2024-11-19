import React from 'react';
import './HomePage.css';
import Article from '../components/Article';
import Carousel from '../components/Carousel';


const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to the Book Management App</h1>
        <p>Your one-stop solution for managing your book listings.</p>
      </header>
      <h2>Featured Article</h2>
      <section className="featured-article">
        <Article
          title="Mastering Book Management: Tips & Tricks"
          author="Aldren Joseph"
          date="November 15, 2024"
          readTime="5 min read"
          views="2,350"
          content="Discover how to organize, update, and manage your book listings effectively using our app. Learn about the best practices, tricks, and tips for seamless book management."
          tags={['BookManagement', 'ReactJS', 'MongoDB']}
          relatedPosts={[
            'How to Add and Update Book Listings',
            'Best UI Libraries for React Projects',
            'Optimizing Book Database Queries',
          ]}
        />
      </section>
      <h2>Top Selling Books</h2>
      <Carousel />

    </div>
  );
};

export default HomePage;
