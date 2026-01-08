import React from "react";
import './Vegetables.css';
import { veggies} from "../Assets/DatasetImg(CS)/DatasetImg(CS)/veggies";
import Item from "../Item/Item";

const Vegetables = () => {
    return (
        <div className="veggies">
      <h1>Fresh Veggies From The Farm</h1>
      <hr />
      <div className="veggies-item">
        {veggies.map((item) => {
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
export default Vegetables;