import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">The Bazaar</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/mentors">Mentors</Link></li>
          <li><Link to="/tutorials">Tutorials</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
