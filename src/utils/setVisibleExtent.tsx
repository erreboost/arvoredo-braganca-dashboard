import React, {useEffect} from 'react';
import {useVisibleExtentContext} from '../utils/VisibleExtentContext';

const SetVisibleExtent: React.FC = () => {
  const {setVisibleExtent} = useVisibleExtentContext();

  useEffect(() => {
    // default visible extent for testing only
    const extent = {
      xmin: -10,
      xmax: 10,
      ymin: -10,
      ymax: 10,
    };
    setVisibleExtent(extent);
    // console.log('Set visible extent:', extent);
  }, [setVisibleExtent]);

  return null;
};

export default SetVisibleExtent;
