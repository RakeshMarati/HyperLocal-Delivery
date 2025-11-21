import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map click events
function LocationMarker({ position, onLocationSelect }) {
  const [markerPosition, setMarkerPosition] = useState(position);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      onLocationSelect && onLocationSelect({ latitude: lat, longitude: lng });
    },
  });

  useEffect(() => {
    if (position) {
      setMarkerPosition(position);
    }
  }, [position]);

  return markerPosition ? <Marker position={markerPosition} /> : null;
}

const LocationMap = ({
  center = [15.8281, 78.0373], // Default: Kurnool coordinates
  zoom = 13,
  onLocationSelect,
  initialPosition = null,
  height = '400px',
}) => {
  const [mapCenter, setMapCenter] = useState(center);
  const [mapPosition, setMapPosition] = useState(initialPosition || center);

  useEffect(() => {
    if (initialPosition) {
      setMapPosition(initialPosition);
      setMapCenter(initialPosition);
    }
  }, [initialPosition]);

  const handleLocationSelect = (location) => {
    setMapPosition([location.latitude, location.longitude]);
    onLocationSelect && onLocationSelect(location);
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden border border-gray-300">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={mapPosition}
          onLocationSelect={handleLocationSelect}
        />
      </MapContainer>
    </div>
  );
};

export default LocationMap;

