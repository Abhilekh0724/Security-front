import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: 'lightcoral' }}>
      <header style={{ padding: '20px', backgroundColor: '#f8f8f8', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Link to="/Venue" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/wed.jpg" 
              alt="Wedding Venue" 
              style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
            />
            <div>Wedding Venue</div>
          </Link>
          <Link to="/CelebrationHalls" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/halls.jpg" 
              alt="Celebration Halls" 
              style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
            />
            <div>Celebration Halls</div>
          </Link>
          <Link to="/Photographer" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/photo.jpg" 
              alt="Photographers" 
              style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
            />
            <div>Photographers</div>
          </Link>
          <Link to="/MakeupArtist" style={{ margin: '0 20px', cursor: 'pointer', textAlign: 'center', fontSize: '18px', textDecoration: 'none', color: 'inherit' }}>
            <img 
              src="assets/images/make.jpg" 
              alt="Make Up" 
              style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
            />
            <div>Make Up</div>
          </Link>
        </div>
      </header>
      <div style={{ padding: '40px', backgroundColor: '#f2f2f2' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>RECENTLY VIEWED</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '30%', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <img src="assets/images/beach.jpg" alt="Beach side venue" style={{ width: '100%', borderRadius: '10px' }} />
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
            <img src="assets/images/abc.jpg" alt="Classic Venue" style={{ width: '100%', borderRadius: '10px' }} />
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
            <img src="assets/images/rus.jpg" alt="Rustic Venue" style={{ width: '100%', borderRadius: '10px' }} />
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
