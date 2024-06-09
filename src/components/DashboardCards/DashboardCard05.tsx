import React, { useState, useEffect } from "react";
import { hexToRGB, tailwindConfig } from "../../utils/Utils";

const DashboardCard05 = () => {
  const [treeCount, setTreeCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch CSV data (adjust URL accordingly)
    fetch("/arvores_0.csv")
      .then((response) => response.text())
      .then((data) => {
        // Assuming CSV data is in the A column (change accordingly)
        const rows = data.split("\n");
        // Subtracting 1 to exclude the header row
        const count = rows.length - 1;
        setTreeCount(count);
      })
      .catch((error) => console.error("Error fetching CSV data", error));
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
