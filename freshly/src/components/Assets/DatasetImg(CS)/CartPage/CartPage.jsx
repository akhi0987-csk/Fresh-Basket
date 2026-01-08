import React from 'react';
import './CartPage.css';

const CartPage = ({ items = [] }) => (
  <div className="cart-container">
    <h2>Your Shopping Cart</h2>
    {items.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <ul>
        {items.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">${item.price.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CartPage;
