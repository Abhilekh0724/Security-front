import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import { loginUserApi } from '../../api/Api'; // Import loginUserApi function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { ROLES } from '../../config/roles';
import './Loginpage.css'; // We'll create this file for styles

// Use the environment variable directly
const RECAPTCHA_SITE_KEY = '6LfzuMgqAAAAALSLVMfMHdcii2ZZLfB1nGkZ4-dJ';

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lockDuration, setLockDuration] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const recaptchaRef = React.createRef();

  useEffect(() => {
    let timer;
    if (lockDuration) {
      setRemainingTime(lockDuration * 60); // Convert minutes to seconds
      timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setLockDuration(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockDuration]);

  const formatRemainingTime = (seconds) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setCaptchaError('');
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken('');
    setCaptchaError('reCAPTCHA has expired, please verify again');
  };

  const validation = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setCaptchaError('');

    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please enter your password');
      isValid = false;
    }

    if (!captchaToken) {
      setCaptchaError('Please complete the captcha verification');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    try {
      console.log("Sending login request with data:", { email, password, captchaToken });
      
      const res = await loginUserApi({
        email,
        password,
        captchaToken
      });

      console.log("Login response:", res);

      if (!res.data.success) {
        if (res.data.message.includes('Too many login attempts from this IP')) {
          toast.error('Too many login attempts. Please try again after an hour');
          setIsLocked(true);
          setLockDuration(60); // Set to 60 minutes for an hour
        } else if (res.data.message.includes('attempts remaining')) {
          setPasswordError(res.data.message);
        } else if (res.data.message.includes('Account is locked')) {
          setIsLocked(true);
          const durationMatch = res.data.message.match(/(\d+)\s*minutes?/);
          if (durationMatch) {
            setLockDuration(parseInt(durationMatch[1]));
            setPasswordError(`Account has been locked for ${durationMatch[1]} minutes due to multiple failed attempts`);
          } else {
            setPasswordError('Account is temporarily locked due to multiple failed attempts');
          }
        } else {
          toast.error(res.data.message);
        }
        // Reset captcha on failed login
        recaptchaRef.current.reset();
        setCaptchaToken('');
      } else {
        toast.success('Login successful');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify({
          ...res.data.userData,
          permissions: res.data.userData.permissions || []
        }));
        
        if (res.data.userData.role === ROLES.ADMIN) {
          navigate('/admin/dashboard');
        } else if (res.data.userData.role === ROLES.VENDOR) {
          navigate('/vendor/manage-venues');
        } else {
          navigate('/homepage');
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      const errorMessage = error.response?.data?.message || 'Network error. Please check your connection.';
      toast.error(errorMessage);
      // Reset captcha on error
      recaptchaRef.current.reset();
      setCaptchaToken('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="assets/images/mainlogo.png" alt="Logo" className="login-logo" />
          <h2>Welcome Back!</h2>
          <p>Please login to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && <p className="error-message">{emailError}</p>}

          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}

          <div className="captcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaExpired}
              theme="light"
              size="normal"
            />
            {captchaError && <p className="error-message">{captchaError}</p>}
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLocked || !captchaToken}
          >
            {isLocked ? `Account locked (${formatRemainingTime(remainingTime)} remaining)` : 'Login'}
          </button>

          <div className="social-login">
            <button type="button" className="google-button">
              <FontAwesomeIcon icon={faGoogle} />
              <span>Login with Google</span>
            </button>
            <button type="button" className="facebook-button">
              <FontAwesomeIcon icon={faFacebook} />
              <span>Login with Facebook</span>
            </button>
          </div>

          <div className="login-footer">
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
            <a href="/register" className="register-link">
              Don't have an account? Register
            </a>
          </div>
        </form>
      </div>

      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-logo {
          width: 120px;
          margin-bottom: 20px;
        }

        .login-header h2 {
          color: #333;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .login-header p {
          color: #666;
          font-size: 16px;
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

        .login-button {
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

        .login-button:hover {
          transform: translateY(-2px);
        }

        .social-login {
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

        .login-footer {
          text-align: center;
          margin-top: 20px;
        }

        .forgot-password, .register-link {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          display: block;
          margin: 10px 0;
        }

        .error-message {
          color: #dc3545;
          font-size: 14px;
          margin: 5px 0;
        }

        .captcha-container {
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .login-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
      <ToastContainer />
    </div>
  );
};

export default Loginpage;
