import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when center changes
function MapViewUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);

  return null;
}

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
  center = [14.4758, 78.8242], // Default: Kadapa coordinates
  zoom = 13,
  onLocationSelect,
  initialPosition = null,
  height = '400px',
}) => {
  // Prioritize initialPosition over center prop
  const initialCenter = initialPosition || center;
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [mapPosition, setMapPosition] = useState(initialCenter);

  useEffect(() => {
    if (initialPosition) {
      setMapPosition(initialPosition);
      setMapCenter(initialPosition);
    } else if (center) {
      // If no initialPosition but center is provided, use it
      setMapCenter(center);
      setMapPosition(center);
    }
  }, [initialPosition, center]);

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
        key={JSON.stringify(mapCenter)} // Force re-render when center changes
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewUpdater center={mapCenter} zoom={zoom} />
        <LocationMarker
          position={mapPosition}
          onLocationSelect={handleLocationSelect}
        />
      </MapContainer>
    </div>
  );
};

export default LocationMap;

