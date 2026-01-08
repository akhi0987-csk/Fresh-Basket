import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/popular/popular";
import Offers from "../components/Offers/Offers";
import Newsletter from "../components/Newsletter/Newsletter";
import Product1 from "../components/Product1/Product1";

const Shop = () => {
    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <Product1/>
           <Newsletter/>   
  
        </div>
    );
}

export default Shop;
