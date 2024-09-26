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
  treesCached: Tree[] | null;
  setTreesCached: Dispatch<SetStateAction<Tree[] | null>>;
}

interface TreeProviderProps {
  children: ReactNode; 
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [visibleTrees, setVisibleTrees] = useState<Tree[]>([]);
  const [visibleExtent, setVisibleExtent] = useState<any>(null);
  const [treesCached, setTreesCached] = useState<Tree[] | null>(null);

  const addDataIntoCache = async (cacheName: string, url: string, data: Tree[]) => {
    const cacheStorage = await caches.open(cacheName);
    const response = new Response(JSON.stringify(data)); 
    await cacheStorage.put(url, response); 
  };

  const getCachedData = async (cacheName: string, url: string) => {
    try {
      const cacheStorage = await caches.open(cacheName);
      const cachedResponse = await cacheStorage.match(url);
      if (cachedResponse && cachedResponse.ok) {
        const data = await cachedResponse.json();
        setTreesCached(data); 
        // console.log("Cached data retrieved:", data);
        return data;
      }
      return null;
    } catch (error) {
      // console.error('Error retrieving cached data:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const apiData = await response.json();
  
        const treesWithFullImageURLs = apiData.trees.map((tree: Tree) => ({
          ...tree,
          Fotos: tree.Fotos.map((photo: string) => `${API_BASE_URL}/${photo}`),
        }));
  
        const cachedData = await getCachedData("trees", API_ENDPOINT);
  
        if (!cachedData || JSON.stringify(cachedData) !== JSON.stringify(treesWithFullImageURLs)) {
          console.log('New data found. Updating cache...');
          await addDataIntoCache("trees", API_ENDPOINT, treesWithFullImageURLs);
          setTrees(treesWithFullImageURLs);
          setVisibleTrees(treesWithFullImageURLs);
        } else {
          // console.log('Data is the same as cache. Using cached data.');
          setTrees(cachedData);
          setVisibleTrees(cachedData);
        }
      } catch (error) {
        // console.error('Error fetching tree data:', error);
      }
    };
  
    fetchData();
  
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
        treesCached,
        setTreesCached,
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
