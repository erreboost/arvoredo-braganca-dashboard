import React, { useState, useEffect } from "react";

const DashboardCard02B: React.FC = () => {
  const [caldBomEstado, setCaldBomEstado] = useState<number>(0);
  const [caldInsuf, setCaldInsuf] = useState<number>(0);
  const [caldInexistente, setCaldInexistente] = useState<number>(0);

  const fetchData = () => {
    // Fetch CSV data
    fetch("/arvores_0.csv")
      .then((response) => response.text())
      .then((data) => {
        // Split CSV data into rows
        const rows = data.split("\n");

        // console.log("CSV Rows:", rows);

        // Initialize counters
        let countBomEstado = 0;
        let countInsuf = 0;
        let countInexistente = 0;

        // Loop through rows starting from index 1 (skip header row)
        for (let i = 1; i < rows.length; i++) {
          const columns = rows[i].split(",");

          // Check if it's not the header row and the value is from column K
          if (i > 1 && columns.length > 10) {
            const valueK = columns[11]?.trim();

            // console.log("Current Row:", columns, "Value K:", valueK);

            if (valueK === "Caldeira suficiente e em bom estado.") {
              countBomEstado++;
            } else if (valueK === "Caldeira insuficiente.") {
              countInsuf++;
            } else {
              countInexistente++;
            }
          }
        }

        // console.log(
        //   "CaldBomEstado:",
        //   countBomEstado,
        //   "CaldInsuf:",
        //   countInsuf,
        //   "CaldInexistente:",
        //   countInexistente
        // );

        // Set state based on the counts
        setCaldBomEstado(countBomEstado);
        setCaldInsuf(countInsuf);
        setCaldInexistente(countInexistente);
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
    <div className="flex-grow overflow-y-auto py-2 h-full flex items-center justify-center ">
      <div className="text-center">
        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">
          Caldeira em Bom Estado
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-12 mt-2">
          {caldBomEstado}
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Caldeira Insuficiente
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-2 mt-2">
          {caldInsuf}
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-12 mb-2">
          Caldeira Inexistente
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-2 mt-4">
          {caldInexistente}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard02B;
