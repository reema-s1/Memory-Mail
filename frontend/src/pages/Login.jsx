import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './stylesheet/Login.css';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the payload for login request
      const payload = { email, password };
  
      // Make the API call to the backend login endpoint
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Login response:', result); // Debug log
  
        // If login is successful, store the token and user info in context
        login(result.user, result.token); // Pass user and token separately
  
        // Redirect to the dashboard or home page
        navigate('/dashboard');
      } else {
        // Handle any error from the API response
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <h2 className="login-header">
            Login
          </h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <div className="error-text">{error}</div>
            </div>
          )}
          <div className="input-group">
            <div className="input-field-container">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field-container">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="login-button"
            >
              Sign in
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/register" className="register-link">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
