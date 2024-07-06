import React, {useEffect, useState} from 'react';
import {useVisibleExtent} from '../../utils/VisibleExtentContext';

const DashboardCard01 = () => {
  const [treeSpecies, setTreeSpecies] = useState<string[]>([]);
  const {visibleTrees} = useVisibleExtent();

  useEffect(() => {
    const species = visibleTrees.map((tree: any) => tree.Especie);
    setTreeSpecies(species);
  }, [visibleTrees]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Espécies
        </h2>
      </div>
      <div className="px-4 py-3 flex-1 overflow-y-auto">
        <ul className="grid grid-cols-1 gap-4">
          {treeSpecies.map((species, index) => (
            <li
              key={index}
              className="py-2 px-3 rounded-md text-sm bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white"
            >
              {species}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCard01;
