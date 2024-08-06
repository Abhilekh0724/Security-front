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
  const userId = '66613540763c430127cd057a'; // Ensure this is set correctly

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() && rating > 0) {
      try {
        const reviewData = { categoryId: id, userId, comment, rating };
        const response = await postReviewApi(reviewData);
        if (response.data.success) {
          setComments([...comments, response.data.review]);
          setComment('');
          setRating(0); // Reset rating after submission
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

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    toast.success(`Rating updated to ${newRating}`);
  };

  const handleBookingSubmit = async () => {
    if (!bookingDate) {
      toast.error('Please select a date for booking.');
      return;
    }
    try {
      const bookingData = { categoryId: id, bookingDate, userId };
      const response = await createBookingApi(bookingData);
      if (response.data.success) {
        toast.success('Booking confirmed. Payment should be made 5 days before the booked date, or it will get canceled.', {
          autoClose: 3000, // 3 seconds
        });
      } else {
        toast.error(response.data.message, {
          autoClose: 3000, // 3 seconds
        });
      }
    } catch (error) {
      toast.error('Error creating booking.', {
        autoClose: 3000, // 3 seconds
      });
    }
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / comments.length).toFixed(1);
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="category-detail">
        <img
          src={`http://localhost:5500${category.photo}`}
          alt={category.name}
          className="category-image"
        />
        <div className="category-content">
          <h1>{category.name}</h1>
          <p>{category.info}</p>
          <p className="price">Price: ${category.price}</p>
          <p className="average-rating">Average Rating: {calculateAverageRating()} <FaStar className="star filled" /></p>

          <div className="booking-section">
            <h2>Book This Category</h2>
            <div className="booking-form">
              <label>
                Date:
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="booking-input"
                />
              </label>
              <button onClick={handleBookingSubmit} className="booking-submit">
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Reviews & Comments</h2>
          <div className="comments-section">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add your comment here"
              className="comment-input"
            />
            <div className="rating-section">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                />
              ))}
            </div>
            <button onClick={handleCommentSubmit} className="comment-submit">
              Submit Comment
            </button>
            <div className="comments-list">
              {comments.map((review, index) => (
                <div key={index} className="comment-item">
                  <p>{review.comment}</p>
                  <p>
                    Rating: {Array.from({ length: review.rating }, (_, i) => (
                      <FaStar key={i} className="star filled" />
                    ))}
                  </p>
                  <p>By: {review.userId.firstName} {review.userId.lastName}</p> {/* Display user's name */}
                  <p>On: {new Date(review.createdAt).toLocaleDateString()}</p> {/* Display review date */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Styles go here */
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #f8bbd0; /* Baby Pink Background */
          padding: 20px;
        }

        .category-detail {
          max-width: 800px;
          width: 100%;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 20px;
          margin-top: 20px;
        }

        .category-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-bottom: 2px solid #eee;
        }

        .category-content {
          padding: 20px;
        }

        h1 {
          font-size: 2em;
          margin-bottom: 10px;
          color: #333;
        }

        p {
          font-size: 1.2em;
          margin: 10px 0;
          color: #555;
        }

        .price {
          font-weight: bold;
          color: #e91e63;
        }

        .average-rating {
          font-size: 1.2em;
          color: #ff9800;
          display: flex;
          align-items: center;
        }

        .booking-section, .reviews-section {
          margin-top: 20px;
        }

        .booking-form label, .comment-input {
          display: block;
          margin-bottom: 10px;
          font-size: 1.1em;
        }

        .booking-input, .comment-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .booking-submit, .comment-submit {
          padding: 10px 20px;
          background-color: #e91e63;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .booking-submit:hover, .comment-submit:hover {
          background-color: #d81b60;
        }

        .comments-list {
          margin-top: 20px;
        }

        .comment-item {
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #eee;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .rating-section {
          margin-top: 20px;
          text-align: center;
        }

        .star {
          font-size: 2em;
          cursor: pointer;
          transition: color 0.2s;
        }

        .star.filled {
          color: #ff9800;
        }

        .current-rating {
          margin-top: 10px;
          font-size: 1.2em;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default CategoryDetail;
