import React, { createContext, useState, useEffect } from "react";
import { products } from "../components/Assets/DatasetImg(CS)/DatasetImg(CS)/all_products2";

export const Shopcontext = createContext(null);

const ShopcontextProvider = (props) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(products);
  }, []);

  const contextValue = { product };

  return (
    <Shopcontext.Provider value={contextValue}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default ShopcontextProvider;
