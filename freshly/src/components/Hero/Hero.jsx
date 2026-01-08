import React from 'react';
import './Hero.css';
import fresh from '../Assets/DatasetImg(CS)/logos/app_logo_2.jpg';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to FreshGroceries</h1>
        <p>Your one-stop shop for the freshest produce and groceries.</p>
        <button className="shop-now-button">Shop Now</button>
      </div>
      <div className="hero-image">
        <img src={fresh} alt="Fresh Groceries" />
        
      </div>
    </div>
  );
}

export default Hero;
