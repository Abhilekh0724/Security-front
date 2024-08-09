import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [profilePic, setProfilePic] = useState(user.profilePic || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUser(storedUser);
    setProfilePic(storedUser.profilePic || '');
  }, []);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5500/api/profile/uploadProfilePic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setProfilePic(response.data.profilePic);
        const updatedUser = { ...user, profilePic: response.data.profilePic };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile picture uploaded successfully!');
      } else {
        toast.error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Error uploading profile picture. Please try again.');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  if (!user.email) {
    return <p>No user details found. Please log in.</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img src="/assets/images/vend.png" alt="Your Logo" style={styles.logo} />
      </div>
      <div style={styles.card}>
        <div style={styles.pictureContainer}>
          <img
            src={profilePic ? `http://localhost:5500${profilePic}` : '/assets/images/default-avatar.png'}
            alt="Profile"
            onClick={handleImageClick}
            style={styles.picture}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfilePicChange}
            style={styles.fileInput}
          />
        </div>
        <div style={styles.details}>
          <h5 style={styles.title}>User Details</h5>
          <p style={styles.text}>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p style={styles.text}>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p style={styles.text}>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f0f2f5',
    padding: '60px', // Increased padding for more space
    minHeight: '100vh',
    boxSizing: 'border-box',
    width: '100%',
  },
  logoContainer: {
    marginBottom: '30px', // Space between logo and profile card
  },
  logo: {
    maxWidth: '100px', // Larger logo
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px', // Increased border radius for more rounded corners
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)', // Increased shadow for better depth
    padding: '40px',  // Increased padding inside the card
    maxWidth: '800px',  // Increased width of the card
    width: '100%',
    textAlign: 'center',
    margin: '20px', // Margin around the card for spacing
  },
  pictureContainer: {
    position: 'relative',
    marginBottom: '30px', // Increased space for the picture
  },
  picture: {
    width: '200px', // Increased size of the profile picture
    height: '200px',
    borderRadius: '50%', // Makes the profile picture circular
    objectFit: 'cover',
    cursor: 'pointer',
    border: '6px solid #ddd', // Thicker border for better visibility
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  details: {
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem', // Increased font size for title
    marginBottom: '20px',
    color: '#333',
  },
  text: {
    fontSize: '1.25rem', // Slightly larger font size for better readability
    margin: '12px 0',
    color: '#555',
  },
};

export default Profile;
