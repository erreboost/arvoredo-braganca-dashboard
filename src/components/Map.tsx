import EsriMap from "./EsriMap";
import React from "react";
// import dotenv from "dotenv";
// dotenv.config();
const App = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_ESRI_API_KEY as string;

  return (
    <div>
      <EsriMap apiKey={apiKey} />
    </div>
  );
};

export default App;
