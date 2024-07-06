import React, {createContext, useContext, useState} from 'react';
import {Tree} from '../types/interfaces';

interface VisibleExtentContextType {
  visibleExtent: any;
  setVisibleExtent: React.Dispatch<React.SetStateAction<any>>;
  visibleTrees: Tree[];
  setVisibleTrees: React.Dispatch<React.SetStateAction<Tree[]>>;
}

const VisibleExtentContext = createContext<
  VisibleExtentContextType | undefined
>(undefined);

export const useVisibleExtent = () => {
  const context = useContext(VisibleExtentContext);
  if (!context) {
    throw new Error(
      'useVisibleExtent must be used within a VisibleExtentProvider'
    );
  }
  return context;
};

export const VisibleExtentProvider: React.FC = ({children}) => {
  const [visibleExtent, setVisibleExtent] = useState<any>(null);
  const [visibleTrees, setVisibleTrees] = useState<Tree[]>([]);

  return (
    <VisibleExtentContext.Provider
      value={{visibleExtent, setVisibleExtent, visibleTrees, setVisibleTrees}}
    >
      {children}
    </VisibleExtentContext.Provider>
  );
};
