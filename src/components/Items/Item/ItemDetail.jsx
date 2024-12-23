import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ItemDetail = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  // Función para incrementar la cantidad
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  // Función para decrementar la cantidad (sin bajar de 1)
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Función para agregar al carrito (ejemplo)
  const handleAddToCart = () => {
    console.log(`Producto agregado: ${product.name} - Cantidad: ${quantity}`);
    // Aquí iría la lógica para agregar el producto a tu base de datos (Firebase)
  };

  return (
    <div className="container mx-auto p-8">
      {product ? (
        <div className="max-w-2xl mx-auto border p-4 rounded-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover mb-4 rounded-md"
          />
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-bold mb-4">${product.price}</p>

          {/* Item Quantity Selector */}
          <div className="flex items-center mb-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l"
            >
              -
            </button>
            <span className="px-4 py-1 bg-white border-t border-b text-lg">
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r"
            >
              +
            </button>
          </div>

          {/* Botón de agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="flex items-center bg-blue-500 text-primary px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Agregar al carrito
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500">Producto no encontrado</p>
      )}
    </div>
  );
};

export default ItemDetail;
