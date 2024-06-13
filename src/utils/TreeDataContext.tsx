import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface TreeDataContextProps {
  treeData: any[];
  setTreeData: (data: any[]) => void;
}

// Create the context with a default value
const TreeDataContext = createContext<TreeDataContextProps | undefined>(
  undefined
);

interface TreeDataProviderProps {
  children: ReactNode;
}

export const TreeDataProvider = ({ children }: TreeDataProviderProps) => {
  const [treeData, setTreeData] = useState<any[]>([]);

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
