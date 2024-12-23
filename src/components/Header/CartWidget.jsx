import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartWidget = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="relative cursor-pointer">
      <FontAwesomeIcon icon={faShoppingCart} className="text-primary text-xl" />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartWidget;
