import React from 'react';
import MerchantCard from '../MerchantCard/MerchantCard';

const MerchantList = ({ merchants, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading merchants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (merchants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-2">No merchants found</p>
        <p className="text-sm text-gray-500">
          Try adjusting your filters or check back later
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {merchants.map((merchant) => (
        <MerchantCard key={merchant._id} merchant={merchant} />
      ))}
    </div>
  );
};

export default MerchantList;

