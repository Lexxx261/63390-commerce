import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../Cart/CartContext';

const ItemDetail = () => {
  const location = useLocation();
  const product = location.state?.product;
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);

      setNotification(`"${product.name}" se ha agregado al carrito!`);

      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
  };

  return (
    <div className="item-detail flex flex-col items-center justify-center space-y-4">
      {/* Notificación en la parte superior */}
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
          {notification}
        </div>
      )}

      <h1 className="text-2xl font-bold py-4">Detalle de Producto</h1>
      {product ? (
        <div className="w-full max-w-md">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
          <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
          <p className="text-sm text-gray-800">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>

          <div className="mt-4 flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              -
            </button>
            <span className='mx-2 w-4 h-4 flex items-center justify-center'>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-secondary hover:bg-seconacc text-white font-bold py-2 px-4 rounded w-full"
          >
            Agregar al carrito
          </button>
        </div>
      ) : (
        <p>Cargando Producto...</p>
      )}
    </div>
  );
};

export default ItemDetail;
