import React, { useEffect, useState } from 'react';
import './LoginPopup.css';
import { FaTimes } from 'react-icons/fa';
import { auth } from '../../firebase'; // adjust path if needed
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpPopup = ({ setShowSignUp, setShowLogin }) => {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      setShowSignUp(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='login-popup-overlay'>
      <div className={`login-popup ${animate ? 'show' : ''}`}>
        <button className="close-btn" onClick={() => setShowSignUp(false)}>
          <FaTimes />
        </button>
        <h2>Sign Up</h2>
        <form className='login-form' onSubmit={handleSubmit}>
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
          <button type="submit">Create Account</button>
        </form>
        {error && <p className="error-text">{error}</p>}
        <p className="signup-text">
          Already have an account?{' '}
          <span
            onClick={() => {
              setShowSignUp(false);
              setShowLogin(true);
            }}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPopup;
