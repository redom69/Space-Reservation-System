import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
