import './stylesheet/AboutUs.css'; // Import the CSS file
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1 className="about-us-title">About Us</h1>
        <p className="about-us-subtitle">
          Learn more about our mission, vision, and the team behind the MemoryMail project.
        </p>
      </div>
      <section className="about-us-section">
  <h2 className="about-us-heading">What is MemoryMail?</h2>
  <p className="about-us-text">
    MemoryMail is a digital time capsule platform designed to help you preserve important messages, photos, and memories.
  </p>
</section>


      <section className="about-us-section">
        <h2 className="about-us-heading">Our Mission</h2>
        <p className="about-us-text">
          At MemoryMail, we believe in preserving precious memories for the future. Our mission
          is to create a platform where people can save meaningful messages, photos, and more,
          to be unlocked and cherished at the perfect moment.
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="about-us-heading">Our Vision</h2>
        <p className="about-us-text">
          We envision a world where technology bridges the past, present, and future, creating
          lasting connections between people and their memories.
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="about-us-heading">Meet the Team</h2>
        <p className="about-us-text">
          Our team consists of dedicated computer science students who are passionate about exploring the world of technology. With a shared commitment to innovation and a drive to create meaningful experiences, we're eager to push boundaries and develop solutions that make a difference. As we continue to learn, grow, and collaborate, we aim to reach new heights in both our academic and professional journeys.
        </p>
      </section>

      <footer className="about-us-footer">
        <p className="about-us-footer-text">
          &copy; {new Date().getFullYear()} Time Capsule. All rights reserved.
        </p>
        <p className="about-us-footer-contact">
          <Link to="/contact-us" className="about-us-footer-link">Contact Us</Link>
        </p>
      </footer>
    </div>
  );
}
