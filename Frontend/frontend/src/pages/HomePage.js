import React from 'react';
import './HomePage.css';
import Article from '../components/Article';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to the Book Management App</h1>
        <p>Your one-stop solution for managing your book listings.</p>
      </header>

      <section className="featured-article">
        <Article
          title="Mastering Book Management: Tips & Tricks"
          author="Aldren Joseph"
          date="November 15, 2024"
          readTime="5 min read"
          views="2,350"
          imageUrl="https://source.unsplash.com/75x75/?book"
          content="Discover how to organize, update, and manage your book listings effectively using our app. Learn about the best practices, tricks, and tips for seamless book management."
          tags={['BookManagement', 'ReactJS', 'MongoDB']}
          relatedPosts={[
            'How to Add and Update Book Listings',
            'Best UI Libraries for React Projects',
            'Optimizing Book Database Queries',
          ]}
        />
      </section>
    </div>
  );
};

export default HomePage;
