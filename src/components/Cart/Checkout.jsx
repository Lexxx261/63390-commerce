import React from 'react';
import { useCart } from './CartContext';

const Checkout = () => {
  const { cartItems } = useCart();

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Resumen del Carrito</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="border-b py-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: ${item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay productos en el carrito.</p>
      )}
    </div>
  );
};

export default Checkout;
