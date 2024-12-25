import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Catalog from './components/Items/ItemListContainer';
import ItemDetail from './components/Items/Item/ItemDetail';
import { CartProvider } from './components/Cart/CartContext';
import MainLayout from './components/Layouts/MainLayout';
import SimpleLayout from './components/Layouts/SimpleLayout';
import CartDetail from './components/Cart/CartDetail';
import Modal from './components/Modal'

const App = () => (
  <CartProvider>
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Catalog />
          </MainLayout>
        }
      />
      <Route
        path="/item/:id"
        element={
          <SimpleLayout>
            <ItemDetail />
          </SimpleLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <SimpleLayout>
            <CartDetail />
          </SimpleLayout>
        }
      />
    </Routes>
    <Modal />
  </CartProvider>
);

export default App;
