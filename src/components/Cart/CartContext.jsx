import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // Contador para el widget

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Actualizamos la cantidad si ya existe
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Agregamos el producto si no existe
        return [...prevCart, { ...product, quantity }];
      }
    });

    // Actualizamos el contador total
    setTotalItems((prevTotal) => prevTotal + quantity);
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0) 
    );

    // Actualizar el contador de totalItems
    setTotalItems((prevTotal) => prevTotal + amount);
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    // Reducir el contador totalItems según la cantidad del producto eliminado
    const itemToRemove = cart.find((item) => item.id === id);
    if (itemToRemove) {
      setTotalItems((prevTotal) => prevTotal - itemToRemove.quantity);
    }
  };

  const clearCart = () => {
    setCart([]);
    setTotalItems(0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
