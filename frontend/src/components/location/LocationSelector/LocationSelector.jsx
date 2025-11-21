import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAddress } from '../../../store/thunks/locationThunks';
import { clearError } from '../../../store/slices/locationSlice';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const LocationSelector = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    latitude: '',
    longitude: '',
  });

  // Load existing address if available
  useEffect(() => {
    if (user?.address) {
      setFormData({
        street: user.address.street || '',
        city: user.address.city || '',
        state: user.address.state || '',
        pincode: user.address.pincode || '',
        latitude: user.address.coordinates?.latitude || '',
        longitude: user.address.coordinates?.longitude || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserAddress(formData));
    if (result.success && onSuccess) {
      onSuccess(result.address);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Set Your Delivery Location
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Input
          label="Street Address"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Enter street address"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />

          <Input
            label="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            required
          />
        </div>

        <Input
          label="Pincode"
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Enter pincode"
          required
        />

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Coordinates (Optional - for GPS location later)
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="e.g., 15.8281"
              step="any"
            />
            <Input
              label="Longitude"
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="e.g., 78.0373"
              step="any"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Saving...' : 'Save Location'}
        </Button>
      </div>
    </form>
  );
};

export default LocationSelector;

