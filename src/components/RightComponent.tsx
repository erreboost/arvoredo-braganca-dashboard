import React, { lazy, Suspense } from "react";
import Loading from "./Loading";

// Lazy load EsriMap
const EsriMap = lazy(() => import("./EsriMap"));

const RightComponent = () => {
  const apiKey =
    "AAPK64cf373759a54865a9b553b5c82a36e12DR_FtikWVtRu-ClaIFkgrexK8Wc8HYxf2E5N-2slqZGEERxgga6uAqiUUTtR1bt";

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex-1 mx-2 md:max-h-[85vh] md:w-full overflow-hidden">
        {/* Ensure that EsriMap or other elements have higher z-index */}
        <EsriMap apiKey={apiKey} style={{ zIndex: 0 }} />
      </div>
    </Suspense>
  );
};

export default RightComponent;
