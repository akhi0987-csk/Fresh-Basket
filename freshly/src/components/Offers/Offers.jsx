import React from 'react';
import './Offers.css';
import bg4 from '../Assets/DatasetImg(CS)/logos/bg4.jpeg';

const Offers = () => {
    return (
        <div className='offers' style={{ backgroundImage: `url(${bg4})` }}>
            <div className='offers-content'>
                <div className='offers-left'>
                    <h1>Fresh Fruits Sale</h1>
                    <p>Don't miss out on the freshest fruits at unbeatable prices.</p>
                    <h1>Buy 2 Get 1 Free</h1>
                    <p>Mix & Match any vegetables and get the cheapest one free!</p>
                    <button className='offer-button'>Check Now</button>
                </div>
                <div className='offers-right'>
                    
                </div>
            </div>
        </div>
    );
}

export default Offers;
