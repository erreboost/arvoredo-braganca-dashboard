import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = ({ labels, values, options }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Número de Árvores",
        data: values,
        backgroundColor: "#860404",
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  // Merge the passed options with the default options
  const mergedOptions = {
    ...options,
    maintainAspectRatio: false,
    aspectRatio: 0.5,
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        ticks: {
          ...options.scales.y.ticks,
          callback: (value) => {
            const valueMapping = {
              Passeio: "Passeio",
              "Jardim público": "Jardim público",
              Outro: "Outro",
              Via: "Via",
            };

            return valueMapping[value] || value;
          },
        },
      },
    },
  };

  return <Bar data={data} options={mergedOptions} />;
};

export default BarChart;
