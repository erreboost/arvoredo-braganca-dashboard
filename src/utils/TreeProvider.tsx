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
import { addDataIntoCache } from './Utils';

interface TreeContextProps {
  trees: Tree[];
  setTrees: Dispatch<SetStateAction<Tree[]>>;
  visibleTrees: Tree[];
  setVisibleTrees: (trees: Tree[]) => void;
  visibleExtent: any;
  setVisibleExtent: (extent: any) => void;
  treesCached: any
  setTreesCached: any
}

interface TreeProviderProps {
  children: ReactNode; // Define children prop
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider: React.FC<TreeProviderProps> = ({children}) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [visibleTrees, setVisibleTrees] = useState<Tree[]>([]);
  const [visibleExtent, setVisibleExtent] = useState<any>(null);
  const [treesCached, setTreesCached] = useState<any>(null)

  async function getCachedData(cacheName: string, url: URL | RequestInfo) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url); // Returns a promise w/ matched cache
    if(!cachedResponse || !cachedResponse.ok) {return false}
    // console.log("cachedResponse", await cachedResponse.json());
    const response = await cachedResponse.json()
    setTreesCached(response)
    //console.log(await cachedResponse.json()); // prints json object with value of key matched
    // return await cachedResponse;
};


  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        const treesWithFullImageURLs = data.trees.map((tree: Tree) => ({
          ...tree,
          Fotos: tree.Fotos.map((photo: string) => `${API_BASE_URL}/${photo}`),
        }));
        setTrees(treesWithFullImageURLs);
        addDataIntoCache("trees", "https://localhost:5173", treesWithFullImageURLs)
      }).then(() => getCachedData("trees", "https://localhost:5173"))
      .catch((error) => console.error('Error fetching tree data:', error));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        const treesWithFullImageURLs = data.trees.map((tree: Tree) => ({
          ...tree,
          Fotos: tree.Fotos.map((photo: string) => `${API_BASE_URL}/${photo}`),
        }));
        setTrees(treesWithFullImageURLs);
        addDataIntoCache("trees", "https://localhost:5173", treesWithFullImageURLs)
      }).then(() => getCachedData("trees", "https://localhost:5173"))
      .catch((error) => console.error('Error fetching tree data:', error));
      
    }, 900000)
    
  }, []);
  
  // useEffect(() => {
  //   // getCachedData("trees", "https://localhost:5173");
  //   console.log("treeeeeeeees", treesCached)
  // }, [trees])

 
  

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
        setTreesCached
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
