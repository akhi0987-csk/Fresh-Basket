import React from "react";
import './Breadcrum.css';
import arrow_icon from '../Assets/DatasetImg(CS)/logos/arrow_icon.jpg';

const Breadcrum = (props) => {
  const { Product } = props;

  if (!Product || !Product.Category || !Product.Name) {
    return <div className="breadcrum">Error: Product data is missing.</div>;
  }

  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt=""/> SHOP <img src={arrow_icon} alt=""/> {Product.Category} <img src={arrow_icon} alt=""/> {Product.Name}
    </div>
  );
};

export default Breadcrum;
