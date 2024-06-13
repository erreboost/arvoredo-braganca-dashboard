import React from "react";
import EsriMap from "../EsriMap";
import { VisibleExtentProvider } from "../../utils/VisibleExtentContext";
// import dotenv from "dotenv";
// dotenv.config();

const DashboardCard03: React.FC = () => {
  // const { chartData } = props;

  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  return (
    <VisibleExtentProvider>
      {" "}
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative">
        <div className="px-2 pt-0">
          <header className="flex justify-between items-start mb-2"></header>
        </div>

        <EsriMap apiKey={apiKey} />
      </div>
    </VisibleExtentProvider>
  );
};

export default DashboardCard03;
