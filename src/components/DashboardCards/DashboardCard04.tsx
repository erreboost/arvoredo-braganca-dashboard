import React, { useEffect, useState } from "react";
import BarChart from "../BarChart";
import { useVisibleExtent } from "../../utils/VisibleExtentContext";
import { API_ENDPOINT } from "../../config/config";

interface Tree {
  Localizacao: string;
}

const DashboardCard04: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    values: number[];
  }>({
    labels: [],
    values: [],
  });
  const { visibleExtent } = useVisibleExtent();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        const treeCounts: { [key: string]: number } = {
          Passeio: 0,
          "Jardim público": 0,
          Via: 0,
          Outro: 0,
        };

        // Assuming data is an array of Tree objects
        data.trees.forEach((tree: Tree) => {
          const location = tree.Localizacao;

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
      } catch (error) {
        console.error("Error fetching tree data", error);
        // Add UI feedback or error handling logic here
      }
    };

    // Fetch data when the component mounts or when visibleExtent changes
    fetchData();

    // Set up interval to fetch data every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Clean up interval when the component unmounts
    return () => clearInterval(intervalId);
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
          callback: (value: any) => {
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
