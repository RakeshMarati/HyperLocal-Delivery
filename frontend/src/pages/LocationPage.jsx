import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSelector from '../components/location/LocationSelector/LocationSelector';

const LocationPage = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = (address) => {
    setSuccessMessage('Location saved successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}
        <LocationSelector onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default LocationPage;

