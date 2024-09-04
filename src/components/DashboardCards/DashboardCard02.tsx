import React, {useEffect, useState} from 'react';
import {useTreeContext} from '../../utils/TreeProvider';
import DashboardCard02A from './DashboardCard02A';
import DashboardCard02B from './DashboardCard02B';

const DashboardCard02 = () => {
  const {visibleTrees, visibleExtent} = useTreeContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visibleExtent && visibleTrees.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [visibleTrees, visibleExtent]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (!visibleExtent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Visible extent is null.</p>
      </div>
    );
  }

  if (visibleTrees.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No trees within the visible extent.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-[55vh] relative overflow-hidden">
      <div className="flex h-full">
        <div className="flex-1 overflow-auto">
          <DashboardCard02A data={{trees: visibleTrees}} />
        </div>
        <div className="border-l border-slate-300 mx-2" />
        <div className="flex-1 overflow-auto">
          <DashboardCard02B data={{trees: visibleTrees}} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard02;
