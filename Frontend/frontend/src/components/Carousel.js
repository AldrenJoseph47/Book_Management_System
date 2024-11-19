
import React, { useState, useEffect } from 'react';
import './Carousel.css';
        
const Carousel = () => {
const [activeIndex, setActiveIndex] = useState(0);
        
          const images = [
            "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg/220px-Harry_Potter_and_the_Chamber_of_Secrets.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg/220px-Harry_Potter_and_the_Prisoner_of_Azkaban.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png/220px-Harry_Potter_and_the_Goblet_of_Fire_cover.png",
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Harry_Potter_and_the_Order_of_the_Phoenix.jpg/220px-Harry_Potter_and_the_Order_of_the_Phoenix.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg/220px-Harry_Potter_and_the_Deathly_Hallows.jpg",
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Cursed_Child_new_poster.jpg/220px-Cursed_Child_new_poster.jpg"
          ];
        
          const handlePrev = () => {
            setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
          };
        
          const handleNext = () => {
            setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
          };
        
          // Automatic slide transition every 1 second
          useEffect(() => {
            const interval = setInterval(() => {
              handleNext();
            }, 2000); // Change to 2000ms (2 seconds) for readability
            return () => clearInterval(interval);
          }, [activeIndex]);
        
          return (
            <div id="customCarousel" className="carousel">
              <button className="carousel-control-prev" onClick={handlePrev}>
                {'<'}
              </button>
              <div className="carousel-inner">
                {images.map((image, index) => {
                  const position =
                    index === activeIndex
                      ? 'active'
                      : index === (activeIndex - 1 + images.length) % images.length
                      ? 'left'
                      : index === (activeIndex + 1) % images.length
                      ? 'right'
                      : 'hidden';
        
                  return (
                    <div key={index} className={`carousel-item ${position}`}>
                      <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                  );
                })}
              </div>
              <button className="carousel-control-next" onClick={handleNext}>
                {'>'}
              </button>
            </div>
          );
        };
        
        export default Carousel;
        