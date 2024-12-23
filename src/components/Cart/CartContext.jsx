import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (quantity) => {
    setCartCount((prevCount) => prevCount + quantity);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};