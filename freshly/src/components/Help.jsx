import React, { useState } from 'react';
import { callVirtualAssistant, callCustomerRecommendation, callProductRecommendation } from './api';

function Help() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleVirtualAssistant = async () => {
        const response = await callVirtualAssistant(input);
        setOutput(response);
    };

    const handleCustomerRecommendation = async () => {
        const response = await callCustomerRecommendation(input);
        setOutput(response);
    };

    const handleProductRecommendation = async () => {
        const response = await callProductRecommendation(input);
        setOutput(response);
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input"
            />
            <button onClick={handleVirtualAssistant}>Ask Virtual Assistant</button>
            <button onClick={handleCustomerRecommendation}>Get Customer Recommendation</button>
            <button onClick={handleProductRecommendation}>Get Product Recommendation</button>
            <div>
                <h3>Output:</h3>
                <p>{output}</p>
            </div>
        </div>
    );
}

export default Help;
