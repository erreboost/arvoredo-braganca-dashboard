import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

function FilteredResults({ filteredData, onClearResults }) {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaArrowLeft
            className="text-xl mr-2 cursor-pointer"
            onClick={handleBack}
          />
          <span className="text-xl font-semibold">Resultados</span>
        </div>
        <FaTrash className="text-xl cursor-pointer" onClick={onClearResults} />
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        {filteredData.map((row, index) => (
          <div key={index} className="flex mb-2">
            <div className="font-semibold pr-2">{row[0]}</div>
            <div>{row[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilteredResults;
