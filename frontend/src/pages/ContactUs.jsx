import React from 'react';
import './stylesheet/ContactUs.css'; // Import the CSS file

export default function ContactUs() {
  return (
    <div className="contact-us-container">
      <div className="contact-us-header">
        <h1 className="contact-us-title">Meet The Creators</h1>
        <p className="contact-us-subtitle">
          We are a passionate team dedicated to building meaningful experiences. Here's a bit about us.
        </p>
      </div>

      <div className="creator-section">
        <div className="creator-card">
          <h2 className="creator-name">Saijyoti P</h2>
          <p className="creator-description">
          </p>
          <div className="social-links">
            <a href="https://github.com/sjp-codes" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/ft.saijyoti" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>

        <div className="creator-card">
          <h2 className="creator-name">Reema S</h2>
          <p className="creator-description">
          </p>
          <div className="social-links">
            <a href="https://github.com/reema-s1" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/reema_exists" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>

        <div className="creator-card">
          <h2 className="creator-name">Rucha Vikrant W</h2>
          <p className="creator-description">
          </p>
          <div className="social-links">
            <a href="https://github.com/Ruchavw" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/ruchaw18" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="contact-info">
        <h2 className="contact-info-title">Contact Us</h2>
        <p className="contact-info-text">
            Check out our GitHub repository via the link below:
        </p>
        <p className="contact-info-github">
            <a href="https://github.com/sjp-codes/Memory-Mail" target="_blank" rel="noopener noreferrer" className="contact-info-link">
            Visit our GitHub Repository
            </a>
        </p>
    </div>

    </div>
  );
}
