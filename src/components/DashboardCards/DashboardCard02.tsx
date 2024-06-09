import React, { useState, useEffect } from "react";
import DashboardCard02A from "./DashboardCard02A";
import DashboardCard02B from "./DashboardCard02B";

const DashboardCard02 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch CSV data (adjust URL accordingly)
        const response = await fetch("/arvores_0.csv");
        const data = await response.text();

        // Assuming CSV data is ready (replace with your own condition)
        const isDataReady = data && data.length > 0;

        if (isDataReady) {
          // Simulate additional processing (e.g., parsing CSV, etc.)
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Mark loading as complete
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching CSV data", error);
        // Handle error by marking loading as complete
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative overflow-hidden">
      <div className="flex h-full">
        <div className="flex-1 px-5 pt-5 overflow-auto">
          {loading ? <LoadingSpinner /> : <DashboardCard02A />}
        </div>
        {/* Vertical line to separate the two components */}
        <div className="border-l border-slate-300 mx-2" />
        <div className="flex-1 px-5 pt-5 overflow-auto">
          {loading ? <LoadingSpinner /> : <DashboardCard02B />}
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
