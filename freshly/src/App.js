// src/App.js
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Loginpage from './pages/Loginpage';
import Grocerypage from './pages/Grocerypage';
import Veggiespage from './pages/Veggiespage';
import Fruitspage from './pages/Fruitspage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/groceries" element={<Grocerypage category="groceries" />} />
          <Route path="/veggies" element={<Veggiespage category="veggies" />} />
          <Route path="/fruits" element={<Fruitspage category="fruits" />} />
          <Route path="/product/:Product_ID" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/ChatBot" element={<Chatbot />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
