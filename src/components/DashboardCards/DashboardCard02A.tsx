import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/config";

const DashboardCard02A: React.FC = () => {
  const [numWithSymptoms, setNumWithSymptoms] = useState<number>(0);
  const [numWithoutSymptoms, setNumWithoutSymptoms] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        // Initialize counters
        let countWithSymptoms = 0;
        let countWithoutSymptoms = 0;

        // Loop through the trees
        data.trees.forEach((tree) => {
          if (tree.Estado_fit.includes("sintomas ou sinais")) {
            countWithSymptoms++;
          } else {
            countWithoutSymptoms++;
          }
        });

        // Update state with the counts
        setNumWithSymptoms(countWithSymptoms);
        setNumWithoutSymptoms(countWithoutSymptoms);
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
    <div className="flex-grow overflow-y-auto py-2 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Árvores com sintomas ou sinais
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-24 mt-12">
          {numWithSymptoms}
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Árvores sem sintomas ou sinais
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-12 mt-12">
          {numWithoutSymptoms}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard02A;
