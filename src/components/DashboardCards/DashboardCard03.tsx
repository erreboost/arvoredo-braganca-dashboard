//@ts-nocheck
import React from 'react';
import {VisibleExtentProvider} from '../../utils/VisibleExtentContext';
import EsriMap from '../EsriMap';

const DashboardCard03: React.FC = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  const handleZoomChange = (zoom: number) => {
    // console.log('Zoom level changed:', zoom);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative">
      <VisibleExtentProvider>
        {/* Pass onZoomChange callback to EsriMap */}
        <EsriMap apiKey={apiKey} onZoomChange={handleZoomChange} />
      </VisibleExtentProvider>
    </div>
  );
};

export default DashboardCard03;
