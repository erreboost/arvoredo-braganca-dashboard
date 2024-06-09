<<<<<<< HEAD
=======
// VisibleExtentContext.js
>>>>>>> a5c92df654bd07c91ce0898830260b79ff870daa
import React, { createContext, useContext, useState } from "react";

const VisibleExtentContext = createContext();

<<<<<<< HEAD
// Create a provider
export const VisibleExtentProvider: React.FC = ({ children }) => {
  const [visibleExtent, setVisibleExtent] = useState();
=======
const VisibleExtentProvider = ({ children }) => {
  const [mapViewExtent, setMapViewExtent] = useState(null);

  const updateExtent = (extent) => {
    setMapViewExtent(extent);
  };
>>>>>>> a5c92df654bd07c91ce0898830260b79ff870daa

  return (
    <VisibleExtentContext.Provider value={{ mapViewExtent, updateExtent }}>
      {children}
    </VisibleExtentContext.Provider>
  );
};

const useVisibleExtent = () => {
  const context = useContext(VisibleExtentContext);
  if (!context) {
    throw new Error(
      "useVisibleExtent must be used within a VisibleExtentProvider"
    );
  }
  return context;
};

export { VisibleExtentProvider, useVisibleExtent };
