// components/AdminBooked.js
import React, { useEffect, useState } from 'react';
import { getAllBookingsApi, deleteBookingApi } from '../../api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminBooked = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookingsApi();
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

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await deleteBookingApi(bookingId);
      if (response.data.success) {
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        toast.success('Booking deleted successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error deleting booking');
    }
  };

  return (
    <div className="container mt-4">
      <div className="bookings">
        <h1>All Bookings</h1>
        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Booker</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.categoryId.name}</td>
                  <td>{booking.userId ? `${booking.userId.firstName} ${booking.userId.lastName}` : 'N/A'}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeleteBooking(booking._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBooked;
