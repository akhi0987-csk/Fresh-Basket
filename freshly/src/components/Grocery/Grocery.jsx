import React from "react";
import './Grocery.css';
import { products } from "../Assets/DatasetImg(CS)/DatasetImg(CS)/all_products2";
import Item from "../Item/Item";
const Grocery = () => {
  return (
    <div className="groceries">
      <h1>Groceries For You</h1>
      <hr />
      <div className="grocery-item">
        {products.map((item) => {
          return (
            <Item
              key={item.Product_ID}
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

export default Grocery;
