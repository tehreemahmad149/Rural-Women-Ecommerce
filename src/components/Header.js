  import React, { useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import '../css/Header.css';

  function Header() {
    useEffect(() => {
      // Check if the script is already loaded to avoid duplication
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.id = 'google-translate-script'; // Add an ID to the script tag to avoid re-adding it
        script.async = true;
        document.body.appendChild(script);
      }

      // Initialize the Google Translate widget once the script is loaded
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en' },  // Default page language (can be changed)
          'google_translate_element'  // Element ID where the widget will be rendered
        );
      };
    }, []);

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
          {/* Google Translate Widget */}
          <div
            id="google_translate_element"
            style={{ marginLeft: '20px', marginTop: '8px' }}
          ></div>
        </nav>
      </header>
    );
  }

  export default Header;