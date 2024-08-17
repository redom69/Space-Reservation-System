import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
