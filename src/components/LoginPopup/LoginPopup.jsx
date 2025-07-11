import React, { useEffect, useState, useRef } from 'react';
import './LoginPopup.css';
import { FaTimes } from 'react-icons/fa';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Login Successful!');
      setTimeout(() => {
        setShowLogin(false);
        navigate('/home');
      }, 2000); 
    } catch (err) {
      console.error("Firebase login error:", err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className='login-popup-overlay'>
      <div className={`login-popup ${animate ? 'show' : ''}`}>
        <button className="close-btn" onClick={() => setShowLogin(false)}>
          <FaTimes />
        </button>

        <h2>Login</h2>

        <form className='login-form' onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        {successMessage && <p className="success-text">{successMessage}</p>}

        <p className="signup-text">
          Don’t have an account?{' '}
          <a href="/signup" style={{ color: 'blue' }}>SignUp</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
