import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../Cart/CartContext';

const CartWidget = () => {
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <button
      className="relative flex items-center"
      onClick={() => navigate('/cart')}
    >
      <FontAwesomeIcon icon={faShoppingCart} className="text-primary text-xl" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartWidget;
