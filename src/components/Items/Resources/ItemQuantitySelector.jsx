import React from "react";

const ItemQuantitySelector = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center">
      <button
        className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={onDecrement}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="mx-2 w-4 h-4 flex items-center justify-center">
        {quantity}
      </span>
      <button
        className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default ItemQuantitySelector;
