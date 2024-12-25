import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const CartDetail = () => {
  const { cart, updateQuantity, removeItem, clearCart, totalItems } =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Función que maneja el proceso de finalizar compra
  const handleFinalizePurchase = () => {
    clearCart();
    alert("Compra finalizada. Gracias por tu compra!");
  };

  return (
    <div className="cart-detail p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Resumen del Carrito</h1>
      {cart.length > 0 ? (
        <div className="w-3/4 mx-auto space-x-4">
          <ul className="mt-4 space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border p-2"
              >
                <div className="flex items-center">
                  <span className="mr-4">{item.name}</span>
                  <div className="flex items-center">
                    <button
                      className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2 w-4 h-4 flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button
                      className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <span>${item.price * item.quantity}</span>
                  <button
                    className="ml-4 text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <p className="mt-4 font-bold">Total: ${totalPrice}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={clearCart}
            >
              Vaciar Carrito
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleFinalizePurchase}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default CartDetail;
