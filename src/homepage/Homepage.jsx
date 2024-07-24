import React from 'react';
import { Link } from 'react-router-dom';


const Homepage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: 'white', position: 'relative', zIndex: '1' }}>
      <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{ position: 'relative', zIndex: '0' }}>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img src="assets/images/12.jpg" className="d-block w-100" style={{ objectFit: 'cover', height: '400px' }} alt="Slide 1" />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="assets/images/h.jpg" className="d-block w-100" style={{ objectFit: 'cover', height: '400px' }}  alt="Slide 2" />
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
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>RECENTLY VIEWED</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '30%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <img src="assets/images/beach.jpg" alt="Beach side venue" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            <h3>Beach Side Venue</h3>
            <p>Stunning beachfront venue for a breathtaking romantic celebration</p>
            <p>Starting from:</p>
            <h4 style={{ color: '#007bff' }}>BEST AVAILABLE RATE</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>$20,000</p>
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
          <div style={{ width: '30%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <img src="assets/images/abc.jpg" alt="Classic Venue" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            <h3>Classic Venue</h3>
            <p>Elegant classic indoor ballroom venue with string lights</p>
            <p>Starting from:</p>
            <h4 style={{ color: '#007bff' }}>BEST AVAILABLE RATE</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>$60,770</p>
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
          <div style={{ width: '30%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <img src="assets/images/rus.jpg" alt="Rustic Venue" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            <h3>Rustic Venue</h3>
            <p>Charming rustic outdoor venue in the woods, treelined paths</p>
            <p>Starting from:</p>
            <h4 style={{ color: '#007bff' }}>BEST AVAILABLE RATE</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>$8,000</p>
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
      </div>
    </div>
  );
};

export default Homepage;
