import React from 'react';
import '../css/HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage-container">
      <main className="main-content">
        <h1>Welcome to The Bazaar</h1>
        <p>Your one-stop platform for promoting the businesses of rural women.</p>
        <Link to="/login" className="login-link">Login</Link>
      </main>
    </div>
  );
}

export default HomePage;
