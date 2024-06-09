import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Informacao from "../components/Informacao";
import Consulta from "../components/Consulta";
import OcorrenciaInicio from "../components/OcorrenciaInicio";
import LeftComponent from "../components/LeftComponent";
import RightComponent from "../components/RightComponent";
import Bottom from "../components/Bottom";
import EsriMap from "../components/EsriMap";
import Loading from "../components/Loading";

function Inicio() {
  const [loading, setLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  const renderSelectedComponent = () => {
    if (selectedComponent === "component1") {
      return <Informacao />;
    } else if (selectedComponent === "component2") {
      return <Consulta />;
    } else if (selectedComponent === "component3") {
      return <OcorrenciaInicio />;
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AnimatePresence exitBeforeEnter={false}>
        {loading && (
          <motion.div
            key="loading"
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              className="text-xl font-semibold text-gray-800"
            >
              🌳 Loading Map 🌳
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          className="flex flex-col lg:flex-row flex-grow bg-gray-100 h-screen"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
        >
          <div className="w-full lg:w-1/3 p-2 bg-gray-500 overflow-hidden rounded-md h-5/6">
            <LeftComponent onButtonClick={handleButtonClick} />
          </div>

          <motion.div
            className="w-full lg:w-1/3 lg:flex lg:flex-grow h-5/6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeInOut" }}
          >
            <RightComponent />
          </motion.div>
        </motion.div>
      )}

      {/* Container for Bottom Div and Footer */}

      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.0, delay: 0.3, ease: "easeInOut" }}
      >
        <Bottom />
      </motion.div>
    </div>
  );
}

export default Inicio;
