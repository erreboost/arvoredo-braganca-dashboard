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
  treesDashboard: any
  setTreesDashboard: any
  visibleTreesDashboard: any
  setVisibleTreesDashboard: any
  visibleExtentDashboard: any
  setVisibleExtentDashboard: any

}

interface TreeProviderProps {
  children: ReactNode;
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [visibleTrees, setVisibleTrees] = useState<Tree[]>([]);
  const [visibleExtent, setVisibleExtent] = useState<any>(null);
  const [treesDashboard, setTreesDashboard] = useState<Tree[]>([]);
  const [visibleTreesDashboard, setVisibleTreesDashboard] = useState<Tree[]>([]);
  const [visibleExtentDashboard, setVisibleExtentDashboard] = useState<any>(null);


  const fetchData = async () => {
    const cacheName = 'trees';
    const cacheKey = 'treesData';
    
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(cacheKey);
      let apiData: Tree[] = []; 

    
      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        // console.log('CachedResponse', cachedData);
        apiData = cachedData;
        setTrees(apiData);
        setVisibleTrees(apiData);
        setTreesDashboard(apiData)
        setVisibleTreesDashboard(apiData)
      }

  
      const response = await fetch(API_ENDPOINT);
      const newData = await response.json();

      const treesWithFullImageURLs = newData.trees.map((tree: Tree) => ({
        ...tree,
        Fotos: tree.Fotos.map((photo: string) => `${API_BASE_URL}/${photo}`),
      }));

   
      if (JSON.stringify(treesWithFullImageURLs) !== JSON.stringify(apiData)) {
        setTrees(treesWithFullImageURLs);
        setVisibleTrees(treesWithFullImageURLs);
        setTreesDashboard(treesWithFullImageURLs)
        setVisibleTreesDashboard(treesWithFullImageURLs)
        
        await cache.put(cacheKey, new Response(JSON.stringify(treesWithFullImageURLs), {
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching tree data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData();
    }, 900000); 

  
  
    return () => {
      clearInterval(intervalId);
    };
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
        treesDashboard,
        setTreesDashboard,
        visibleTreesDashboard,
        setVisibleTreesDashboard,
        visibleExtentDashboard,
        setVisibleExtentDashboard,
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
