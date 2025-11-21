import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../store/slices/cartSlice';
import Button from '../../common/Button/Button';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart({
      productId: item.product._id,
      merchantId: item.merchant._id,
    }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({
        productId: item.product._id,
        merchantId: item.merchant._id,
        quantity: newQuantity,
      }));
    } else {
      handleRemove();
    }
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-600">
                From: {item.merchant.name}
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>

          {item.product.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
              {item.product.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-1 text-gray-900 font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">
                ₹{item.product.price.toFixed(2)} × {item.quantity}
              </p>
              <p className="text-lg font-bold text-blue-600">
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

