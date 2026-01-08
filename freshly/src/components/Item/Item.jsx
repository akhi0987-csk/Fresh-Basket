import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ Product_ID, Name, Brand, Price, image }) => {
  return (
    <div className="item">
      <h5>{Brand}</h5>
      
      <Link to={`/Product/${Product_ID}`}>
        <img src={image} alt={Name} />
      </Link>
      <p>{Name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {Price}
        </div>
      </div>
    </div>
  );
};

export default Item;
