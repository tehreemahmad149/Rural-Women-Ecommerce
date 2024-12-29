import React, { useState } from 'react';
import axios from 'axios';
import '../css/RegisterPage.css';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/users/register', { name, email, password, role: 'customer' }, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login page after successful registration
    })
    .catch((error) => {
      setError('Error registering. Please try again.');
      console.log(error);
    });
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
          <button type="submit" className="register-button">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
