import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HyperLocal Delivery
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your local delivery platform for Kurnool
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <p className="text-gray-700">
              Welcome! This is the MVP homepage. More features coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

