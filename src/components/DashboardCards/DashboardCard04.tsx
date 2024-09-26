import React, {useEffect, useState} from 'react';
import BarChart from '../BarChart';
import LoadingSpinner from '../LoadingSpinner';
import {useTreeContext} from '../../utils/TreeProvider';

interface Tree {
  Localizacao: string;
  POINT_X_G: string;
  POINT_Y_G: string;
}

const DashboardCard04: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    values: number[];
  }>({
    labels: [],
    values: [],
  });

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
    const updateChartData = () => {
      setLoading(true);

      try {
        // Filter trees based on visible extent
        const filteredTrees = filterTreesByVisibleExtent(
          visibleTrees,
          visibleExtent
        );
        const treeCounts: {[key: string]: number} = {
          Passeio: 0,
          'Jardim público': 0,
          Via: 0,
          Outro: 0,
        };

        filteredTrees.forEach((tree: Tree) => {
          const location = tree.Localizacao;

          if (
            location === 'Passeio' ||
            location === 'Jardim público' ||
            location === 'Via'
          ) {
            treeCounts[location]++;
          } else {
            treeCounts['Outro']++;
          }
        });

        const labels = Object.keys(treeCounts);
        const values = Object.values(treeCounts);

        setChartData({labels, values});
      } catch (error) {
        console.error('Error processing tree data:', error);
      } finally {
        setLoading(false);
      }
    };

    updateChartData();

    const intervalId = setInterval(updateChartData, 120000);

    return () => clearInterval(intervalId);
  }, [visibleTrees, visibleExtent]);

  // Filter trees based on visible extent
  const filterTreesByVisibleExtent = (trees: Tree[], extent: any) => {
    if (!extent) return trees; // Return all trees if extent is not defined

    return trees.filter((tree) => {
      const x = lonToWebMercatorX(parseFloat(tree.POINT_X_G.replace(',', '.')));
      const y = latToWebMercatorY(parseFloat(tree.POINT_Y_G.replace(',', '.')));

      if (isNaN(x) || isNaN(y)) {
        console.warn(
          'Invalid POINT_X or POINT_Y values:',
          tree.POINT_X_G,
          tree.POINT_Y_G
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

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          // text: 'Localização',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Núm. de Árvores',
        },
        ticks: {
          maxTicksLimit: 3,
          callback: (value: any) => {
            if (value === 0) return value;
            if (value === 5000) return '5k';
            if (value === 10000) return '10k';
            return '';
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[20vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Final Data
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[20vh]">
      <div className="px-5 pt-2">
        <h2 className="text-lg flex justify-center items-center font-semibold text-slate-800 dark:text-slate-100">
          Localização
        </h2>
        <div className="h-[80%]">
          <BarChart
            labels={chartData.labels}
            values={chartData.values}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard04;
