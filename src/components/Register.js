// src/components/Register.js
import React, { useState } from 'react';
import { register } from '../auth';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css'; // Import the CSS file for styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, displayName, userType);
      alert('User registered successfully!');
      navigate('/dashboard'); // Redirect to Dashboard after registration
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>User Type</label>
          <input
            type="text"
            placeholder="User Type (admin, staff, manager)"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
    </div>
  );
};

export default Register;
