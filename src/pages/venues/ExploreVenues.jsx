import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faMapMarkerAlt, 
  faDollarSign,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../components/LoadingSpinner';

const ExploreVenues = () => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    capacity: 'all',
    location: 'all'
  });

  // Dummy data for demonstration
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        // Replace this with your actual API call
        const dummyVenues = [
          {
            id: 1,
            name: "Grand Ballroom",
            category: "Wedding",
            location: "City Center",
            price: 1000,
            capacity: 500,
            rating: 4.5,
            image: "assets/images/venue1.jpg"
          },
          // Add more dummy venues...
        ];
        setVenues(dummyVenues);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching venues");
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredVenues = venues.filter(venue => {
    return venue.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Add more filter logic based on your filters state
  });

  return (
    <div className="explore-venues">
      {isLoading && <LoadingSpinner />}
      
      <div className="search-filter-section">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select 
            onChange={(e) => handleFilterChange('category', e.target.value)}
            value={filters.category}
          >
            <option value="all">All Categories</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="party">Party</option>
          </select>

          <select 
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            value={filters.priceRange}
          >
            <option value="all">All Prices</option>
            <option value="budget">Budget</option>
            <option value="moderate">Moderate</option>
            <option value="luxury">Luxury</option>
          </select>

          <select 
            onChange={(e) => handleFilterChange('capacity', e.target.value)}
            value={filters.capacity}
          >
            <option value="all">Any Capacity</option>
            <option value="small">Up to 100</option>
            <option value="medium">101-300</option>
            <option value="large">301+</option>
          </select>

          <select 
            onChange={(e) => handleFilterChange('location', e.target.value)}
            value={filters.location}
          >
            <option value="all">All Locations</option>
            <option value="city">City Center</option>
            <option value="north">North</option>
            <option value="south">South</option>
          </select>
        </div>
      </div>

      <div className="venues-grid">
        {filteredVenues.map(venue => (
          <div key={venue.id} className="venue-card">
            <div className="venue-image">
              <img src={venue.image} alt={venue.name} />
            </div>
            <div className="venue-info">
              <h3>{venue.name}</h3>
              <p className="location">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {venue.location}
              </p>
              <p className="price">
                <FontAwesomeIcon icon={faDollarSign} /> Starting from ${venue.price}
              </p>
              <p className="capacity">
                <FontAwesomeIcon icon={faUsers} /> Up to {venue.capacity} guests
              </p>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={index < venue.rating ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
              <Link to={`/venue/${venue.id}`} className="view-details">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .explore-venues {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .search-filter-section {
          margin-bottom: 30px;
        }

        .search-bar {
          position: relative;
          margin-bottom: 20px;
        }

        .search-bar input {
          width: 100%;
          padding: 15px 45px;
          border: 2px solid #e1e1e1;
          border-radius: 8px;
          font-size: 16px;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        .filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .filters select {
          padding: 10px;
          border: 1px solid #e1e1e1;
          border-radius: 6px;
          font-size: 14px;
        }

        .venues-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }

        .venue-card {
          border: 1px solid #e1e1e1;
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .venue-card:hover {
          transform: translateY(-5px);
        }

        .venue-image {
          height: 200px;
          overflow: hidden;
        }

        .venue-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .venue-info {
          padding: 20px;
        }

        .venue-info h3 {
          margin: 0 0 10px;
          font-size: 1.2rem;
          color: #333;
        }

        .venue-info p {
          margin: 5px 0;
          color: #666;
          font-size: 0.9rem;
        }

        .rating {
          margin: 10px 0;
        }

        .star {
          color: #ddd;
          font-size: 1.2rem;
        }

        .star.filled {
          color: #ffd700;
        }

        .view-details {
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 10px;
          transition: opacity 0.3s ease;
        }

        .view-details:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .filters {
            grid-template-columns: 1fr;
          }

          .venues-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default ExploreVenues; 