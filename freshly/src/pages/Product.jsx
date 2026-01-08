import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../components/Assets/DatasetImg(CS)/DatasetImg(CS)/all_products2';
import './productStyle.css';

const Product = () => {
  const { Product_ID } = useParams();
  const product = products.find((item) => item.Product_ID === Product_ID);

  if (!product) {
    return <div>Product not found .....</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="star">&#9733;</span>);  // Unicode for filled star
    }
    return stars;
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', product.Name);
  };

  const similarProducts = products
    .filter((item) => item.Category === product.Category && item.Rating >= product.Rating && item.Product_ID !== product.Product_ID)
    .slice(0, 6);

  return (
    <>
      <div className="product-details">
      <h1 className="product-title">{product.Name}</h1>
        <div className="product-info">
          
          <div className="product-image-column">
          <img src={product.image} alt={product.Name} className="product-image" />
        </div>
        
          <h3 className="product-brand">Brand: {product.Brand}</h3>
          <h4 className="product-quantity">Quantity: {product.Quantity}</h4>
          <p className="product-price">₹{product.Price}</p>
          <p className="product-description">
            Description: {product.Description || 'No description available.'}
          </p>
          <div className="product-rating">
            Rating: {renderStars(product.Rating)}
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <div className="reviews">
            <h4>Reviews:</h4>
            <p>No reviews yet.</p>
          </div>
          <button className="help-button" onClick={() => alert('Help is on the way!')}>Help</button>
          <div className="similar-products">
            <h4>Similar Products:</h4>
            <ul>
              {similarProducts.map((similarProduct, index) => (
                <li key={index} className="cart-item">
                  <Link to={`/product/${similarProduct.Product_ID}`}>
                    <img src={similarProduct.image} alt={similarProduct.Name} className="item-image" />
                  </Link>
                  <div className="item-details">
                    <span className="item-name">{similarProduct.Name}</span>
                    <span className="item-price">₹{similarProduct.Price}</span>
                    <span className='item-rating'>{renderStars(similarProduct.Rating)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
