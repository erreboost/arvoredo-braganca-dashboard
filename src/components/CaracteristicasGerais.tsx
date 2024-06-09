import React, { useState, useEffect } from "react";
import FilteredResults from "./FilteredResults";

function CaracteristicasGerais() {
  const [selectedFilters, setSelectedFilters] = useState({
    nomeComum: "",
    especie: "",
    estado: "",
    localizacao: "",
  });

  const [uniqueNomeComum, setUniqueNomeComum] = useState([]);
  const [uniqueEspecie, setUniqueEspecie] = useState([]);
  const [uniqueEstado, setUniqueEstado] = useState([
    "Em dúvida",
    "Morta",
    "Viva",
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueLocalizacao, setUniqueLocalizacao] = useState([]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Fetch and parse the CSV file
    fetch("/arvores_0.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const parsedData = parseCSV(csvData);

        // Filter data based on selected filters
        const filteredData = parsedData.filter((row) => {
          return (
            (selectedFilters.nomeComum === "" ||
              row[8] === selectedFilters.nomeComum) &&
            (selectedFilters.especie === "" ||
              row[7] === selectedFilters.especie) &&
            (selectedFilters.estado === "" ||
              row[3] === selectedFilters.estado) &&
            (selectedFilters.localizacao === "" ||
              row[8] === selectedFilters.localizacao)
          );
        });

        // Log filtered data to the console
        console.log("Filtered Data:", filteredData);

        // Output filtered data to the console
        console.log("Filtered Data:", filteredData);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV file:", error);
      });
  };

  const handleResetFilters = () => {
    // Reset all filters
    setSelectedFilters({
      nomeComum: "",
      especie: "",
      estado: "",
      localizacao: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch and parse the CSV file
        const response = await fetch("/arvores_0.csv");
        const csvData = await response.text();
        const parsedData = parseCSV(csvData);

        // Extract unique values for each filter
        const uniqueNomeComum = [
          ...new Set(parsedData.slice(1).map((row) => row[8])),
        ];
        const uniqueEspecie = [
          ...new Set(parsedData.slice(1).map((row) => row[7])),
        ];
        const uniqueLocalizacao = [
          ...new Set(parsedData.slice(1).map((row) => row[3])),
        ];

        // Set state without sorting
        setUniqueNomeComum(uniqueNomeComum);
        setUniqueEspecie(uniqueEspecie);
        setUniqueLocalizacao(uniqueLocalizacao);

        // Sort the unique values alphabetically
        setUniqueNomeComum((prev) => [...prev].sort());
        setUniqueEspecie((prev) => [...prev].sort());
        setUniqueLocalizacao((prev) => [...prev].sort());
      } catch (error) {
        console.error("Error fetching CSV file:", error);
      }
    };

    fetchData();
  }, []);

  // Sort values alphabetically after data is fetched
  useEffect(() => {
    setUniqueNomeComum((prev) => [...prev].sort());
    setUniqueEspecie((prev) => [...prev].sort());
    setUniqueLocalizacao((prev) => [...prev].sort());
  }, [uniqueNomeComum.length, uniqueEspecie.length, uniqueLocalizacao.length]);

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

      {/* List 1: Nome comum */}
      <div className="mb-0">
        <h3 className="text-lg font-semibold">Nome comum:</h3>
        <select
          value={selectedFilters.nomeComum}
          onChange={(e) => handleFilterChange("nomeComum", e.target.value)}
          className="mb-2 w-full max-w-xs"
        >
          <option value="">- Tudo -</option>
          {generateOptions(uniqueNomeComum)}
        </select>
      </div>

      {/* List 2: Espécie */}
      <div className="mb-0">
        <h3 className="text-lg font-semibold">Espécie:</h3>
        <select
          value={selectedFilters.especie}
          onChange={(e) => handleFilterChange("especie", e.target.value)}
          className="mb-2 w-full max-w-xs"
        >
          <option value="">- Tudo -</option>
          {generateOptions(uniqueEspecie)}
        </select>
      </div>

      {/* List 3: Estado */}
      <div className="mb-0">
        <h3 className="text-lg font-semibold">Estado:</h3>
        <select
          value={selectedFilters.estado}
          onChange={(e) => handleFilterChange("estado", e.target.value)}
          className="mb-2 w-full max-w-xs"
        >
          <option value="">- Tudo -</option>
          <option key="em-duvida" value="Em dúvida">
            Em dúvida
          </option>
          <option key="morta" value="Morta">
            Morta
          </option>
          <option key="viva" value="Viva">
            Viva
          </option>
        </select>
      </div>

      {/* List 4: Localização */}
      <div className="mb-0">
        <h3 className="text-lg font-semibold">Localização:</h3>
        <select
          value={selectedFilters.localizacao}
          onChange={(e) => handleFilterChange("localizacao", e.target.value)}
          className="mb-4 w-full max-w-xs"
        >
          <option value="">- Tudo -</option>
          {generateOptions(uniqueLocalizacao)}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-0">
        <button
          onClick={handleApplyFilters}
          className="border bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg"
        >
          Aplicar
        </button>
        <button
          onClick={handleResetFilters}
          className="border bg-white px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CaracteristicasGerais;
