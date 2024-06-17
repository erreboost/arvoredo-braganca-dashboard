import { useState, useEffect, useContext } from "react";
import { DataContext } from "../config/DataContext";

function CaracteristicasEspecificas() {
  const [selectedFilters, setSelectedFilters] = useState({
    dap: "",
    idade: "",
    altura: "",
  });

  const data = useContext(DataContext);

  const [uniqueDap, setUniqueDap] = useState([]);
  const [uniqueIdade, setUniqueIdade] = useState([]);
  const [uniqueAltura, setUniqueAltura] = useState([]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    console.log("Selected Filters:", selectedFilters);
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      dap: "",
      idade: "",
      altura: "",
    });
  };

  useEffect(() => {
    if (data) {
      const dapValues = [
        ...new Set(data.trees.map((item) => item.DAP_v2)),
      ].sort((a, b) => a - b);
      const idadeValues = [
        ...new Set(data.trees.map((item) => item.idade_apro_v2)),
      ].sort();
      const alturaValues = [
        ...new Set(data.trees.map((item) => item.Altura_v2)),
      ].sort((a, b) => a - b);

      setUniqueDap(dapValues);
      setUniqueIdade(idadeValues);
      setUniqueAltura(alturaValues);
    }
  }, [data]);

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
          <option value="">- Tudo -</option>
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
          <option value="">- Tudo -</option>
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
          <option value="">- Tudo -</option>
          {generateOptions(uniqueAltura)}
        </select>
      </div>

      <div className="flex justify-end mt-4">
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

export default CaracteristicasEspecificas;
