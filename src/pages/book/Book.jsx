import React, { useEffect, useState } from 'react';
import { getBookingsByUserApi, cancelBookingApi, createPaymentApi } from '../../api/Api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faVenueMartini, faMoneyBill, faCircle } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const Book = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserApi();
        if (response.data.success) {
          // Filter out canceled bookings
          const activeBookings = response.data.bookings.filter(
            booking => booking.status !== 'canceled'
          );
          setBookings(activeBookings);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching bookings');
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await cancelBookingApi(bookingId);
      if (response.data.success) {
        // Remove the canceled booking from the state
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
        toast.success('Booking canceled successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error canceling booking');
    }
  };

  const handlePayment = async (booking) => {
    const formData = {
      userId: booking.userId,
      categoryId: booking.categoryId._id,
      bookingDate: booking.bookingDate,
      amount: booking.amount,
    };

    try {
      const response = await createPaymentApi(formData);
      if (response.data.success) {
        const esewaPath = "https://uat.esewa.com.np/epay/main";
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", esewaPath);

        Object.keys(response.data.formData).forEach(key => {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", response.data.formData[key]);
          form.appendChild(hiddenField);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        toast.error(response.data.message || 'Payment initiation failed');
      }
    } catch (error) {
      toast.error('Error initiating payment');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#28a745'; // green
      case 'pending':
        return '#ffc107'; // yellow
      default:
        return '#17a2b8'; // blue
    }
  };

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage your venue bookings and payments</p>
      </div>

      <div className="container">
        <div className="bookings-container">
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <FontAwesomeIcon icon={faCalendar} size="3x" />
              <p>No active bookings available.</p>
              <a href="/homepage" className="btn btn-primary">Explore Venues</a>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <div className="booking-header">
                    <h3>{booking.categoryId.name}</h3>
                    <span className="booking-status">
                      <FontAwesomeIcon 
                        icon={faCircle} 
                        style={{ color: getStatusColor(booking.status), marginRight: '5px', fontSize: '10px' }} 
                      />
                      {booking.status === 'paid' ? 'Paid' : 'Pending Payment'}
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCalendar} />
                      <span>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faClock} />
                      <span>Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faMoneyBill} />
                      <span>Amount: ${booking.amount}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    {booking.status !== 'paid' && (
                      <>
                        <button 
                          onClick={() => handlePayment(booking)} 
                          className="btn btn-success"
                        >
                          Pay Now
                        </button>
                        <button 
                          onClick={() => handleCancelBooking(booking._id)} 
                          className="btn btn-outline-danger"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === 'paid' && (
                      <button 
                        className="btn btn-success"
                        disabled
                      >
                        Payment Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .bookings-page {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 40px 0;
        }

        .bookings-header {
          text-align: center;
          margin-bottom: 40px;
          color: #333;
          padding: 20px;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
        }

        .bookings-header h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
        }

        .bookings-header p {
          font-size: 1.1em;
          opacity: 0.9;
        }

        .bookings-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .no-bookings {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }

        .no-bookings svg {
          color: #6c757d;
          margin-bottom: 20px;
        }

        .no-bookings p {
          font-size: 1.2em;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .bookings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          padding: 20px 0;
        }

        .booking-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .booking-card:hover {
          transform: translateY(-5px);
        }

        .booking-header {
          padding: 20px;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .booking-header h3 {
          margin: 0;
          font-size: 1.2em;
        }

        .booking-status {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8em;
        }

        .booking-details {
          padding: 20px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          color: #666;
        }

        .detail-item svg {
          margin-right: 10px;
          color: #6a11cb;
        }

        .booking-actions {
          padding: 20px;
          display: flex;
          gap: 10px;
          border-top: 1px solid #eee;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: 500;
          transition: all 0.3s ease;
          flex: 1;
        }

        .btn-success {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          border: none;
          color: white;
        }

        .btn-outline-danger {
          border: 1px solid #dc3545;
          background: transparent;
          color: #dc3545;
        }

        .btn-outline-danger:hover {
          background: #dc3545;
          color: white;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .bookings-grid {
            grid-template-columns: 1fr;
          }

          .bookings-header h1 {
            font-size: 2em;
          }
        }
      `}</style>
    </div>
  );
};

export default Book;
