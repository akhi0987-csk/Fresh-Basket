import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">FreshBasket</h1>
          <p>
            FreshBasket is a leading retailer offering the best deals on a wide range of products.
            Subscribe to our newsletter for the latest news and special offers.
          </p>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <ul>
            <li>Email: contact@FreshBasket.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 052 Street, gajapathi, odisha</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 FreshBasket | Designed by group13
      </div>
    </footer>
  );
};

export default Footer;
