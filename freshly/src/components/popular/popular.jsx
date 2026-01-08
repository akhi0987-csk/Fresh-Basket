import React from "react";
import './popular.css';
import { data_product } from "../Assets/DatasetImg(CS)/DatasetImg(CS)/data";
import Item from "../Item/Item";

const Popular = () => {
  return (
    <div className="popular">
      <h1>POPULAR</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item) => {
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

export default Popular;
