import React from "react";

const AddItemButton = ({ product, quantity, addToCart }) => {
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-secondary hover:bg-seconacc text-white font-bold py-2 px-4 rounded w-full"
    >
      Agregar al carrito
    </button>
  );
};

export default AddItemButton;
