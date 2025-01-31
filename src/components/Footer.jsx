import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faTwitter, 
  faPinterest,
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <img src="/assets/images/mainlogo.png" alt="Venue Logo" className="footer-logo" />
            <p className="footer-description">
              Your premier destination for wedding venues and services. Making your special day unforgettable.
            </p>
            <div className="social-links">
              <a href="#" title="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" title="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" title="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" title="Pinterest"><FontAwesomeIcon icon={faPinterest} /></a>
              <a href="#" title="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/venues">Wedding Venues</Link></li>
              <li><Link to="/photographers">Wedding Photography</Link></li>
              <li><Link to="/makeup">Bridal Makeup</Link></li>
              <li><Link to="/halls">Reception Halls</Link></li>
              <li><Link to="/catering">Catering Services</Link></li>
              <li><Link to="/decoration">Wedding Decoration</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="footer-section">
            <h3>Help & Support</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/booking-guide">Booking Guide</Link></li>
              <li><Link to="/cancellation">Cancellation Policy</Link></li>
              <li><Link to="/support">Customer Support</Link></li>
              <li><Link to="/feedback">Submit Feedback</Link></li>
              <li><Link to="/help-center">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
              <li><Link to="/licensing">Licensing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>
                <FontAwesomeIcon icon={faPhone} />
                <span>+977 9876543210</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>contact@venue.com</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Kathmandu, Nepal</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faClock} />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with the latest venues and wedding trends</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Venue. All rights reserved.</p>
          <div className="payment-methods">
            <img src="/assets/images/payment/esewa.png" alt="eSewa" />
            <img src="/assets/images/payment/khalti.png" alt="Khalti" />
            <img src="/assets/images/payment/fonepay.png" alt="FonePay" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1a1a1a;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
        }

        .footer-top {
          padding: 60px 0;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
          gap: 40px;
          padding: 0 20px;
        }

        .footer-logo {
          width: 180px;
          margin-bottom: 20px;
          filter: brightness(0) invert(1);
        }

        .footer-description {
          color: #999;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-links a {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: var(--primary-gold);
          transform: translateY(-3px);
        }

        h3 {
          color: var(--primary-gold);
          margin-bottom: 25px;
          font-size: 1.3rem;
          font-family: 'Playfair Display', serif;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        ul li {
          margin-bottom: 12px;
        }

        ul li a {
          color: #999;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }

        ul li a:hover {
          color: var(--primary-gold);
        }

        .contact-info p {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #999;
          margin-bottom: 15px;
          font-size: 0.95rem;
        }

        .contact-info svg {
          color: var(--primary-gold);
          width: 16px;
        }

        .newsletter-section {
          background: #222;
          padding: 40px 0;
        }

        .newsletter-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 0 20px;
        }

        .newsletter-content h3 {
          margin-bottom: 10px;
        }

        .newsletter-content p {
          color: #999;
          margin-bottom: 20px;
        }

        .newsletter-form {
          display: flex;
          gap: 10px;
        }

        .newsletter-form input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .newsletter-form button {
          padding: 12px 25px;
          background: var(--primary-gold);
          border: none;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .newsletter-form button:hover {
          background: var(--secondary-gold);
        }

        .footer-bottom {
          background: #111;
          padding: 20px 0;
        }

        .footer-bottom-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-bottom p {
          color: #666;
          font-size: 0.9rem;
        }

        .payment-methods {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .payment-methods img {
          height: 25px;
          filter: grayscale(1) brightness(0.8);
          transition: filter 0.3s ease;
        }

        .payment-methods img:hover {
          filter: none;
        }

        @media (max-width: 1200px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }

          .newsletter-form {
            flex-direction: column;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }

          .contact-info p {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 