import React, { useState, useEffect } from "react";

const DashboardCard02A: React.FC = () => {
  const [numWithoutSymptoms, setNumWithoutSymptoms] = useState<number>(0);
  const [numWithSymptoms, setNumWithSymptoms] = useState<number>(0);

  const fetchData = () => {
    // Fetch CSV data
    fetch("/arvores_0.csv")
      .then((response) => response.text())
      .then((data) => {
        // Split CSV data into rows
        const rows = data.split("\n");

        // console.log("CSV Rows:", rows);

        // Initialize counters
        let countWithoutSymptoms = 0;
        let countWithSymptoms = 0;

        // Loop through rows starting from index 1 (skip header row)
        for (let i = 1; i < rows.length; i++) {
          const columns = rows[i].split(",");

          // Check if it's not the header row and the value is from column X
          if (i > 1 && columns.length > 23) {
            const valueX = columns[24]?.trim();

            // console.log("Column X:", valueX);

            if (valueX === "Sem sintomas ou sinais.") {
              countWithoutSymptoms++;
            } else {
              countWithSymptoms++;
            }
          }
        }

        // console.log(
        //   "CountWithoutSymptoms:",
        //   countWithoutSymptoms,
        //   "CountWithSymptoms:",
        //   countWithSymptoms
        // );

        // Set state based on the counts
        setNumWithoutSymptoms(countWithoutSymptoms);
        setNumWithSymptoms(countWithSymptoms);
      })
      .catch((error) => console.error("Error fetching CSV data", error));
  };

  useEffect(() => {
    // Fetch data when the component is mounted
    fetchData();

    // Set up interval to fetch data every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Clean up interval when the component is unmounted
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
