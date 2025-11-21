import React from 'react';
import LocationMap from '../LocationMap/LocationMap';

const LocationView = ({ address, height = '300px' }) => {
  if (!address || !address.coordinates) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center" style={{ height }}>
        <p className="text-gray-600">No location set</p>
      </div>
    );
  }

  const { latitude, longitude } = address.coordinates;
  
  // Check if coordinates are valid numbers
  if (typeof latitude !== 'number' || typeof longitude !== 'number' || isNaN(latitude) || isNaN(longitude)) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center" style={{ height }}>
        <p className="text-gray-600">Invalid location coordinates</p>
      </div>
    );
  }

  const position = [latitude, longitude];

  return (
    <div>
      <LocationMap
        center={position}
        zoom={15}
        initialPosition={position}
        height={height}
      />
      <div className="mt-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">📍 Location: </span>
          {address.street && `${address.street}, `}
          {address.city}
          {address.state && `, ${address.state}`}
          {address.pincode && ` - ${address.pincode}`}
        </p>
        {address.phone && (
          <p className="mt-1">
            <span className="font-medium">📱 Phone: </span>
            {address.phone}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </p>
      </div>
    </div>
  );
};

export default LocationView;

