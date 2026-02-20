import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '../contexts/ThemeContext';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapClickHandler = ({ onLocationSelect }) => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelect(`Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`, { lat, lng });
      },
    });
    return null;
  };

  const LocationMap = ({ onLocationSelect, initialLocation }) => {
    const { isDark } = useTheme();
    const [marker, setMarker] = useState(initialLocation || null);
    const [searchQuery, setSearchQuery] = useState('');

    // Major Indian railway stations with coordinates
    const majorStations = [
      { name: "New Delhi Railway Station", lat: 28.6139, lng: 77.2090, zone: "Northern" },
      { name: "Mumbai Central", lat: 18.9670, lng: 72.8258, zone: "Western" },
      { name: "Howrah Junction", lat: 22.5768, lng: 88.3438, zone: "Eastern" },
      { name: "Chennai Central", lat: 13.0827, lng: 80.2707, zone: "Southern" },
      { name: "Bangalore City", lat: 12.9784, lng: 77.5766, zone: "South Western" },
      { name: "Secunderabad Junction", lat: 17.4447, lng: 78.4767, zone: "South Central" },
      { name: "Ahmedabad Junction", lat: 23.0300, lng: 72.5800, zone: "Western" },
      { name: "Pune Junction", lat: 18.5292, lng: 73.8565, zone: "Central" },
      { name: "Jaipur Junction", lat: 26.9196, lng: 75.7878, zone: "North Western" },
      { name: "Lucknow Charbagh", lat: 26.8467, lng: 80.9462, zone: "Northern" },
      { name: "Kolkata Sealdah", lat: 22.5726, lng: 88.3639, zone: "Eastern" },
      { name: "Hyderabad Deccan", lat: 17.3840, lng: 78.4564, zone: "South Central" },
    ];

  const handleStationSelect = (station) => {
    const { lat, lng, name, zone } = station;
    setMarker({ lat, lng });
    onLocationSelect(name, { lat, lng, zone });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    const found = majorStations.find(station => 
      station.name.toLowerCase().includes(query)
    );
    
    if (found) {
      handleStationSelect(found);
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'} border`}>
      {/* Search Bar */}
      <div className={`p-3 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search railway stations..."
            className={`flex-1 px-3 py-2 rounded text-sm ${isDark ? 'bg-gray-900 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Quick Station Buttons */}
      <div className={`p-3 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="text-xs font-medium mb-2 text-gray-500">Major Stations:</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {majorStations.slice(0, 6).map((station) => (
            <button
              key={station.name}
              onClick={() => handleStationSelect(station)}
              className={`text-xs px-2 py-1.5 rounded border transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              🏢 {station.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ height: '300px', width: '100%' }}>
        <MapContainer
          center={marker || [20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={isDark 
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler onLocationSelect={onLocationSelect} />
          {marker && (
            <Marker position={[marker.lat, marker.lng]}>
              <Popup>
                <div className="text-sm">
                  <strong>Selected Location</strong><br />
                  Lat: {marker.lat.toFixed(4)}<br />
                  Lng: {marker.lng.toFixed(4)}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Instructions */}
      <div className={`p-3 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        💡 <strong>How to use:</strong> Click anywhere on the map, search for a station, or select a major station above.
      </div>
    </div>
  );
};

export default LocationMap;
