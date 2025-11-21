import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { clearCart, selectCartItemsCount } from '../../../store/slices/cartSlice';
import Button from '../Button/Button';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector(selectCartItemsCount);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); // Clear cart on logout
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://ik.imagekit.io/aazn022r8/Logo-Image%20(1).png"
              alt="HyperLocal Delivery Logo"
              className="h-12 w-auto object-contain"
            />
            <h1 className="text-2xl font-bold text-blue-600">
              HyperLocal Delivery
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Link to="/merchants" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                  Merchants
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                  Orders
                </Link>
                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                  <span className="text-2xl">🛒</span>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </span>
                  )}
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                  Profile
                </Link>
                <span className="text-gray-700 text-sm">
                  Welcome, <span className="font-semibold">{user?.name}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

