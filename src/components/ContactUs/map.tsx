import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MdLocationOn } from "react-icons/md";

const createCustomIcon = () => {
  return L.divIcon({
    html: `<div class="custom-marker">
      <svg viewBox="0 0 24 24" fill="#000" width="32" height="32">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
      </svg>
    </div>`,
    className: "custom-marker-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const Map = () => {
  const position: [number, number] = [-1.9633374, 30.0778182];

  // Custom style that matches Google Maps
  const mapStyle = {
    url: "https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY",
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
  };

  return (
    <div className='w-full h-96 overflow-hidden'>
      <MapContainer
        center={position}
        zoom={17}
        className='w-full h-full'
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          className='google-maps-style'
        />
        <Marker position={position} icon={createCustomIcon()}>
          <Popup className='custom-popup'>
            <div className='font-medium text-gray-900'>
              Cryprto-charter Interior Architecture Studio
            </div>
            <div className='text-sm text-gray-600'>KN 3 Rd, Kigali, Rwanda</div>
          </Popup>
        </Marker>
      </MapContainer>

      <style jsx global>{`
        .custom-marker-icon {
          background: transparent;
          border: none;
        }

        .custom-marker {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          padding: 8px;
          box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
        }

        .leaflet-popup-tip-container {
          width: 20px;
          height: 10px;
        }

        .leaflet-popup-content {
          margin: 8px 10px;
          line-height: 1.4;
        }

        /* Google Maps style customization */
        .google-maps-style {
          filter: saturate(0.1) brightness(105%) contrast(95%);
        }

        .leaflet-container {
          background-color: #fff;
          font-family: "Roboto", Arial, sans-serif;
        }

        /* Road labels */
        .leaflet-tile-loaded {
          font-size: 13px;
          color: #5f6368;
        }

        /* Hide default attributions for cleaner look */
        .leaflet-control-attribution {
          opacity: 0.7;
          font-size: 10px;
        }

        /* Custom styling for road lines */
        .leaflet-tile-loaded path {
          stroke-width: 1px;
          stroke: #e6e6e6;
        }
      `}</style>
    </div>
  );
};

export default Map;
