import React from 'react';
import EsriMap from '../EsriMap';

const DashboardCard03: React.FC = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative">
      <div className="px-2 pt-0">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Map View
          </h2>
        </header>
      </div>
      <EsriMap apiKey={apiKey} />
    </div>
  );
};

export default DashboardCard03;
