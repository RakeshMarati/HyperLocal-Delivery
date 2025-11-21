import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orders = location.state?.orders || [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No order found</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    out_for_delivery: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          {/* Order Details */}
          {orders.map((order, index) => (
            <div key={order._id || index} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Order #{order.orderNumber}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {order.merchant?.name || 'Merchant'}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    statusColors[order.status] || statusColors.pending
                  }`}
                >
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Items:</h3>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>
                        {item.productName} × {item.quantity}
                      </span>
                      <span>₹{item.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              {order.deliveryAddress && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Delivery Address:
                  </h3>
                  <p className="text-sm text-gray-700">
                    {order.deliveryAddress.street && (
                      <span className="block">{order.deliveryAddress.street}</span>
                    )}
                    <span className="block">
                      {[
                        order.deliveryAddress.city,
                        order.deliveryAddress.state,
                        order.deliveryAddress.pincode,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </p>
                </div>
              )}

              {/* Order Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Delivery Fee</span>
                  <span>₹{order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-blue-600">₹{order.total.toFixed(2)}</span>
                </div>
              </div>

              {order.estimatedDeliveryTime && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Estimated Delivery:</span>{' '}
                    {order.estimatedDeliveryTime}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/orders" className="flex-1">
              <Button variant="primary" size="lg" className="w-full">
                View All Orders
              </Button>
            </Link>
            <Link to="/merchants" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

