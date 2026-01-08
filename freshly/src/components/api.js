// src/api.js
import axios from 'axios';


export const callVirtualAssistant = async (input) => {
    try {
        const response = await axios.post('/api/virtual-assistant', { input });
        return response.data.response;
    } catch (error) {
        console.error('Error calling virtual assistant API', error);
        return null;
    }
};


export const callCustomerRecommendation = async (input) => {
    try {
        const response = await axios.post('/api/customer-recommendation', { input });
        return response.data.response;
    } catch (error) {
        console.error('Error calling customer recommendation API', error);
        return null;
    }
};


export const callProductRecommendation = async (input) => {
    try {
        const response = await axios.post('/api/product-recommendation', { input });
        return response.data.response;
    } catch (error) {
        console.error('Error calling product recommendation API', error);
        return null;
    }
};
