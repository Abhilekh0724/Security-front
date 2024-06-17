import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginUserApi } from '../../api/Api';// Import loginUserApi function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validation = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (email === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter password');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data)
      .then((res) => {
        console.log('Login Response:', res);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success('Login successful');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.userData));
          setTimeout(() => {
            navigate('/homepage'); // Redirect to homepage after a short delay
          }, 2000); // Adjust the delay as needed
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        toast.error('An error occurred while logging in. Please try again later.');
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
        <img src="assets/images/vend.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
            />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            Login
          </button>
        </form>
        <button style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginBottom: '20px' }}>
          <FontAwesomeIcon icon={faGoogle} style={{ fontSize: '20px', marginRight: '10px' }} />
          Login with Google
        </button>
        <div style={{ textAlign: 'center' }}>
          <a href="/forgot-password" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>Forgot password?</a>
          <a href="/register" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none' }}>Don't have an ID? Register</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Loginpage;
