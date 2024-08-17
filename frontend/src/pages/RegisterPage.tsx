import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

import logo from '../assets/calendar-days.png';

import '../styles/LoginPage.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', {
        email,
        password,
        fullName,
      });
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', error);
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
        <h1>Register for Space Reservation System</h1>
      </div>
      <form className="login-form" onSubmit={handleRegister}>
        <label htmlFor="full_name">Full Name</label>
        <input
          type="text"
          id="full_name"
          className="login-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label htmlFor="login_field">Email address</label>
        <input
          type="email"
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
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
