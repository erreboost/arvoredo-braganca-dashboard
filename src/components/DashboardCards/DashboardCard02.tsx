import React, { useContext } from "react";
import DashboardCard02A from "./DashboardCard02A";
import DashboardCard02B from "./DashboardCard02B";
import { DataContext } from "../../config/DataContext";

const DashboardCard02 = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative overflow-hidden">
      <div className="flex h-full">
        <div className="flex-1 px-5 pt-5 overflow-auto">
          <DashboardCard02A data={data} />
        </div>
        {/* Vertical line to separate the two components */}
        <div className="border-l border-slate-300 mx-2" />
        <div className="flex-1 px-5 pt-5 overflow-auto">
          <DashboardCard02B data={data} />
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-800"></div>
    </div>
  );
};

export default DashboardCard02;
