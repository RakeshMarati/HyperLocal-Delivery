import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/thunks/authThunks';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

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
                <p className="text-gray-700 text-sm mb-4">
                  You're all set! More features coming soon:
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-4">
                  <li>• Set your delivery location</li>
                  <li>• Browse nearby merchants</li>
                  <li>• Add items to cart</li>
                  <li>• Place orders</li>
                </ul>
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

