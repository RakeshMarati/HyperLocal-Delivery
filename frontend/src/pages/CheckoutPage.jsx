import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import { createOrder } from '../store/thunks/orderThunks';
import { clearCart } from '../store/slices/cartSlice';
import Button from '../components/common/Button/Button';
import LocationView from '../components/location/LocationView/LocationView';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { address } = useSelector((state) => state.location);
  const { isLoading, error } = useSelector((state) => state.orders);

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

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

  const deliveryFee = 50;
  const grandTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!address || !address.city || !address.pincode) {
      alert('Please set your delivery location first');
      navigate('/location');
      return;
    }

    setIsPlacingOrder(true);

    // Create orders for each merchant (one order per merchant)
    const orderPromises = Object.values(itemsByMerchant).map(async (group) => {
      const orderItems = group.items.map((item) => ({
        productId: item.product._id,
        productName: item.product.name,
        productPrice: item.product.price,
        quantity: item.quantity,
      }));

      const orderData = {
        items: orderItems,
        merchantId: group.merchant._id,
        deliveryAddress: address,
        paymentMethod,
      };

      return dispatch(createOrder(orderData));
    });

    try {
      const results = await Promise.all(orderPromises);
      const allSuccess = results.every((result) => result.success);

      if (allSuccess) {
        // Clear cart after successful order
        dispatch(clearCart());
        // Navigate to order confirmation
        navigate('/orders/confirmation', {
          state: { orders: results.map((r) => r.order) },
        });
      } else {
        alert('Some orders failed to place. Please try again.');
      }
    } catch (err) {
      console.error('Order placement error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Button variant="primary" onClick={() => navigate('/merchants')}>
            Browse Merchants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Delivery Address
              </h2>
              {address ? (
                <div>
                  <div className="mb-4">
                    <p className="text-gray-700">
                      {address.street && <span className="block">{address.street}</span>}
                      <span className="block">
                        {[address.city, address.state, address.pincode]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </p>
                  </div>
                  <LocationView address={address} height="200px" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/location')}
                    className="mt-4"
                  >
                    Change Address
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    Please set your delivery location
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/location')}
                  >
                    Set Delivery Location
                  </Button>
                </div>
              )}
            </div>

            {/* Order Items by Merchant */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              {Object.values(itemsByMerchant).map((group) => (
                <div key={group.merchant._id} className="mb-6 pb-6 border-b last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {group.merchant.name}
                  </h3>
                  <div className="space-y-2">
                    {group.items.map((item, index) => (
                      <div
                        key={`${item.product._id}-${index}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="text-gray-900 font-medium">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <span className="font-medium text-gray-900">Subtotal</span>
                    <span className="font-bold text-gray-900">
                      ₹{group.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Cash on Delivery (COD)
                    </span>
                    <p className="text-sm text-gray-600">
                      Pay when you receive your order
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                    disabled
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Online Payment
                    </span>
                    <p className="text-sm text-gray-600">
                      Coming soon
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Total
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items ({items.length})</span>
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

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || isLoading || !address}
              >
                {isPlacingOrder || isLoading
                  ? 'Placing Order...'
                  : 'Place Order'}
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full mt-3"
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

