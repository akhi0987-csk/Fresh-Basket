import React from "react";
import './Product.css';
import { feat_product } from "../Assets/DatasetImg(CS)/DatasetImg(CS)/featured_products";
import Item from "../Item/Item";

const Product1 = () => {
  return (
    <div className="product1">
      <h1>POPULAR</h1>
      <hr />
      <div className="product1-item">
        {feat_product.map((item) => {
          return (
            <Item
              key={item.id}
              Product_ID={item.Product_ID}
              Brand={item.Brand}
              Name={item.Name}
              Price={item.Price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Product1;