// DashboardCard03.tsx
import React from "react";
import EsriMap from "../EsriMap";
import { VisibleExtentProvider } from "../../utils/VisibleExtentContext";

const DashboardCard03: React.FC<DashboardCard03Props> = (props) => {
  const { chartData } = props;

  return (
    <VisibleExtentProvider>
      {" "}
      {/* Make sure you wrap your component with VisibleExtentProvider */}
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative">
        <div className="px-2 pt-0">
          <header className="flex justify-between items-start mb-2"></header>
        </div>

        <EsriMap />
      </div>
    </VisibleExtentProvider>
  );
};

export default DashboardCard03;
