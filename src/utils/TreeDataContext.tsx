import React, { createContext, useContext, useState } from "react";

const TreeDataContext = createContext();

export const TreeDataProvider = ({ children }) => {
  const [treeData, setTreeData] = useState([]);

  return (
    <TreeDataContext.Provider value={{ treeData, setTreeData }}>
      {children}
    </TreeDataContext.Provider>
  );
};

export const useTreeData = () => {
  const context = useContext(TreeDataContext);

  if (!context) {
    throw new Error("useTreeData must be used within a TreeDataProvider");
  }

  return context;
};
