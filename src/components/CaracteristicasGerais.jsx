import { useState, useEffect, useContext } from "react";
import FilteredResults from "./FilteredResults";
import { API_ENDPOINT } from "../config/config";
import { DataContext } from "../config/DataContext";

function CaracteristicasGerais() {
  const [selectedFilters, setSelectedFilters] = useState({
    nomeComum: "",
    especie: "",
    estado: "",
    localizacao: "",
  });

  const data = useContext(DataContext);

  const [uniqueNomeComum, setUniqueNomeComum] = useState([]);
  const [uniqueEspecie, setUniqueEspecie] = useState([]);
  const [uniqueEstado, setUniqueEstado] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueLocalizacao, setUniqueLocalizacao] = useState([]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      const trees = data.trees;

      const uniqueNomeComum = [...new Set(trees.map((tree) => tree.Nomecomum))];
      const uniqueEspecie = [...new Set(trees.map((tree) => tree.Especie))];
      const uniqueEstado = [...new Set(trees.map((tree) => tree.Estado_fit))];
      const uniqueLocalizacao = [
        ...new Set(trees.map((tree) => tree.Localizacao)),
      ];

      setUniqueNomeComum(uniqueNomeComum);
      setUniqueEspecie(uniqueEspecie);
      setUniqueEstado(uniqueEstado);
      setUniqueLocalizacao(uniqueLocalizacao);
    }
  }, [data]);

  const handleApplyFilters = () => {
    // Fetch data from the endpoint
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        const trees = data.trees;

        // Extract unique values for each filter
        const uniqueNomeComum = [
          ...new Set(trees.map((tree) => tree.Nomecomum)),
        ];
        const uniqueEspecie = [...new Set(trees.map((tree) => tree.Especie))];
        const uniqueEstado = [...new Set(trees.map((tree) => tree.Estado_fit))];
        const uniqueLocalizacao = [
          ...new Set(trees.map((tree) => tree.Localizacao)),
        ];

        // Set unique values for each filter
        setUniqueNomeComum(uniqueNomeComum);
        setUniqueEspecie(uniqueEspecie);
        setUniqueEstado(uniqueEstado);
        setUniqueLocalizacao(uniqueLocalizacao);
      })
      .catch((error) => {
        console.error("Error fetching tree data:", error);
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
    handleApplyFilters();
  }, []);

  function generateOptions(values) {
    // Sort the values alphabetically
    const sortedValues = values.sort((a, b) => a.localeCompare(b));

    // Remove duplicates using Set
    const uniqueValues = [...new Set(sortedValues)];

    return uniqueValues.map((value, index) => (
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
          {generateOptions(uniqueEstado)}
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
      <div className="flex justify-end -mt-10">
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

      {/* Display filtered results */}
      {filteredData.length > 0 && (
        <FilteredResults
          filteredData={filteredData}
          onClearResults={() => setFilteredData([])}
        />
      )}
    </div>
  );
}

export default CaracteristicasGerais;
