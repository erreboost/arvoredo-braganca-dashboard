import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/config";

interface Tree {
  Esdado_cal: string;
}

const DashboardCard02B: React.FC = () => {
  const [caldBomEstado, setCaldBomEstado] = useState<number>(0);
  const [caldInsuf, setCaldInsuf] = useState<number>(0);
  const [caldInexistente, setCaldInexistente] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        // Initialize counters
        let countBomEstado = 0;
        let countInsuf = 0;
        let countInexistente = 0;

        // Loop through the trees
        data.trees.forEach((tree: Tree) => {
          if (tree.Esdado_cal === "Caldeira suficiente e em bom estado.") {
            countBomEstado++;
          } else if (tree.Esdado_cal === "Caldeira insuficiente.") {
            countInsuf++;
          } else {
            countInexistente++;
          }
        });

        // Update state with the counts
        setCaldBomEstado(countBomEstado);
        setCaldInsuf(countInsuf);
        setCaldInexistente(countInexistente);
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
