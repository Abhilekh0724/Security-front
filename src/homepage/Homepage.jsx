import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoriesApi } from "../api/Api";// Ensure this path is correct
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const cardImageStyle = {
    height: '200px',
    objectFit: 'cover'
  };

  const cardStyle = {
    width: '300px',
    margin: '10px'
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: 'white', position: 'relative', zIndex: '1' }}>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ position: 'relative', zIndex: '0' }}>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img src="assets/images/12.jpg" className="d-block w-100" style={{ objectFit: 'cover', height: '400px' }} alt="Slide 1" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="assets/images/h.jpg" className="d-block w-100" style={{ objectFit: 'cover', height: '400px' }} alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="assets/images/45.jpg" className="d-block w-100" style={{ objectFit: 'cover', height: '400px' }} alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <header style={{ padding: '20px', backgroundColor: '#f8f8f8', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', position: 'relative', zIndex: '1' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Link to="/Venue" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/wed.jpg" 
              alt="Wedding Venue" 
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
            />
            <div>Wedding Venue</div>
          </Link>
          <Link to="/CelebrationHalls" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/halls.jpg" 
              alt="Celebration Halls" 
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
            />
            <div>Celebration Halls</div>
          </Link>
          <Link to="/Photographer" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/photo.jpg" 
              alt="Photographers" 
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
            />
            <div>Photographers</div>
          </Link>
          <Link to="/MakeupArtist" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/make.jpg" 
              alt="Make Up" 
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
            />
            <div>Make Up</div>
          </Link>
        </div>
      </header>
      
      <div style={{ padding: '40px', backgroundColor: '#fff' }}>

        <div className="d-flex justify-content-center flex-wrap">
          {categories.map(category => (
            <div key={category._id} className="card" style={cardStyle}>
              <img src={`path_to_your_images_directory/${category.photo}`} className="card-img-top" style={cardImageStyle} alt={category.name} />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.info}</p>
                <p className="card-text"><small className="text-body-secondary">Starting from:</small></p>
                <p className="card-text"><small className="text-body-secondary">BEST AVAILABLE RATE</small></p>
                <p className="card-text" style={{ fontSize: '18px', fontWeight: 'bold' }}>${category.price}</p>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px'
                  }}
                >
                  BOOK
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
