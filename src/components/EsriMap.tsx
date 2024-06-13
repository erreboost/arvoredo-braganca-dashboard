import React, { useEffect } from "react";
import { loadModules } from "esri-loader";

interface EsriMapProps {
  apiKey: string;
  style?: React.CSSProperties;
}

const EsriMap: React.FC<EsriMapProps> = ({ apiKey, style }) => {
  useEffect(() => {
    let view: any = null; // Use 'any' type for view

    const handleResize = () => {
      if (view && view.resize) {
        view.resize();
      }
    };

    loadModules(["esri/Map", "esri/views/MapView", "esri/layers/CSVLayer"], {
      css: true,
    })
      .then(([Map, MapView, CSVLayer]) => {
        const map = new Map({
          basemap: "satellite",
        });

        view = new MapView({
          container: "mapViewDiv",
          map,
          zoom: 12,
        });

        console.log("Map initialized:", map);
        console.log("View initialized:", view);

        const csvLayer = new CSVLayer({
          url: "/arvores_0.csv",
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-marker",
              color: [228, 445, 3, 0.5],
              outline: {
                color: [17, 78, 1, 0.2],
                width: 1,
              },
              size: 8,
            },
          },
        });

        map.add(csvLayer);

        csvLayer.when(() => {
          const layerExtent = csvLayer.fullExtent;
          if (view) {
            view.goTo(layerExtent.center);

            view.on("zoom", (event: any) => {
              console.log("Zoom level changed:", event.zoom);
            });

            window.addEventListener("resize", handleResize);

            return () => {
              window.removeEventListener("resize", handleResize);

              if (view) {
                view.container = null;
              }
            };
          }
        });
      })
      .catch((err) => console.error("Failed to load ArcGIS API", err));

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [apiKey]); // Ensure useEffect dependency on apiKey

  return (
    <div
      id="mapViewDiv"
      className="h-full md:h-screen w-full md:w-full relative"
      style={{ ...style, maxHeight: "65vh" }}
    />
  );
};

export default EsriMap;
