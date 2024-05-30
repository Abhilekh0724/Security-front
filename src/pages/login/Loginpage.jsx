import React, { useState } from 'react';
import { loginUserApi } from '../../api/Api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    loginUserApi(data)
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://th.bing.com/th/id/R.2ea41474040e49066c4ed04dc22d7c50?rik=4VbvnabIVU2Sbg&pid=ImgRaw&r=0")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust opacity as needed
          padding: '30px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
          />
          <a href="/forgot-password" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>Forgot password?</a>
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            Login
          </button>
        </form>
        {/* Add Google login button */}
        <button style={{ width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginBottom: '20px' }}>
          <FontAwesomeIcon icon={faGoogle} style={{ fontSize: '20px', marginRight: '10px' }} />
          Login with Google
        </button>
        <div style={{ textAlign: 'center' }}>
          <a href="/register" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none' }}>Don't have an ID? Register</a>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
