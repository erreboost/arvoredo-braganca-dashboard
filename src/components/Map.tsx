import EsriMap from './EsriMap';
import React from 'react';

const Map = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  const handleZoomChange = (zoom: number) => {
    // setZoomLevel(zoom);
    updateDashboardsWithZoom(zoom);
  };

  const updateDashboardsWithZoom = (zoom: number) => {
    console.log('Zoom level changed:', zoom);
  };

  return (
    <div className="max-h-[668px] h-[668px]">
      <EsriMap apiKey={apiKey} onZoomChange={handleZoomChange} />
    </div>
  );
};

export default Map;
