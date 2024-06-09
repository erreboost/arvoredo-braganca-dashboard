import React from "react";
import EsriMap from "./EsriMap";

const App = () => {
  const apiKey =
    "AAPK64cf373759a54865a9b553b5c82a36e12DR_FtikWVtRu-ClaIFkgrexK8Wc8HYxf2E5N-2slqZGEERxgga6uAqiUUTtR1bt";

  return (
    <div>
      <EsriMap apiKey={apiKey} />
    </div>
  );
};

export default App;
