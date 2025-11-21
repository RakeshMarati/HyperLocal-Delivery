import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../store/slices/cartSlice';
import Button from '../../common/Button/Button';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (window.confirm(`Remove "${item.product.name}" from cart?`)) {
      dispatch(removeFromCart({
        productId: item.product._id,
        merchantId: item.merchant._id,
      }));
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        productId: item.product._id,
        merchantId: item.merchant._id,
        quantity: item.quantity - 1,
      }));
    } else {
      // If quantity is 1, remove the item
      handleRemove();
    }
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({
      productId: item.product._id,
      merchantId: item.merchant._id,
      quantity: item.quantity + 1,
    }));
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
          {item.product.image ? (
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-2xl">📦</div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                From: <span className="font-medium">{item.merchant.name}</span>
              </p>
              {item.product.description && (
                <p className="text-sm text-gray-500 line-clamp-1">
                  {item.product.description}
                </p>
              )}
            </div>
            <button
              onClick={handleRemove}
              className="ml-4 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors"
              title="Remove item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrease}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={item.quantity <= 1}
                  title="Decrease quantity"
                >
                  −
                </button>
                <span className="px-6 py-2 text-gray-900 font-bold text-lg min-w-[3rem] text-center bg-gray-50">
                  {item.quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors font-semibold"
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">
                ₹{item.product.price.toFixed(2)} × {item.quantity} {item.product.unit || 'piece'}
              </p>
              <p className="text-xl font-bold text-blue-600">
                ₹{itemTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

