import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/thunks/authThunks';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.location);

  useEffect(() => {
    // If user has token but no user data, fetch current user
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [token, user, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to HyperLocal Delivery
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your local delivery platform for Kurnool
          </p>

          {isAuthenticated && user ? (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Hello, {user.name}!
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                {user.phone && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Phone:</span> {user.phone}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Role:</span>{' '}
                  <span className="capitalize">{user.role}</span>
                </p>
              </div>
              <div className="border-t pt-4">
                {/* Location Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      Delivery Location
                    </p>
                    <Link to="/location">
                      <Button variant="outline" size="sm">
                        {address ? 'Update' : 'Set'} Location
                      </Button>
                    </Link>
                  </div>
                  {address ? (
                    <div className="bg-gray-50 rounded-lg p-3 text-left">
                      <p className="text-sm text-gray-700">
                        {address.street && (
                          <span className="block">{address.street}</span>
                        )}
                        <span className="block">
                          {[address.city, address.state, address.pincode]
                            .filter(Boolean)
                            .join(', ')}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No location set. Set your location to browse nearby
                      merchants.
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  {address ? (
                    <div className="mb-4">
                      <Link to="/merchants">
                        <Button variant="primary" size="md" className="w-full">
                          Browse Nearby Merchants
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm mb-4 text-center">
                      Set your location to browse nearby merchants
                    </p>
                  )}
                  <p className="text-gray-700 text-sm mb-4">
                    More features coming soon:
                  </p>
                  <ul className="text-left text-sm text-gray-600 space-y-2">
                    <li>• Add items to cart</li>
                    <li>• Place orders</li>
                    <li>• Track orders in real-time</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <p className="text-gray-700 mb-6">
                Get started by creating an account or logging in to access all
                features.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/login">
                  <Button variant="outline" size="md">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

