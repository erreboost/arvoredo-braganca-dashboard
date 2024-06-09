import React, { useEffect, useState } from "react";
import BarChart from "../BarChart";
import { useVisibleExtent } from "../../utils/VisibleExtentContext";

const DashboardCard04 = () => {
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const { visibleExtent } = useVisibleExtent();

  useEffect(() => {
    // Fetch CSV data
    fetch("/arvores_0.csv")
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n");
        const treeCounts = {
          Passeio: 0,
          "Jardim público": 0,
          Via: 0,
          Outro: 0,
        };

        rows.slice(1).forEach((row) => {
          const columns = row.split(",");
          const location = columns[3]; // Assuming D column for location

          if (
            location === "Passeio" ||
            location === "Jardim público" ||
            location === "Via"
          ) {
            treeCounts[location]++;
          } else {
            treeCounts["Outro"]++;
          }
        });

        const labels = Object.keys(treeCounts);
        const values = Object.values(treeCounts);

        setChartData({ labels, values });
      })
      .catch((error) => console.error("Error fetching CSV data", error));
  }, [visibleExtent]);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Location",
        },
      },
      y: {
        title: {
          display: true,
          text: "Número de Árvores",
        },
        ticks: {
          maxTicksLimit: 3,
          callback: (value) => {
            if (value === 0) return value;
            if (value === 5000) return "5k";
            if (value === 10000) return "10k";
            return "";
          },
        },
      },
    },
  };

  return (
    <div
      className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[20vh]"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="px-5 pt-5">
        <h2 className="text-lg flex justify-center items-center font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Localização
        </h2>
        <div className="h-[80%]">
          <BarChart
            labels={chartData.labels}
            values={chartData.values}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard04;
