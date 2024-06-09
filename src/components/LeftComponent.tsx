import React, { useState, useEffect } from "react";
import Informacao from "./Informacao";

import Ocorrencia2 from "./Ocorrencia2";
import Consulta from "./Consulta";

interface LeftComponentProps {
  onButtonClick: (componentName: string) => void;
}

const LeftComponent: React.FC<LeftComponentProps> = ({ onButtonClick }) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    "component1"
  );

  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
    onButtonClick(componentName);
  };

  const renderSelectedComponent = () => {
    if (selectedComponent === "component1") {
      return <Informacao />;
    } else if (selectedComponent === "component2") {
      return <Consulta />;
    } else if (selectedComponent === "component3") {
      return <Ocorrencia2 />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    onButtonClick("component1");
  }, []);

  return (
    <div>
      <div className="bg-[#A39161] p-4 rounded-md flex justify-center items-center">
        <button
          onClick={() => handleButtonClick("component1")}
          className={`mx-2 font-semibold ${
            selectedComponent === "component1"
              ? "py-1 px-4 rounded-lg text-sm bg-red-700 text-white ease-in transition-all duration-200"
              : "text-white text-sm py-1 px-4 rounded-lg"
          }`}
        >
          Informação
        </button>
        <button
          onClick={() => handleButtonClick("component2")}
          className={`mx-2 font-semibold ${
            selectedComponent === "component2"
              ? "py-1 px-4 rounded-lg text-sm bg-red-700 text-white ease-in transition-all duration-200"
              : "text-white text-sm py-1 px-4 rounded-lg"
          }`}
        >
          Consulta
        </button>
        <button
          onClick={() => handleButtonClick("component3")}
          className={`mx-2 font-semibold ${
            selectedComponent === "component3"
              ? "py-1 px-4 rounded-lg text-sm bg-red-700 text-white ease-in transition-all duration-200"
              : "text-white text-sm py-1 px-4 rounded-lg"
          }`}
        >
          Ocorrência
        </button>
      </div>

      {renderSelectedComponent()}
    </div>
  );
};

export default LeftComponent;
