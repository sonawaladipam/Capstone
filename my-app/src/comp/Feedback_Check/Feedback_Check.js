import React, { useState } from 'react';
import Header from '../header/header'; // Adjust path as necessary
import Footer from '../Footer/footer'; // Adjust path as necessary
import './feedback_check.css'; // Adjust path as necessary

const FeedbackCheck = () => {
  // Sample feedback data for demonstration
  const initialFeedback = [
    {
      id: 1,
      quote: "A quote from customer 1.",
      name: "John Doe",
      description: "Customer",
      image: "https://via.placeholder.com/50" // Placeholder image URL
    },
    {
      id: 2,
      quote: "A quote from customer 2.",
      name: "Jane Smith",
      description: "Client",
      image: "https://via.placeholder.com/50" // Placeholder image URL
    }
  ];

  // State to manage feedback items and "See More" button visibility
  const [feedbackItems, setFeedbackItems] = useState(initialFeedback);
  const [showAll, setShowAll] = useState(false);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  return (
    <div className="feedback-container">
      <Header />
      {feedbackItems.map((feedback, index) => (
        <div key={feedback.id} className={`feedback-card ${!showAll && index > 0 ? 'hidden' : ''}`}>
          <blockquote className="feedback-quote">
            {feedback.quote}
          </blockquote>
          <div className="feedback-author">
            <img src={feedback.image} alt="Customer" className="author-image" />
            <div className="author-details">
              <div className="author-name">{feedback.name}</div>
              <div className="author-description">{feedback.description}</div>
            </div>
          </div>
        </div>
      ))}
      {!showAll && (
        <button className="see-more-button" onClick={handleSeeMore}>See More</button>
      )}
      <Footer />
    </div>
  );
};

export default FeedbackCheck;
