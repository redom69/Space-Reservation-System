import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

import logo from '../assets/calendar-days.png';

import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img
          src={logo}
          alt="App Logo"
          className="login-logo"
          style={{ width: '50px', height: '50px' }}
        />
        <h1>Sign in to Space Reservation System</h1>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="login_field">Email address</label>
        <input
          type="text"
          id="login_field"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="login-button">
          Sign in
        </button>
        <div className="login-footer">
          <div className="new-account">
            New to SRS?{' '}
            <Link to="/register" className="create-account-link">
              Create an account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
