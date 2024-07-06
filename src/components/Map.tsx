import EsriMap from './EsriMap';
import React, {useState} from 'react';
// import dotenv from "dotenv";
// dotenv.config();
const App = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(12);

  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  const handleZoomChange = (zoom: number) => {
    // Update other dashboards or components based on the zoom level
    setZoomLevel(zoom);
    // Example: Call a function to update other dashboards
    updateDashboardsWithZoom(zoom);
  };

  const updateDashboardsWithZoom = (zoom: number) => {
    // Implement logic to update other dashboards or components
    console.log('Zoom level changed:', zoom);
  };

  return (
    <div>
      <EsriMap apiKey={apiKey} onZoomChange={handleZoomChange} />
      {/* Render other components or dashboards here */}
    </div>
  );
};

export default App;
