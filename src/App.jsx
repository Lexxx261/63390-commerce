import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Header/Navbar';
import Catalog from './components/Items/ItemListContainer';
import ItemDetail from './components/Items/Item/ItemDetail';
import { CartProvider } from './components/Cart/CartContext';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
        </CartProvider>
    </div>
  );
}

export default App;
