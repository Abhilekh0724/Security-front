// components/AdminBooked.js
import React, { useEffect, useState } from 'react';
import { getAllBookingsApi, deleteBookingApi } from '../../api/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const AdminBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
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

  const handleBack = () => {
    navigate('/admin/category');
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="btn btn-outline-primary back-button"
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Admin Panel
        </button>
        <h1 className="mb-0">All Bookings</h1>
      </div>

      <div className="bookings">
        {bookings.length === 0 ? (
          <div className="alert alert-info">No bookings available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
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
                    <td>{booking.categoryId?.name || 'Deleted Category'}</td>
                    <td>
                      {booking.userId 
                        ? `${booking.userId.firstName || ''} ${booking.userId.lastName || ''}`
                        : 'N/A'
                      }
                    </td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${
                        booking.status === 'paid' 
                          ? 'bg-success' 
                          : booking.status === 'pending' 
                          ? 'bg-warning' 
                          : 'bg-danger'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteBooking(booking._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .table-responsive {
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .table {
          margin-bottom: 0;
        }

        .table th {
          background-color: #343a40;
          color: white;
          border: none;
        }

        .table td {
          vertical-align: middle;
        }

        .badge {
          padding: 8px 12px;
          font-size: 0.85em;
          border-radius: 20px;
        }

        .btn-sm {
          border-radius: 20px;
          padding: 5px 15px;
        }

        h1 {
          color: #343a40;
          font-weight: 600;
        }

        .alert {
          border-radius: 8px;
          padding: 20px;
        }

        .back-button {
          padding: 8px 20px;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateX(-5px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminBooked;
