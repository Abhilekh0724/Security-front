import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryByIdApi, getReviewsByCategoryApi, postReviewApi, createBookingApi } from '../../api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from 'react-icons/fa';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [bookingDate, setBookingDate] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryByIdApi(id);
        if (response.data.success) {
          setCategory(response.data.category);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching category');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await getReviewsByCategoryApi(id);
        if (response.data.success) {
          setComments(response.data.reviews);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching reviews');
      }
    };

    fetchCategory();
    fetchReviews();
  }, [id]);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async () => {
    if (!token) {
      toast.error('Please log in to submit a comment.');
      return;
    }

    if (comment.trim() && rating > 0) {
      try {
        const reviewData = { categoryId: id, comment, rating };
        const response = await postReviewApi(reviewData);
        if (response.data.success) {
          setComments([...comments, response.data.review]);
          setComment('');
          setRating(0);
          toast.success('Comment added!');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error posting comment');
      }
    } else {
      toast.error('Comment cannot be empty and rating must be selected');
    }
  };

  const handleRatingChange = (newRating) => setRating(newRating);

  const handleBookingSubmit = async () => {
    if (!token) {
      toast.error('Please log in to book.');
      return;
    }

    if (!bookingDate) {
      toast.error('Please select a date for booking.');
      return;
    }
    try {
      const bookingData = { categoryId: id, bookingDate };
      const response = await createBookingApi(bookingData);
      if (response.data.success) {
        toast.success('Booking confirmed. Payment should be made 5 days before the booked date, or it will get canceled.', {
          autoClose: 3000,
        });
      } else {
        toast.error(response.data.message, {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Error creating booking.', {
        autoClose: 3000,
      });
    }
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / comments.length).toFixed(1);
  };

  if (!category) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="category-detail">
      <div className="category-header">
        <img
          src={`http://localhost:5500${category.photo}`}
          alt={category.name}
          className="category-image"
        />
        <div className="category-info">
          <h1 className="category-title">{category.name}</h1>
          <p className="category-description">{category.info}</p>
          <p className="category-price">Price: ${category.price}</p>
        </div>
      </div>

      <div className="booking-section">
        <h2>Book This Venue</h2>
        {token ? (
          <div className="booking-form">
            <label htmlFor="bookingDate" className="booking-label">Select Date:</label>
            <input
              type="date"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="booking-input"
            />
            <button onClick={handleBookingSubmit} className="booking-button">Book Now</button>
          </div>
        ) : (
          <p className="login-prompt">Please log in to book this venue.</p>
        )}
      </div>

      <div className="reviews-section">
        <div className="average-rating">
          <h2>Average Rating</h2>
          <p className="average-rating-value">
            {calculateAverageRating()} <FaStar className="star-icon" />
          </p>
        </div>
        <h2>Reviews & Comments</h2>
        {token ? (
          <div className="review-form">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add your comment here"
              className="comment-input"
            />
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`rating-star ${star <= rating ? 'selected' : ''}`}
                />
              ))}
            </div>
            <button onClick={handleCommentSubmit} className="submit-button">Submit Comment</button>
          </div>
        ) : (
          <p className="login-prompt">Please log in to leave a review.</p>
        )}
        <div className="comments-list">
          {comments.map((review, index) => (
            <div key={index} className="comment">
              <p className="comment-author">
                <strong>{review.userId.firstName} {review.userId.lastName}</strong>
              </p>
              <p className="comment-rating">
                Rating: {review.rating} <FaStar className="star-icon" />
              </p>
              <p className="comment-text">{review.comment}</p>
              <p className="comment-date">{new Date(review.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .category-detail {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .loading {
          text-align: center;
          font-size: 1.5em;
          color: #666;
        }

        .category-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 40px;
        }

        .category-image {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease-in-out;
        }

        .category-image:hover {
          transform: scale(1.05);
        }

        .category-info {
          margin-top: 20px;
        }

        .category-title {
          font-size: 2.5em;
          font-weight: 600;
          margin: 0;
          color: #333;
        }

        .category-description {
          font-size: 1.2em;
          color: #555;
          margin: 10px 0;
        }

        .category-price {
          font-size: 1.5em;
          font-weight: 600;
          margin-top: 10px;
          color: #007bff;
        }

        .booking-section {
          margin-top: 40px;
          padding: 20px;
          background-color: #e9f5f8;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          text-align: center;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          max-width: 600px;
        }

        .booking-label {
          font-size: 1.2em;
          margin-bottom: 10px;
          color: #333;
        }

        .booking-input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 15px;
          font-size: 1em;
          width: 100%;
          max-width: 300px;
        }

        .booking-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2em;
          transition: background-color 0.3s ease;
        }

        .booking-button:hover {
          background-color: #0056b3;
        }

        .login-prompt {
          font-size: 1.1em;
          color: #555;
          margin-top: 10px;
        }

        .reviews-section {
          margin-top: 40px;
        }

        .average-rating {
          text-align: center;
          margin-bottom: 20px;
        }

        .average-rating-value {
          font-size: 2em;
          font-weight: 600;
          color: #333;
        }

        .star-icon {
          color: #f4c150;
          margin-left: 5px;
        }

        .review-form {
          margin-bottom: 30px;
        }

        .comment-input {
          width: 100%;
          max-width: 600px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 15px;
          font-size: 1em;
        }

        .rating-selector {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }

        .rating-star {
          font-size: 1.5em;
          cursor: pointer;
          transition: color 0.2s;
        }

        .rating-star.selected {
          color: #f4c150;
        }

        .submit-button {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2em;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #218838;
        }

        .comments-list {
          margin-top: 20px;
        }

        .comment {
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 15px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .comment-author {
          font-weight: 600;
          color: #333;
        }

        .comment-rating {
          color: #f4c150;
          margin-top: 5px;
        }

        .comment-text {
          margin-top: 10px;
          color: #555;
        }

        .comment-date {
          margin-top: 10px;
          font-size: 0.9em;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default CategoryDetail;
