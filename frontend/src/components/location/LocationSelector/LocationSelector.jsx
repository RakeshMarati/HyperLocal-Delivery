import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAddress } from '../../../store/thunks/locationThunks';
import { clearError } from '../../../store/slices/locationSlice';
import LocationPicker from '../LocationPicker/LocationPicker';

const LocationSelector = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.auth);

  const handleLocationConfirm = async (locationData) => {
    dispatch(clearError());
    const result = await dispatch(updateUserAddress(locationData));
    if (result.success && onSuccess) {
      onSuccess(result.address);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Set Your Delivery Location
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <LocationPicker
          onLocationConfirm={handleLocationConfirm}
          initialLocation={user?.address}
        />

        {isLoading && (
          <div className="mt-4 text-center text-gray-600">
            Saving location...
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
