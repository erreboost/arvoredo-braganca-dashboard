import React, {useState, useEffect} from 'react';
import {useTreeContext} from '../../utils/TreeProvider';

const DashboardCard01 = () => {
  const [treeSpecies, setTreeSpecies] = useState<string[]>([]);
  const {visibleTrees} = useTreeContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visibleTrees.length > 0) {
      let species = visibleTrees.map((tree) => tree.Especie);

      // Remove duplicates
      species = [...new Set(species)];

      // Sort alphabetically
      species.sort((a, b) => a.localeCompare(b));

      setTreeSpecies(species);
      setLoading(false);
    } else {
      setTreeSpecies([]);
      setLoading(false);
    }
  }, [visibleTrees]);

  if (loading) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative">
        <div className="px-5 pt-5 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 text-center mb-2 mt-2">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col -z-50 w-screen col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative md:max-w-[300px]">
      <div className="px-5 pt-5 flex flex-col h-full">
        {treeSpecies.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 text-center mb-2 mt-2">
              Espécies
            </h2>
            {/* Divider line */}
            <hr className="border-t border-slate-300 my-0 border-4 rounded-xl" />
            {/* List of tree species */}
            <div className="overflow-y-scroll py-2 max-h-full mb-4">
              {treeSpecies.map((species, index) => (
                <div key={index} className="text-sm mb-1">
                  {species}
                </div>
              ))}
            </div>
          </>
        )}
        {!loading && treeSpecies.length === 0 && (
          <div className="text-center text-gray-600">
            A aguardar informação...
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard01;
