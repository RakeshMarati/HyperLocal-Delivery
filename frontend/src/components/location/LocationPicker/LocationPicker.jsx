import React, { useState } from 'react';
import LocationMap from '../LocationMap/LocationMap';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const LocationPicker = ({ onLocationConfirm, initialLocation = null }) => {
  const [coordinates, setCoordinates] = useState({
    latitude: initialLocation?.coordinates?.latitude || null,
    longitude: initialLocation?.coordinates?.longitude || null,
  });
  const [address, setAddress] = useState({
    street: initialLocation?.street || '',
    city: initialLocation?.city || '',
    state: initialLocation?.state || '',
    pincode: initialLocation?.pincode || '',
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState('');

  // Get current location using browser geolocation
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        setIsGettingLocation(false);
        // Optionally reverse geocode to get address
        reverseGeocode(latitude, longitude);
      },
      (err) => {
        setError('Unable to retrieve your location. Please select on map manually.');
        setIsGettingLocation(false);
        console.error('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Reverse geocode coordinates to address (using Nominatim - OpenStreetMap)
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'User-Agent': 'HyperLocal-Delivery-App', // Required by Nominatim
          },
        }
      );
      const data = await response.json();

      if (data.address) {
        setAddress({
          street: data.address.road || data.address.house_number || '',
          city: data.address.city || data.address.town || data.address.village || '',
          state: data.address.state || '',
          pincode: data.address.postcode || '',
        });
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      // Don't show error to user, they can fill manually
    }
  };

  const handleMapClick = (location) => {
    setCoordinates(location);
    reverseGeocode(location.latitude, location.longitude);
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    if (!coordinates.latitude || !coordinates.longitude) {
      setError('Please select a location on the map or use "Get Current Location"');
      return;
    }

    if (!address.city || !address.state || !address.pincode) {
      setError('Please fill in city, state, and pincode');
      return;
    }

    onLocationConfirm({
      ...address,
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    });
  };

  const mapCenter = coordinates.latitude && coordinates.longitude
    ? [coordinates.latitude, coordinates.longitude]
    : [15.8281, 78.0373]; // Default: Kurnool

  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Select Location on Map</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            {isGettingLocation ? 'Getting Location...' : '📍 Get Current Location'}
          </Button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Click on the map to set your delivery location, or use "Get Current Location" to use your GPS.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Map */}
      <div className="mb-4">
        <LocationMap
          center={mapCenter}
          zoom={13}
          onLocationSelect={handleMapClick}
          initialPosition={mapCenter}
          height="400px"
        />
      </div>

      {/* Coordinates Display */}
      {coordinates.latitude && coordinates.longitude && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Selected Location: </span>
            {coordinates.latitude.toFixed(6)}, {coordinates.longitude.toFixed(6)}
          </p>
        </div>
      )}

      {/* Address Form */}
      <div className="space-y-4">
        <Input
          label="Street Address"
          type="text"
          name="street"
          value={address.street}
          onChange={handleAddressChange}
          placeholder="Enter street address"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            placeholder="Enter city"
            required
          />

          <Input
            label="State"
            type="text"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            placeholder="Enter state"
            required
          />
        </div>

        <Input
          label="Pincode"
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={handleAddressChange}
          placeholder="Enter pincode"
          required
        />
      </div>

      <div className="mt-6">
        <Button
          variant="primary"
          size="lg"
          onClick={handleConfirm}
          className="w-full"
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;

