import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/config";

const DashboardCard05 = () => {
  const [treeCount, setTreeCount] = useState<number | null>(null); // Corrected state initialization

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        const count = data.trees.length;
        setTreeCount(count);
      } catch (error) {
        console.error("Error fetching tree data", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();

    // Set up interval to fetch data every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[20vh] items-center justify-center">
      <div className="px-5 pt-5 text-center">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Árvores Públicas
        </h2>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-2">
          {treeCount != null ? treeCount : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard05;
