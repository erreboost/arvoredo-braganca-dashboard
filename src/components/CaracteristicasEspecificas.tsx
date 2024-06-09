import React, { useState, useEffect } from "react";

function CaracteristicasEspecificas() {
  const [selectedFilters, setSelectedFilters] = useState({
    dap: "", // Initially set to empty
    idade: "",
    altura: "",
  });

  const [uniqueDap, setUniqueDap] = useState(["Tudo", "0"]); // Include "Tudo" and "0" in the initial state
  const [uniqueIdade, setUniqueIdade] = useState([
    "Tudo",
    "< 5 anos",
    "> 5 anos",
  ]);
  const [uniqueAltura, setUniqueAltura] = useState(["Tudo", "0"]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log("Selected Filters:", selectedFilters);
    // TODO: Implement logic to display array groups with corresponding items
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      dap: "Tudo", // Set dap back to "Tudo" on reset
      idade: "",
      altura: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your existing fetch logic

        // Set dap to "Tudo" initially
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          dap: "Tudo",
        }));
      } catch (error) {
        console.error("Error fetching CSV file:", error);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csvData) => {
    const lines = csvData.split("\n");
    return lines.map((line) => line.split(","));
  };

  function generateOptions(values) {
    return values.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Selecione o Filtro Pretendido
      </h2>

      <div className="mb-0">
        <h3 className="text-lg font-semibold">DAP (cm):</h3>
        <select
          value={selectedFilters.dap}
          onChange={(e) => handleFilterChange("dap", e.target.value)}
          className="mb-2 w-full"
        >
          {/* <option value="">- Tudo -</option> */}
          {generateOptions(uniqueDap)}
        </select>
      </div>

      <div className="mb-0">
        <h3 className="text-lg font-semibold">Idade:</h3>
        <select
          value={selectedFilters.idade}
          onChange={(e) => handleFilterChange("idade", e.target.value)}
          className="mb-2 w-full"
        >
          {generateOptions(uniqueIdade)}
        </select>
      </div>

      <div className="mb-0">
        <h3 className="text-lg font-semibold">Altura:</h3>
        <select
          value={selectedFilters.altura}
          onChange={(e) => handleFilterChange("altura", e.target.value)}
          className="mb-2 w-full"
        >
          {generateOptions(uniqueAltura)}
        </select>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleApplyFilters}
          className="border bg-blue-500 text-white px-4 py-2 mr-2"
        >
          Aplicar
        </button>
        <button
          onClick={handleResetFilters}
          className="border bg-white px-4 py-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CaracteristicasEspecificas;
