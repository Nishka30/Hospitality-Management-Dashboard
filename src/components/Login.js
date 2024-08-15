// src/components/Login.js
import React, { useState } from 'react';
import { login } from '../auth';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert('User logged in successfully!');
      navigate('/dashboard'); // Redirect to Dashboard after login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit" className="btn btn-primary">LOGIN</button>
        
        <p>Don't have an account? <Link to="/register" className="btn btn-primary login-link">REGISTER</Link></p>
      
      </form>
      
    </div>
  );
};

export default Login;
