import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './stylesheet/Landing.css';
import newImage from '../assets/timecap3.jpeg';


export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="landing">
     <div className="landing-hero">
  <div className="hero-content">
    {/* Left Section: Animated Title */}
    <div className="hero-left">
      <div className="animated-title-container">
        <h1 className="memory-title">MEMORY</h1>
        <h1 className="mail-title">MAIL</h1>
      </div>
    </div>

    {/* Right Section: Image and Overlaid Content */}
    <div className="hero-right">
      <div className="landing-image-wrapper">
        <img
        src={newImage}
          alt="Time capsule"
          className="landing-image"
        />
        <div className="landing-overlay-content">
          <h1 className="landing-title">Send Messages to the Future</h1>
          <p className="landing-subtitle">
            Create digital time capsules with MemoryMail.  
            <br/>      
            Share messages, photos, and memories that will be delivered at the perfect moment.
          </p>
          <div className="landing-buttons">
            {user ? (
              <Link to="/dashboard" className="landing-button-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="landing-button-primary">
                  Get started
                </Link>
                <Link to="/login" className="landing-button-secondary">
                  Sign in <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* About Section */}
      <section className="landing-about">
      {/* <div className="landing-animation">
          <div className="circle-animation circle-1"></div>
          <div className="circle-animation circle-2"></div>
          <div className="circle-animation circle-3"></div>
        </div> */}
        <div className="landing-container">
          <h2 className="landing-section-title">About MemoryMail</h2>
          <p className="landing-section-description">
            MemoryMail allows you to send messages, pictures, and videos into the future. 
            Whether it's a heartfelt note for a loved one or a message to your future self, 
            our platform ensures your memories are preserved and delivered at the right time.
          </p>
        </div>
        
      </section>

      <section className="landing-hiw">
        <div className="landing-container">
          <h2 className="landing-section-title">How It Works?</h2>
          <div className="features-container">
            {/* Feature Card 1 */}
            <div className="feature-card">
              <div className="feature-icon">
                🕰️
              </div>
              <h3 className="feature-title">Create Time Capsules</h3>
              <p className="feature-description">
                Store messages, photos, and audio recordings in secure digital capsules.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card">
              <div className="feature-icon">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="feature-title">Collaborate</h3>
              <p className="feature-description">
                Invite friends and family to contribute to your time capsules via email.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card">
              <div className="feature-icon">
                ⏳
              </div>
              <h3 className="feature-title">Set the Timer</h3>
              <p className="feature-description">
                Choose when your capsule opens. The contents remain sealed until then.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="landing-contact">
        <div className="landing-container">
          <h2 className="landing-section-title">Contact Us</h2>
          <p className="landing-section-description">
            Have questions or need help? Reach out to us:
          </p>
          <Link to="/contact-us" className="landing-contact-list">Contact Us</Link>

        </div>
      </section>
    </div>
  );
}
