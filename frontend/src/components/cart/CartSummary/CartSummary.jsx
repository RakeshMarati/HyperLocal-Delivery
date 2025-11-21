import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotal, selectCartItemsCount } from '../../../store/slices/cartSlice';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';

const CartSummary = ({ onCheckout }) => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const items = useSelector((state) => state.cart.items);

  // Group items by merchant
  const itemsByMerchant = items.reduce((acc, item) => {
    const merchantId = item.merchant._id;
    if (!acc[merchantId]) {
      acc[merchantId] = {
        merchant: item.merchant,
        items: [],
        subtotal: 0,
      };
    }
    acc[merchantId].items.push(item);
    acc[merchantId].subtotal += item.product.price * item.quantity;
    return acc;
  }, {});

  const deliveryFee = 50; // Fixed delivery fee (can be made dynamic later)
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>

      {/* Items by Merchant */}
      <div className="mb-4 space-y-3">
        {Object.values(itemsByMerchant).map((group) => (
          <div key={group.merchant._id} className="border-b pb-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {group.merchant.name}
            </p>
            <p className="text-sm text-gray-600">
              Subtotal: ₹{group.subtotal.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Items ({cartItemsCount})</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      {onCheckout ? (
        <Button
          variant="primary"
          size="lg"
          className="w-full mb-3"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      ) : (
        <Link to="/checkout">
          <Button variant="primary" size="lg" className="w-full mb-3">
            Proceed to Checkout
          </Button>
        </Link>
      )}

      <Link to="/merchants">
        <Button variant="outline" size="md" className="w-full">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default CartSummary;

