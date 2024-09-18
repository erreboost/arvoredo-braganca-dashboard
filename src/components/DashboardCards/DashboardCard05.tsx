import React, {useEffect, useState} from 'react';
import {useTreeContext} from '../../utils/TreeProvider';
import LoadingSpinner from '../LoadingSpinner';

const DashboardCard05 = () => {
  const [treeCount, setTreeCount] = useState<number | null>(null);
  const {visibleTrees, visibleExtent} = useTreeContext();
  const [loading, setLoading] = useState(true);


  function lonToWebMercatorX(lon: number) {
    return lon * 20037508.34 / 180;
  }
  
  function latToWebMercatorY(lat: number) {
    const rad = lat * Math.PI / 180; 
    return Math.log(Math.tan((Math.PI / 4) + (rad / 2))) * 20037508.34 / Math.PI;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Filter trees
        const filteredTrees = filterTreesByVisibleExtent(
          visibleTrees,
          visibleExtent
        );
        const count = filteredTrees.length;
        setTreeCount(count);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching and processing data:', error);
        setTreeCount(null);
        setLoading(false);
      }
    };

    fetchData();

    // Fetch data every 2min
    const intervalId = setInterval(fetchData, 120000);

    return () => clearInterval(intervalId);
  }, [visibleTrees, visibleExtent]);

  // Function to filter trees based on visible extent
  const filterTreesByVisibleExtent = (trees: any[], extent: any) => {
    if (!extent) return trees;

    return trees.filter((tree) => {
      const x = lonToWebMercatorX(parseFloat(tree.POINT_X_G.replace(',', '.')));
      const y = latToWebMercatorY(parseFloat(tree.POINT_Y_G.replace(',', '.')));

      if (isNaN(x) || isNaN(y)) {
        console.warn(
          'Invalid POINT_X or POINT_Y values:',
          tree.POINT_X,
          tree.POINT_Y
        );
        return false;
      }

      const isWithinExtent =
        x >= extent.xmin &&
        x <= extent.xmax &&
        y >= extent.ymin &&
        y <= extent.ymax;

      return isWithinExtent;
    });
  };

  // Render loading spinner until data is fetched
  if (loading || treeCount === null) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[20vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Final data
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[20vh] items-center justify-center">
      <div className="px-5 pt-5 text-center">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Árvores Públicas
        </h2>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-2">
          {treeCount !== null ? treeCount : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard05;
