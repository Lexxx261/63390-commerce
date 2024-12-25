import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import Modal from "../Modal";

const CartDetail = () => {
  const { 
    cart, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    totalItems, 
    modal, 
    closeModal, 
    setModal // Aquí estamos desestructurando setModal
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const showModal = (title, message, onConfirm) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm(); // Ejecutar la función de confirmación
        closeModal(); // Luego, cerrar el modal
      },
    });
  };
  
  

  const handleClearCart = () => {
    showModal(
      "Vaciar Carrito",
      "¿Está seguro de que desea vaciar el carrito?",
      clearCart // clearCart es la función que se pasará
    );
  };
  
  const handleRemoveItem = (id, name) => {
    showModal(
      "Eliminar Producto",
      `¿Está seguro de eliminar ${name} del carrito?`,
      () => removeItem(id) // Pasando la función removeItem al modal
    );
  };
  
  const handleFinalizePurchase = () => {
    showModal(
      "Gracias por tu compra",
      `Ha adquirido un total de ${totalItems} artículos por un monto de $${totalPrice}.`,
      clearCart // Pasamos clearCart para vaciar el carrito después de la compra
    );
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
                    onClick={() => handleRemoveItem(item.id, item.name)}
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
              onClick={handleClearCart}
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

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
};

export default CartDetail;
