import React, { useEffect, useState } from 'react';
import { getBookingsByUserApi } from '../../api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserApi();
        if (response.data.success) {
          setBookings(response.data.bookings);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching bookings');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <div className="bookings">
        <h1>Your Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p>Category: {booking.categoryId.name}</p>
              <p>Booking Created At: {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
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

        .bookings {
          max-width: 800px;
          width: 100%;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 20px;
          margin-top: 20px;
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

        .booking-item {
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #eee;
          border-radius: 4px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default UserBookings;
