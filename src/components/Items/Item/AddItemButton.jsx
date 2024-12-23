import React, { useState } from 'react';
import { useCart } from '../../Cart/CartContext.jsx';


const AddItem = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
  
    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  
    const handleAddToCart = () => {
      addToCart(product, quantity);
    };
  
    return (
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-4">
          <button onClick={decreaseQuantity} className="bg-gray-300 px-3 py-1 rounded-l">
            -
          </button>
          <span className="px-4 py-1 border-t border-b text-lg">{quantity}</span>
          <button onClick={increaseQuantity} className="bg-gray-300 px-3 py-1 rounded-r">
            +
          </button>
        </div>
  
        <button
          onClick={handleAddToCart}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          <i className="fas fa-shopping-cart mr-2"></i>
          Agregar al carrito
        </button>
      </div>
    );
  };
  
  export default AddItem;