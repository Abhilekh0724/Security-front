import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVenusMars, 
  faCamera, 
  faPaintBrush, 
  faGlassCheers,
  faSearch,
  faHeart,
  faCalendarAlt,
  faMapMarkerAlt,
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest,
  faYoutube,
  faPhone,
  faEnvelope,
  faClock
} from '@fortawesome/free-brands-svg-icons';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="nav-section">
        <div className="nav-content">
          <div className="logo-container">
            <img src="/assets/images/mainlogo.png" alt="Venue Logo" className="main-logo" />
          </div>
          <div className="nav-links">
            <Link to="/venues">Venues</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login" className="auth-button">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Create Your Perfect Wedding Day</h1>
          <p>Discover and book exceptional wedding venues and services</p>
          <div className="search-container">
            <div className="search-bar">
              <div className="search-input">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="search-icon" />
                <input type="text" placeholder="Where would you like to celebrate?" />
              </div>
              <div className="search-input">
                <FontAwesomeIcon icon={faCalendarAlt} className="search-icon" />
                <input type="date" />
              </div>
              <button className="search-button">Find Venues</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <h2>Discover Our Services</h2>
        <div className="categories-grid">
          {[
            { icon: faVenusMars, title: 'Wedding Venues', desc: 'Find your dream location', path: '/venues' },
            { icon: faCamera, title: 'Photography', desc: 'Capture every moment', path: '/photographers' },
            { icon: faPaintBrush, title: 'Makeup Artists', desc: 'Look stunning on your day', path: '/makeup' },
            { icon: faGlassCheers, title: 'Celebration Halls', desc: 'Perfect reception spaces', path: '/halls' }
          ].map((category, index) => (
            <Link to={category.path} key={index} className="category-card">
              <FontAwesomeIcon icon={category.icon} className="category-icon" />
              <h3>{category.title}</h3>
              <p>{category.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Venues */}
      <section className="featured-venues">
        <h2>Popular Venues</h2>
        <div className="venues-grid">
          {[1, 2, 3].map((venue) => (
            <div key={venue} className="venue-card">
              <div className="venue-image" style={{ backgroundImage: `url('/assets/images/venue${venue}.jpg')` }}>
                <div className="venue-overlay">
                  <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                </div>
              </div>
              <div className="venue-info">
                <h3>Luxury Wedding Venue {venue}</h3>
                <p className="venue-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Kathmandu, Nepal
                </p>
                <p className="venue-price">Starting from $1,000</p>
                <Link to={`/venue/${venue}`} className="view-details">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          {[
            { title: 'Curated Venues', desc: 'Hand-picked premium locations' },
            { title: 'Best Prices', desc: 'Competitive rates guaranteed' },
            { title: 'Easy Booking', desc: 'Simple and secure process' },
            { title: 'Dedicated Support', desc: '24/7 customer service' }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-number">{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
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
                <p><FontAwesomeIcon icon={faPhone} /><span>+977 9876543210</span></p>
                <p><FontAwesomeIcon icon={faEnvelope} /><span>contact@venue.com</span></p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /><span>Kathmandu, Nepal</span></p>
                <p><FontAwesomeIcon icon={faClock} /><span>Mon - Sat: 9:00 AM - 6:00 PM</span></p>
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
      </footer>

      <style jsx>{`
        .homepage {
          min-height: 100vh;
        }

        .nav-section {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid rgba(197, 165, 114, 0.2);
          padding: 10px 0;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .logo-container {
          width: 150px;
        }

        .main-logo {
          width: 100%;
          height: auto;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-links a {
          color: var(--text-dark);
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--primary-gold);
        }

        .auth-button {
          background: var(--primary-gold);
          color: white !important;
          padding: 8px 20px;
          border-radius: 25px;
          transition: background 0.3s ease !important;
        }

        .auth-button:hover {
          background: var(--secondary-gold) !important;
        }

        .hero {
          height: 100vh;
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                      url('/assets/images/hero-bg.jpg');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding-top: 70px;
        }

        .hero-content {
          max-width: 800px;
          padding: 0 20px;
        }

        .hero h1 {
          font-size: 4rem;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
        }

        .hero p {
          font-size: 1.5rem;
          margin-bottom: 40px;
          font-family: 'Cormorant Garamond', serif;
        }

        .search-container {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .search-bar {
          display: flex;
          gap: 15px;
        }

        .search-input {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }

        .search-input input {
          width: 100%;
          padding: 15px 15px 15px 45px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }

        .search-button {
          background: var(--primary-gold);
          color: white;
          border: none;
          padding: 0 30px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .search-button:hover {
          background: var(--secondary-gold);
        }

        .categories, .featured-venues, .why-choose-us {
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 50px;
          color: var(--text-dark);
          font-family: 'Playfair Display', serif;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .category-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          text-decoration: none;
          color: var(--text-dark);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-10px);
        }

        .category-icon {
          font-size: 2.5rem;
          color: var(--primary-gold);
          margin-bottom: 20px;
        }

        .venues-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .venue-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .venue-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .venue-info {
          padding: 20px;
        }

        .venue-location {
          color: var(--text-light);
          margin: 10px 0;
        }

        .venue-price {
          color: var(--primary-gold);
          font-weight: 600;
          margin: 10px 0;
        }

        .view-details {
          display: inline-block;
          padding: 8px 20px;
          background: var(--primary-gold);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin-top: 10px;
          transition: background 0.3s ease;
        }

        .view-details:hover {
          background: var(--secondary-gold);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .feature-card {
          text-align: center;
          padding: 30px;
        }

        .feature-number {
          width: 40px;
          height: 40px;
          background: var(--primary-gold);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-weight: 600;
        }

        :root {
          --primary-gold: #C5A572;
          --secondary-gold: #B08D4C;
          --text-dark: #333333;
          --text-light: #666666;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .search-bar {
            flex-direction: column;
          }

          .search-button {
            width: 100%;
          }
        }

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

        .footer-section h3 {
          color: var(--primary-gold);
          margin-bottom: 25px;
          font-size: 1.3rem;
          font-family: 'Playfair Display', serif;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 12px;
        }

        .footer-section ul li a {
          color: #999;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }

        .footer-section ul li a:hover {
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
    </div>
  );
};

export default Homepage; 