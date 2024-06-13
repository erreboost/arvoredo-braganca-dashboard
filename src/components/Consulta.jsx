import React, { useState } from "react";
import CaracteristicasGerais from "./CaracteristicasGerais";
import CaracteristicasEspecificas from "./CaracteristicasEspecificas";

function Consulta() {
  const [selectedCategory, setSelectedCategory] = useState("Gerais");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="flex justify-between border p-4 mb-4">
        <button
          className={`font-semibold ${
            selectedCategory === "Gerais" ? "border-b-2 border-red-700" : ""
          }`}
          onClick={() => handleCategoryChange("Gerais")}
        >
          Características Gerais
        </button>
        <button
          className={`font-semibold ${
            selectedCategory === "Específicas"
              ? "border-b-2 border-red-700"
              : ""
          }`}
          onClick={() => handleCategoryChange("Específicas")}
        >
          Características Específicas
        </button>
      </div>

      {/* Render the appropriate component based on the selected category */}
      {selectedCategory === "Gerais" && <CaracteristicasGerais />}
      {selectedCategory === "Específicas" && <CaracteristicasEspecificas />}
    </div>
  );
}

export default Consulta;
