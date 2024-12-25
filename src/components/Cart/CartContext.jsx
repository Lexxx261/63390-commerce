import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const openModal = (title, message, onConfirm) => {
    setModal({ isOpen: true, title, message, onConfirm });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", onConfirm: null });
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
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
    setTotalItems((prevTotal) => prevTotal + amount);
  };

  const removeItem = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
  
    if (itemToRemove) {
      // Elimina el producto del carrito
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      // Actualiza el total de artículos
      setTotalItems((prevTotal) => prevTotal - itemToRemove.quantity);
      closeModal(); // Cierra el modal después de la acción
    }
  };
  

  const clearCart = () => {
    setCart([]);
    setTotalItems(0);
    closeModal(); // Asegurarse de que el modal se cierra después de vaciar el carrito
  };
  

  const finalizePurchase = () => {
    openModal(
      "Gracias por su compra",
      `Ha adquirido un total de ${totalItems} artículos.`,
      () => {
        setCart([]);
        setTotalItems(0);
        closeModal();
      }
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        finalizePurchase,
        totalItems,
        modal,
        setModal,  // Asegúrate de pasar setModal aquí
        closeModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
