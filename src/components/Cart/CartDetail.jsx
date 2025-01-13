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
        <div className="w-3/4 mx-auto space-x-4">
          <ul className="mt-4 space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border p-2"
              >
                <div className="flex items-center">
                  <span className="mr-4">{item.name}</span>
                  <ItemQuantitySelector
                    quantity={item.quantity}
                    onIncrement={() => updateQuantity(item.id, 1)}
                    onDecrement={() => updateQuantity(item.id, -1)}
                  />
                </div>
                <div>
                  <span>${item.price * item.quantity}</span>
                  <button onClick={() => handleRemoveItem(item.id, item.name)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-primary size-4 ml-2 hover:text-red-500"
                    />
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
              className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600"
              onClick={handleClearCart}
            >
              Vaciar Carrito
            </button>
            <button
              className="bg-green-900 text-white py-2 px-4 rounded hover:bg-green-700"
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
