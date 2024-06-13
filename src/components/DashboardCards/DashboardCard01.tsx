import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/config";

const DashboardCard01 = () => {
  const [treeSpecies, setTreeSpecies] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        let species = data.trees.map((tree: any) => tree.Especie);

        // Remove duplicates
        species = [...new Set(species)];

        // Sort alphabetically
        species.sort((a: string, b: string) => a.localeCompare(b));

        setTreeSpecies(species);
      } catch (error) {
        console.error("Error fetching tree data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative">
      <div className="px-5 pt-5 flex flex-col h-full">
        {treeSpecies.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 text-center mb-2 mt-2">
              Espécie e Variedade
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
      </div>
    </div>
  );
};

export default DashboardCard01;
