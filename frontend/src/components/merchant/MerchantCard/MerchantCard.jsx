import React from 'react';
import { Link } from 'react-router-dom';

const MerchantCard = ({ merchant }) => {
  const categoryColors = {
    food: 'bg-orange-100 text-orange-800',
    grocery: 'bg-green-100 text-green-800',
    pharmacy: 'bg-red-100 text-red-800',
    others: 'bg-gray-100 text-gray-800',
  };

  const categoryLabels = {
    food: 'Food',
    grocery: 'Grocery',
    pharmacy: 'Pharmacy',
    others: 'Others',
  };

  return (
    <Link
      to={`/merchants/${merchant._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {merchant.image ? (
          <img
            src={merchant.image}
            alt={merchant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-4xl">🏪</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
            {merchant.name}
          </h3>
          <span
            className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
              categoryColors[merchant.category] || categoryColors.others
            }`}
          >
            {categoryLabels[merchant.category] || 'Others'}
          </span>
        </div>

        {merchant.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {merchant.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            {merchant.rating > 0 && (
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="font-medium">{merchant.rating.toFixed(1)}</span>
              </div>
            )}
            <span>{merchant.deliveryTime || '30-45 mins'}</span>
          </div>
        </div>

        {merchant.address?.city && (
          <p className="text-xs text-gray-500 mt-2">
            📍 {merchant.address.city}
            {merchant.address.state && `, ${merchant.address.state}`}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MerchantCard;

