import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ItemQuantitySelector from "../Items/Resources/ItemQuantitySelector";
import { handleFinalizePurchase } from "./Checkout";

const CartDetail = () => {
  const {
    cart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    modal,
    closeModal,
    setModal,
  } = useContext(CartContext);

  const [orderNumber, setOrderNumber] = useState(() => {
    const savedOrderNumber = localStorage.getItem("orderNumber");
    return savedOrderNumber ? parseInt(savedOrderNumber, 10) : 1;
  });

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
        onConfirm();
        closeModal();
      },
    });
  };

  const handleClearCart = () => {
    showModal(
      "Vaciar Carrito",
      "¿Está seguro de que desea vaciar el carrito?",
      clearCart
    );
  };

  const handleRemoveItem = (id, name) => {
    showModal(
      "Eliminar Producto",
      `¿Está seguro de eliminar ${name} del carrito?`,
      () => removeItem(id)
    );
  };

  useEffect(() => {
    localStorage.setItem("orderNumber", orderNumber);
  }, [orderNumber]);

  return (
    <div className="cart-detail p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Resumen del Carrito</h1>
      {cart.length > 0 ? (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-2 space-y-4">
        <ul className="mt-4 space-y-2">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border p-2 space-x-4"
            >
              {/* Nombre del producto */}
              <span className="flex-1 text-sm sm:text-base">{item.name}</span>
      
              {/* Selector de cantidad */}
              <div className="flex items-center space-x-2">
                <ItemQuantitySelector
                  quantity={item.quantity}
                  onIncrement={() => updateQuantity(item.id, 1)}
                  onDecrement={() => updateQuantity(item.id, -1)}
                />
              </div>
      
              {/* Precio */}
              <span className="w-16 text-right text-sm sm:text-base">
                ${item.price * item.quantity}
              </span>
      
              {/* Botón de borrar */}
              <button onClick={() => handleRemoveItem(item.id, item.name)}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-primary size-4 hover:text-red-500"
                />
              </button>
            </li>
          ))}
        </ul>
      
        {/* Sección de Total y Botones */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end space-y-4 sm:space-y-0">
          <p className="font-bold text-base sm:text-lg">Total: ${totalPrice}</p>
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="bg-red-500 text-white py-2 px-3 text-sm sm:text-base rounded hover:bg-red-600"
              onClick={handleClearCart}
            >
              Vaciar Carrito
            </button>
            <button
              className="bg-green-900 text-white py-2 px-3 text-sm sm:text-base rounded hover:bg-green-700"
              onClick={() =>
                handleFinalizePurchase(
                  cart,
                  totalPrice,
                  orderNumber,
                  clearCart,
                  showModal,
                  setOrderNumber
                )
              }
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
      
      
      ) : (
        <p>El carrito está vacío.</p>
      )}

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
