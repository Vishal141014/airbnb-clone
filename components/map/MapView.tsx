'use client';

import { useState, useRef, useEffect } from 'react';
import Map, { Marker, Popup, MapRef, Source, Layer } from 'react-map-gl/mapbox';
import { FaDollarSign } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mock data for property locations
const PROPERTY_DATA = [
  { id: '1', lat: 34.0259, lng: -118.7798, price: 450, title: 'Luxury Villa with Oceanfront Views', location: 'Malibu, California' },
  { id: '2', lat: 45.5051, lng: -122.6750, price: 215, title: 'Modern Treehouse Retreat', location: 'Portland, Oregon' },
  { id: '3', lat: 40.7128, lng: -74.0060, price: 325, title: 'Stylish Downtown Loft', location: 'New York, New York' },
  { id: '4', lat: 39.1911, lng: -106.8175, price: 275, title: 'Secluded Cabin with Hot Tub', location: 'Aspen, Colorado' },
  { id: '5', lat: 34.0195, lng: -118.4912, price: 395, title: 'Beachfront Cottage', location: 'Santa Monica, California' },
  { id: '6', lat: 33.8303, lng: -116.5453, price: 320, title: 'Desert Oasis with Pool', location: 'Palm Springs, California' },
  { id: '7', lat: 42.3601, lng: -71.0589, price: 285, title: 'Historic Brownstone', location: 'Boston, Massachusetts' },
  { id: '8', lat: 39.0968, lng: -120.0324, price: 340, title: 'Lakefront Cabin with Dock', location: 'Lake Tahoe, California' },
  { id: '9', lat: 29.9511, lng: -90.0715, price: 195, title: 'Charming French Quarter Apartment', location: 'New Orleans, Louisiana' },
  { id: '10', lat: 36.1627, lng: -86.7816, price: 225, title: 'Modern Farmhouse Retreat', location: 'Nashville, Tennessee' },
  { id: '11', lat: 39.4817, lng: -106.0384, price: 375, title: 'Mountain View Chalet', location: 'Breckenridge, Colorado' },
  { id: '12', lat: 32.7765, lng: -79.9311, price: 165, title: 'Cozy Studio in Historic District', location: 'Charleston, South Carolina' },
];

// Generate GeoJSON for heatmap
const generateHeatmapData = () => {
  return {
    type: 'FeatureCollection',
    features: PROPERTY_DATA.map((prop) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [prop.lng, prop.lat],
      },
      properties: {
        price: prop.price,
      },
    })),
  };
};

// Price heatmap layer style
const heatmapLayer = {
  id: 'price-heatmap',
  type: 'heatmap',
  paint: {
    'heatmap-weight': [
      'interpolate', ['linear'], ['get', 'price'],
      150, 0.1,
      200, 0.3,
      300, 0.5,
      400, 0.7,
      500, 1
    ],
    'heatmap-intensity': 1,
    'heatmap-color': [
      'interpolate', ['linear'], ['heatmap-density'],
      0, 'rgba(0, 166, 153, 0)',
      0.2, 'rgba(0, 166, 153, 0.2)',
      0.4, 'rgba(0, 166, 153, 0.4)',
      0.6, 'rgba(255, 56, 92, 0.6)',
      0.8, 'rgba(255, 56, 92, 0.8)',
      1, 'rgba(255, 56, 92, 1)'
    ],
    'heatmap-radius': 40,
    'heatmap-opacity': 0.7,
  },
};

interface MapViewProps {
  onSelectProperty?: (id: string) => void;
  selectedPropertyId?: string;
  showHeatmap?: boolean;
}

const MapView = ({
  onSelectProperty,
  selectedPropertyId,
  showHeatmap = true,
}: MapViewProps) => {
  const [popupInfo, setPopupInfo] = useState<typeof PROPERTY_DATA[0] | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 3,
  });
  const mapRef = useRef<MapRef>(null);

  // When selected property changes, fly to it
  useEffect(() => {
    if (selectedPropertyId && mapRef.current) {
      const selectedProperty = PROPERTY_DATA.find(p => p.id === selectedPropertyId);
      if (selectedProperty) {
        mapRef.current.flyTo({
          center: [selectedProperty.lng, selectedProperty.lat],
          zoom: 12,
          duration: 2000,
        });
        setPopupInfo(selectedProperty);
      }
    }
  }, [selectedPropertyId]);

  return (
    <div className="h-full w-full">
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoibWFwYm94LWdsby1zdHVkaW8iLCJhIjoiY2xvcHd5Z3kyMDdobzJqcnl4dGxlZ2p5MCJ9.cAmVmjDN9ep5v_iqhQhaFg"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: '100%', height: '100%' }}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
      >
        {/* Render price heatmap overlay */}
        {showHeatmap && (
          <Source type="geojson" data={generateHeatmapData() as any}>
            <Layer {...heatmapLayer as any} />
          </Source>
        )}

        {/* Render property markers */}
        {PROPERTY_DATA.map((property) => (
          <Marker
            key={property.id}
            longitude={property.lng}
            latitude={property.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(property);
              if (onSelectProperty) {
                onSelectProperty(property.id);
              }
            }}
          >
            <div 
              className={`
                flex items-center justify-center rounded-full px-2 py-1 font-semibold text-white cursor-pointer transition-transform hover:scale-110
                ${selectedPropertyId === property.id 
                  ? 'bg-airbnb-dark-gray scale-110' 
                  : 'bg-airbnb-pink'
                }
              `}
            >
              <FaDollarSign className="text-xs" />
              <span className="text-sm">{property.price}</span>
            </div>
          </Marker>
        ))}

        {/* Property popup */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            className="z-10"
          >
            <div className="p-2 max-w-[200px]">
              <h3 className="font-semibold text-sm">{popupInfo.title}</h3>
              <p className="text-xs text-airbnb-light-gray">{popupInfo.location}</p>
              <p className="text-sm font-medium mt-1">
                ${popupInfo.price} <span className="text-airbnb-light-gray font-normal">night</span>
              </p>
            </div>
          </Popup>
        )}

        {/* Map Controls */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            onClick={() => mapRef.current?.zoomIn()}
          >
            +
          </button>
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            onClick={() => mapRef.current?.zoomOut()}
          >
            -
          </button>
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-xs"
            onClick={() => {
              setViewState({
                latitude: 39.8283,
                longitude: -98.5795,
                zoom: 3,
              });
            }}
          >
            Reset
          </button>
        </div>

        {/* Heatmap Toggle */}
        <div className="absolute bottom-2 left-2">
          <button 
            className={`px-3 py-2 rounded-full shadow-md text-sm font-medium ${
              showHeatmap 
                ? 'bg-airbnb-pink text-white' 
                : 'bg-white text-airbnb-dark-gray'
            }`}
            onClick={() => {
              // This would normally be handled by a parent component
              // but for simplicity we're just showing what button would look like
            }}
          >
            {showHeatmap ? 'Hide Price Heatmap' : 'Show Price Heatmap'}
          </button>
        </div>
      </Map>
    </div>
  );
};

export default MapView; 