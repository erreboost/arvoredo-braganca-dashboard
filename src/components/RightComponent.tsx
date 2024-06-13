import { lazy, Suspense } from "react";
import Loading from "./Loading";
import React from "react";
// import dotenv from "dotenv";
// dotenv.config();

// Lazy load EsriMap
const EsriMap = lazy(() => import("./EsriMap"));

const RightComponent = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  return (
    <Suspense fallback={<Loading />}>
      <div
        className="flex-1 mx-2 md:max-h-[85vh] md:w-full overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Ensure that EsriMap or other elements have higher z-index */}
        <EsriMap apiKey={apiKey} />
      </div>
    </Suspense>
  );
};

export default RightComponent;
