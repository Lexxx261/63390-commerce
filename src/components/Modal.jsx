import React from "react";

const Modal = ({ isOpen, title, message, onConfirm, onClose }) => {
    if (!isOpen) return null;
  
    const handleConfirm = () => {
      if (onConfirm) {
        onConfirm();
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            {onConfirm && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  

export default Modal;
