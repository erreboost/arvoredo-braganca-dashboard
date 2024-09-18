import React, {Suspense} from 'react';
import EsriMap from './EsriMap';
import Loading from './Loading';

const RightComponent = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  const handleZoomChange = (zoom: number) => {
    // console.log('Zoom level changed:', zoom);
  };

  return (
    <div className="flex-1 mx-2 md:max-h-[65vh] md:w-full overflow-hidden">
      <Suspense fallback={<Loading />}>
        <EsriMap apiKey={apiKey} onZoomChange={handleZoomChange} />
      </Suspense>
    </div>
  );
};

export default RightComponent;