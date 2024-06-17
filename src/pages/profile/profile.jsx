import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [profilePic, setProfilePic] = useState(user.profilePic || '');
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (newProfilePic) {
      const formData = new FormData();
      formData.append('profilePic', newProfilePic); // 'profilePic' should match the field name expected by backend
      formData.append('userId', user._id); // Assuming userId is needed by backend

      try {
        const response = await axios.post('http://localhost:5500/api/profile/uploadProfilePic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          setProfilePic(response.data.profilePic);
          const updatedUser = { ...user, profilePic: response.data.profilePic };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          toast.success('Profile picture uploaded successfully!');
        } else {
          toast.error('Failed to upload profile picture');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        toast.error('Error uploading profile picture. Please try again.');
      }
    }
  };

  if (!user.email) {
    return <p>No user details found. Please log in.</p>;
  }

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <img
              src={profilePic ? `http://localhost:5500${profilePic}` : '/assets/images/default-avatar.png'}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}
            />
            <div>
              <input type="file" onChange={handleProfilePicChange} />
              <button className="btn btn-primary mt-2" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
          <h5 className="card-title mt-4">User Details</h5>
          <p className="card-text">
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p className="card-text">
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
