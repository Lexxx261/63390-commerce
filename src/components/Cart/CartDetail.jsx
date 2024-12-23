import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CartDetail = () => {
  const { cart, updateQuantity, removeItem, clearCart, totalItems } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Función que maneja el proceso de finalizar compra
  const handleFinalizePurchase = () => {
    // Aquí puedes agregar la lógica para procesar la compra, como una llamada a la API
    // Una vez completada la compra, vaciar el carrito
    clearCart();  // Vaciar el carrito
    alert('Compra finalizada. Gracias por tu compra!');  // Mostrar mensaje de confirmación
  };

  return (
    <div className="cart-detail p-4">
      <h1 className="text-2xl font-bold">Resumen del Carrito</h1>
      {cart.length > 0 ? (
        <div>
          <ul className="mt-4 space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border p-2">
                <div className="flex items-center">
                  <span className="mr-4">{item.name}</span>
                  <div className="ml-4 flex items-center">
                    <button 
                      className="px-2 py-1 bg-gray-300 rounded"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      className="px-2 py-1 bg-gray-300 rounded"
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
          <p className="mt-4 font-bold">Total: ${totalPrice}</p>
          <p className="mt-2 font-semibold">Total Items: {totalItems}</p>
          <div className="mt-4">
            <button 
              className="bg-green-500 text-primary py-2 px-4 rounded mr-2"
              onClick={handleFinalizePurchase}  // Llamamos a la función al hacer clic
            >
              Finalizar Compra
            </button>
            <button 
              className="bg-red-500 text-primary py-2 px-4 rounded"
              onClick={clearCart}
            >
              Vaciar Carrito
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
