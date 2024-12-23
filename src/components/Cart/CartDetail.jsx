import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CartDetail = () => {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-detail p-4">
      <h1 className="text-2xl font-bold">Resumen del Carrito</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="mt-4 space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border p-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: ${totalPrice}</p>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
            Finalizar Compra
          </button>
        </div>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default CartDetail;
