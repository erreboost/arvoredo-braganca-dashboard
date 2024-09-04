import React, {createContext, useState, useEffect} from 'react';
import {API_ENDPOINT} from './config';

const DataContext = createContext(null);

const DataProvider = ({children}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    dap: '',
    idade: '',
    altura: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 60000); // Fetch data every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <DataContext.Provider value={{data, loading, error, selectedFilters, setSelectedFilters}}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
