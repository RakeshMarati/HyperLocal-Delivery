import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/slices/cartSlice';
import CartItem from '../components/cart/CartItem/CartItem';
import CartSummary from '../components/cart/CartSummary/CartSummary';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';

const CartPage = () => {
  const items = useSelector(selectCartItems);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-12">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/merchants">
                <Button variant="primary" size="lg">
                  Browse Merchants
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {items.map((item, index) => (
              <CartItem key={`${item.product._id}-${item.merchant._id}-${index}`} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

