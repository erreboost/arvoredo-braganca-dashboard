import React, { createContext, useContext, useState } from "react";

const VisibleExtentContext = createContext();

export const VisibleExtentProvider: React.FC = ({ children }) => {
  const [visibleExtent, setVisibleExtent] = useState();

  const updateExtent = (extent) => {
    setVisibleExtent(extent);
  };

  return (
    <VisibleExtentContext.Provider value={{ visibleExtent, updateExtent }}>
      {children}
    </VisibleExtentContext.Provider>
  );
};

export const useVisibleExtent = () => {
  const context = useContext(VisibleExtentContext);
  if (!context) {
    throw new Error(
      "useVisibleExtent must be used within a VisibleExtentProvider"
    );
  }
  return context;
};
