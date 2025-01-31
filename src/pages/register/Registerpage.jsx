import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerUserApi } from '../../api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../components/LoadingSpinner';

const Registerpage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validatePassword = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validate = () => {
    let isValid = true;

    // Implement your validation rules here

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const res = await registerUserApi({
        firstName,
        lastName,
        email,
        password,
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      toast.error('An error occurred while registering');
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <div className="register-container">
      {isLoading && <LoadingSpinner />}
      <div className="register-card">
        <div className="register-header">
          <img src="assets/images/mainlogo.png" alt="Logo" className="register-logo" />
          <h2>Create Account</h2>
          <p>Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="name-group">
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="input-group">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
          </div>

          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <div className="password-criteria">
            <p className={passwordCriteria.length ? 'valid' : 'invalid'}>
              <span className="criteria-icon">{passwordCriteria.length ? '✓' : '✗'}</span>
              At least 8 characters
            </p>
            <p className={passwordCriteria.uppercase ? 'valid' : 'invalid'}>
              <span className="criteria-icon">{passwordCriteria.uppercase ? '✓' : '✗'}</span>
              One uppercase letter
            </p>
            <p className={passwordCriteria.lowercase ? 'valid' : 'invalid'}>
              <span className="criteria-icon">{passwordCriteria.lowercase ? '✓' : '✗'}</span>
              One lowercase letter
            </p>
            <p className={passwordCriteria.number ? 'valid' : 'invalid'}>
              <span className="criteria-icon">{passwordCriteria.number ? '✓' : '✗'}</span>
              One number
            </p>
            <p className={passwordCriteria.special ? 'valid' : 'invalid'}>
              <span className="criteria-icon">{passwordCriteria.special ? '✓' : '✗'}</span>
              One special character
            </p>
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>

          <div className="social-register">
            <button type="button" className="google-button">
              <FontAwesomeIcon icon={faGoogle} />
              <span>Register with Google</span>
            </button>
            <button type="button" className="facebook-button">
              <FontAwesomeIcon icon={faFacebook} />
              <span>Register with Facebook</span>
            </button>
          </div>

          <div className="register-footer">
            <a href="/login" className="login-link">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>

      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .register-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 580px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .register-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .register-logo {
          width: 120px;
          margin-bottom: 20px;
        }

        .register-header h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .register-header p {
          color: #666;
          font-size: 16px;
        }

        .name-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .input-group {
          position: relative;
          margin-bottom: 25px;
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
          padding: 15px 15px 15px 45px;
          border: 2px solid #e1e1e1;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        input:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .register-button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .register-button:hover {
          transform: translateY(-2px);
        }

        .social-register {
          margin: 30px 0;
          display: grid;
          gap: 15px;
        }

        .google-button, .facebook-button {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e1e1;
          border-radius: 10px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .google-button:hover {
          background: #f1f1f1;
        }

        .facebook-button {
          background: #1877f2;
          border-color: #1877f2;
          color: white;
        }

        .facebook-button:hover {
          background: #166fe5;
        }

        .register-footer {
          text-align: center;
          margin-top: 20px;
        }

        .login-link {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
        }

        .password-criteria {
          margin: -15px 0 20px;
          padding: 10px;
          border-radius: 8px;
          background-color: #f8f9fa;
        }

        .password-criteria p {
          margin: 5px 0;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .criteria-icon {
          font-weight: bold;
          display: inline-block;
          width: 16px;
        }

        .valid {
          color: #28a745;
        }

        .invalid {
          color: #dc3545;
        }

        .password-toggle {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 0;
          font-size: 16px;
        }

        .password-toggle:hover {
          color: #667eea;
        }

        input[type="password"],
        input[type="text"] {
          padding-right: 45px;
        }

        @media (max-width: 480px) {
          .name-group {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <ToastContainer />
    </div>
  );
};

export default Registerpage;
