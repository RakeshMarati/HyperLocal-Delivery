import React from 'react';
import Header from '../Header/Header';
import NavigationLoader from '../NavigationLoader/NavigationLoader';

const Layout = ({ children }) => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(to right, #e8eaf6 0%, #c5cae9 15%, #9fa8da 30%, #7986cb 45%, #5c6bc0 60%, #3f51b5 75%, #303f9f 90%, #1a237e 100%)',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Navigation Loader */}
      <NavigationLoader />
      
      {/* Overlay for better content readability */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        }}
      ></div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;

