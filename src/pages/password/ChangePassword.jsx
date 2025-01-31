import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordApi } from '../../api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const validatePassword = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    validatePassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (!Object.values(passwordCriteria).every(Boolean)) {
      toast.error('Please meet all password requirements');
      return;
    }

    try {
      const res = await changePasswordApi({
        currentPassword,
        newPassword
      });

      if (res.data.success) {
        toast.success('Password changed successfully');
        navigate('/homepage');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Password Change Error:', error);
      toast.error('An error occurred while changing password');
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>

          <div className="password-criteria">
            <p className={passwordCriteria.length ? 'valid' : 'invalid'}>
              ✓ At least 8 characters
            </p>
            <p className={passwordCriteria.uppercase ? 'valid' : 'invalid'}>
              ✓ One uppercase letter
            </p>
            <p className={passwordCriteria.lowercase ? 'valid' : 'invalid'}>
              ✓ One lowercase letter
            </p>
            <p className={passwordCriteria.number ? 'valid' : 'invalid'}>
              ✓ One number
            </p>
            <p className={passwordCriteria.special ? 'valid' : 'invalid'}>
              ✓ One special character
            </p>
          </div>

          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Change Password
          </button>
        </form>
      </div>

      <style jsx>{`
        .change-password-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .change-password-card {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        .password-criteria {
          margin: 10px 0;
          font-size: 14px;
        }

        .valid {
          color: #28a745;
        }

        .invalid {
          color: #dc3545;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .submit-button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default ChangePassword; 