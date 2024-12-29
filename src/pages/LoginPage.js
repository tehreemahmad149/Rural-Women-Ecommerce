import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users/login', { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      console.log('Login successful:', response.data);
      // Assuming a JWT token is returned, you can save it here
      localStorage.setItem('token', response.data.token);
      navigate('/shop'); // Redirect to shop page after successful login
    })
    .catch((error) => {
      setError('Invalid email or password.');
      console.log(error);
    });
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register" className="register-link">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
