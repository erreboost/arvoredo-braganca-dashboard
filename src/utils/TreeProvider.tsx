import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode, 
} from 'react';
import { API_ENDPOINT, API_BASE_URL } from '../config/config';
import { Tree } from '../types/interfaces';

interface TreeContextProps {
  trees: Tree[];
  setTrees: Dispatch<SetStateAction<Tree[]>>;
  visibleTrees: Tree[];
  setVisibleTrees: (trees: Tree[]) => void;
  visibleExtent: any;
  setVisibleExtent: (extent: any) => void;
}

interface TreeProviderProps {
  children: ReactNode; 
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [visibleTrees, setVisibleTrees] = useState<Tree[]>([]);
  const [visibleExtent, setVisibleExtent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const apiData = await response.json();

        const treesWithFullImageURLs = apiData.trees.map((tree: Tree) => ({
          ...tree,
          Fotos: tree.Fotos.map((photo: string) => `${API_BASE_URL}/${photo}`),
        }));

        setTrees(treesWithFullImageURLs);
        setVisibleTrees(treesWithFullImageURLs);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };

    fetchData();

    // Refetch data every 15 minutes (900000ms)
    const intervalId = setInterval(() => {
      fetchData();
    }, 900000);

    return () => clearInterval(intervalId);
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
