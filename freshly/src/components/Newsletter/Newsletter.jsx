import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h1>Subscribe to Our Newsletter</h1>
      <p>Stay updated with the latest news and exclusive offers.</p>
      <form className="newsletter-form">
        <input type="email" placeholder="Enter your email address" required />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default Newsletter;
