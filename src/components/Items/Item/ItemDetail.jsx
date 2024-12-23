import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../Cart/CartContext';

const ItemDetail = () => {
  const location = useLocation();
  const product = location.state?.product;
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="item-detail flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Detalle de Producto</h1>
      {product ? (
        <div className="w-full max-w-md">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
          <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
          <p className="text-sm text-gray-800">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>

          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 bg-gray-300 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 bg-gray-300 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-primary font-bold py-2 px-4 rounded"
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
