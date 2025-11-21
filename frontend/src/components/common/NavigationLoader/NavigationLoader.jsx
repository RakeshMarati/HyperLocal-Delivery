import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prevPath, setPrevPath] = useState('');
  const location = useLocation();
  
  // Get loading states from Redux
  const merchantsLoading = useSelector((state) => state.merchants.isLoading);
  const productsLoading = useSelector((state) => state.products.isLoading);
  const ordersLoading = useSelector((state) => state.orders.isLoading);
  const authLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    // Show loading when route changes
    if (location.pathname !== prevPath) {
      setIsLoading(true);
      setPrevPath(location.pathname);
    }
  }, [location.pathname, prevPath]);

  useEffect(() => {
    // Hide loading when all data has finished loading and page has rendered
    if (!merchantsLoading && !productsLoading && !ordersLoading && !authLoading) {
      // Small delay to ensure page has rendered
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [merchantsLoading, productsLoading, ordersLoading, authLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <p className="text-gray-700 text-base font-medium">Loading page...</p>
      </div>
    </div>
  );
};

export default NavigationLoader;

