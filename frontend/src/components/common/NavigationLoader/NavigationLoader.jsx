import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prevPath, setPrevPath] = useState('');
  const location = useLocation();
  const timeoutRef = useRef(null);
  const maxTimeoutRef = useRef(null);
  
  // Get loading states from Redux
  const merchantsLoading = useSelector((state) => state.merchants.isLoading);
  const productsLoading = useSelector((state) => state.products.isLoading);
  const ordersLoading = useSelector((state) => state.orders.isLoading);
  const authLoading = useSelector((state) => state.auth.isLoading);

  // Determine which loading states are relevant for current route
  const getRelevantLoading = (pathname) => {
    if (pathname.startsWith('/merchants')) {
      return merchantsLoading || productsLoading;
    } else if (pathname.startsWith('/orders')) {
      return ordersLoading;
    } else if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
      return authLoading;
    }
    return false;
  };

  useEffect(() => {
    // Show loading when route changes
    if (location.pathname !== prevPath) {
      setIsLoading(true);
      setPrevPath(location.pathname);
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
      
      // Maximum display time: 2 seconds (safety net)
      maxTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      
      // Check if there's relevant loading
      const relevantLoading = getRelevantLoading(location.pathname);
      
      if (!relevantLoading) {
        // No loading needed - hide quickly (300ms for smooth transition)
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }
  }, [location.pathname, prevPath]);

  // Watch for loading state changes to hide loader when done
  useEffect(() => {
    if (isLoading) {
      const relevantLoading = getRelevantLoading(location.pathname);
      
      if (!relevantLoading) {
        // Loading completed - hide after short delay
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    }
  }, [isLoading, location.pathname, merchantsLoading, productsLoading, ordersLoading, authLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
    };
  }, []);

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

