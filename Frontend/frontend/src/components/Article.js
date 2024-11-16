import React from 'react';
import './Article.css';

const Article = ({ title, author, date, readTime, views, imageUrl, content, tags, relatedPosts }) => {
  return (
    <div className="article-container">
      <article className="article-content">
        <div className="article-header">
          <h1>{title}</h1>
          <div className="article-meta">
            <div className="author-info">
              <img src={imageUrl} alt={`${author}'s profile`} className="author-image" />
              <p>{`${author} • ${date}`}</p>
            </div>
            <p>{`${readTime} • ${views} views`}</p>
          </div>
        </div>
        <div className="article-body">
          <p>{content}</p>
        </div>
      </article>

      <div className="article-footer">
        <div className="article-tags">
          {tags.map((tag, index) => (
            <a href="#" key={index} className="tag">
              #{tag}
            </a>
          ))}
        </div>
        <div className="related-posts">
          <h4>Related posts</h4>
          <ul>
            {relatedPosts.map((post, index) => (
              <li key={index}>
                <a href="#" className="related-link">
                  {post}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Article;
