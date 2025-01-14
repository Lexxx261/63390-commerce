import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../Cart/CartContext";
import ItemQuantitySelector from "../Resources/ItemQuantitySelector";
import AddItemButton from "../Resources/AddItemButton";

const ItemDetail = () => {
  const location = useLocation();
  const product = location.state?.product;
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un retraso en la carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Puedes ajustar el tiempo de carga si es necesario

    return () => clearTimeout(timer);
  }, []);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(Math.max(1, quantity - 1));

  const handleAddToCartWithNotification = () => {
    if (product) {
      addToCart(product, quantity);
      setNotification(`"${product.name}" se ha agregado al carrito!`);
      setTimeout(() => {
        setNotification(null);
      }, 1000);
    }
  };

  return (
    <div className="item-detail flex flex-col items-center justify-center space-y-4">
      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
          {notification}
        </div>
      )}

      <h1 className="text-2xl font-bold py-4">Detalle de Producto</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : product ? (
        <div className="w-full max-w-md p-2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
          <p className="text-sm text-gray-800">{product.description}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>

          <div className="flex justify-between">
            <div className="mt-4">
              <ItemQuantitySelector
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </div>

            <div className="mt-4">
              <AddItemButton
                product={product}
                quantity={quantity}
                addToCart={handleAddToCartWithNotification}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
};

export default ItemDetail;