import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to MentorConnect</h1>
        <p>Connecting Students with Alumni Mentors for Career Growth</p>
        <div className="cta-buttons">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2>Why Choose MentorConnect?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Smart Matching</h3>
              <p>Connect with mentors based on shared interests, skills, and career goals.</p>
            </div>
            <div className="feature-card">
              <h3>Interactive Communication</h3>
              <p>Seamless messaging and discussion forums for effective mentorship.</p>
            </div>
            <div className="feature-card">
              <h3>Progress Tracking</h3>
              <p>Set goals, track milestones, and measure your growth over time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Profile</h3>
              <p>Sign up and build your profile with your interests and goals.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Find Mentors</h3>
              <p>Browse and connect with alumni mentors in your field.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Start Mentorship</h3>
              <p>Kick off your mentorship journey with clear goals and communication.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Track Progress</h3>
              <p>Monitor your achievements and celebrate your growth.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;