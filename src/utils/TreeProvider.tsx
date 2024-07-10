import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode, // Import ReactNode
} from 'react';
import {API_ENDPOINT, API_BASE_URL} from '../config/config';
import {Tree} from '../types/interfaces';

interface TreeContextProps {
  trees: Tree[];
  setTrees: Dispatch<SetStateAction<Tree[]>>;
  visibleTrees: Tree[];
  setVisibleTrees: (trees: Tree[]) => void;
  visibleExtent: any;
  setVisibleExtent: (extent: any) => void;
}

interface TreeProviderProps {
  children: ReactNode; // Define children prop
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider: React.FC<TreeProviderProps> = ({children}) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [visibleTrees, setVisibleTrees] = useState<Tree[]>([]);
  const [visibleExtent, setVisibleExtent] = useState<any>(null);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        const treesWithFullImageURLs = data.trees.map((tree: Tree) => ({
          ...tree,
          Fotos: tree.Fotos.map((photo: string) => `${API_BASE_URL}/${photo}`),
        }));
        setTrees(treesWithFullImageURLs);
      })
      .catch((error) => console.error('Error fetching tree data:', error));
  }, []);

  return (
    <TreeContext.Provider
      value={{
        trees,
        setTrees,
        visibleTrees,
        setVisibleTrees,
        visibleExtent,
        setVisibleExtent,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};
