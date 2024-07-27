import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryByIdApi } from '../../api/Api'; // Ensure this path is correct
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are included

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [bookingDate, setBookingDate] = useState('');

  useEffect(() => {
    console.log('Category ID:', id); // Log the ID
    const fetchCategory = async () => {
      try {
        const response = await getCategoryByIdApi(id);
        console.log('API Response:', response.data); // Log the response data
        if (response.data.success) {
          setCategory(response.data.category);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching category');
      }
    };

    fetchCategory();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
      toast.success('Comment added!');
    } else {
      toast.error('Comment cannot be empty');
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    toast.success(`Rating updated to ${newRating}`);
  };

  const handleBookingSubmit = () => {
    if (!bookingDate) {
      toast.error('Please select a date for booking.');
      return;
    }
    // Here you would typically send the booking data to your server
    toast.success(`Booking confirmed for ${bookingDate}`);
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
            <button onClick={handleCommentSubmit} className="comment-submit">
              Submit Comment
            </button>
            <div className="comments-list">
              {comments.map((c, index) => (
                <p key={index} className="comment-item">{c}</p>
              ))}
            </div>
          </div>

          <div className="rating-section">
            <h2>Rating</h2>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`star ${star <= rating ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
            <p className="current-rating">Current Rating: {rating} stars</p>
          </div>
        </div>
      </div>
      <style jsx>{`
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
        }

        .price {
          font-size: 1.5em;
          color: #007bff;
        }

        .booking-section {
          margin-top: 20px;
          border-top: 2px solid #eee;
          padding-top: 20px;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
        }

        .booking-form label {
          margin-bottom: 10px;
          font-size: 1.1em;
        }

        .booking-input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          margin-bottom: 10px;
          font-size: 1em;
        }

        .booking-submit {
          padding: 10px 20px;
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.1em;
          transition: background 0.3s;
        }

        .booking-submit:hover {
          background: #0056b3;
        }

        .reviews-section {
          margin-top: 20px;
        }

        .comments-section {
          margin-bottom: 20px;
        }

        .comment-input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          margin-bottom: 10px;
          font-size: 1em;
          height: 100px;
          resize: vertical;
        }

        .comment-submit {
          padding: 10px 20px;
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.1em;
          transition: background 0.3s;
        }

        .comment-submit:hover {
          background: #0056b3;
        }

        .comments-list {
          margin-top: 10px;
        }

        .comment-item {
          background: #fff;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 10px;
        }

        .rating-section {
          display: flex;
          align-items: center;
          margin-top: 20px;
        }

        .star {
          font-size: 24px;
          cursor: pointer;
          color: gray;
          margin: 0 5px;
        }

        .star.filled {
          color: gold;
        }

        .current-rating {
          margin-left: 10px;
          font-size: 1.2em;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default CategoryDetail;
