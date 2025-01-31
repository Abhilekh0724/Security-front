import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoriesApi } from "../api/Api";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import './Homepage.css';

const Homepage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesApi();
        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', color: '#333', backgroundColor: '#f8f9fa', position: 'relative' }}>
      {/* Hero Section with Carousel */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false" style={{ height: "80vh", position: "relative" }}>
        <div className="carousel-inner">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={category._id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={`https://localhost:5500${category.photo}`} className="d-block w-100" style={{ height: '80vh', objectFit: 'cover' }} alt={category.name} />
                <div className="carousel-caption d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <h1 className="display-4">Find Your Perfect Wedding Venue</h1>
                  <p className="lead">Book the best wedding venues with exclusive offers</p>
                  <Link to="/explore-venues" className="btn btn-light btn-lg mt-3">Explore Venues</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <img src="/assets/images/wedding-banner.jpg" className="d-block w-100" style={{ height: '80vh', objectFit: 'cover' }} alt="Default" />
            </div>
          )}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Featured Venues Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Top Wedding Venues</h2>
        <div className="row">
          {categories.map(category => (
            <div key={category._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0">
                <img src={`https://localhost:5500${category.photo}`} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} alt={category.name} />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{category.name}</h5>
                  <p className="card-text text-muted">{category.info}</p>
                  <p className="text-success font-weight-bold">Starting at ${category.price}</p>
                  <Link to={`/category/${category._id}`} className="btn btn-primary btn-sm w-100">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Help Center</h3>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact">Contact Support</a></li>
              <li><a href="/report">Report an Issue</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>User Guide</h3>
            <ul>
              <li><a href="/how-to-book">How to Book</a></li>
              <li><a href="/booking-policy">Booking Policy</a></li>
              <li><a href="/cancellation">Cancellation Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li><a href="/about">About VenueVendor</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 VenueVendor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
