import React from "react";
import './Fruits.css';
import { Fruity } from "../Assets/DatasetImg(CS)/DatasetImg(CS)/fruits";
import Item from "../Item/Item";

const Fruits = () => {
    return (
        <div className="fruit">
      <h1>Fresh Fruits From The Farm</h1>
      <hr />
      <div className="fruit-item">
        {Fruity.map((item) => {
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
export default Fruits;