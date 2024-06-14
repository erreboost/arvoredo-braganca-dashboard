import React, { useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import { API_ENDPOINT, API_BASE_URL } from "../config/config";
import { Tree } from "../types/interfaces";

interface EsriMapProps {
  apiKey: string;
  style?: React.CSSProperties;
}

const EsriMap: React.FC<EsriMapProps> = ({ apiKey, style }) => {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log("Trees retrieved from endpoint:", data.trees);
        // Base URL to image URLs
        const treesWithFullImageURLs = data.trees.map((tree: Tree) => ({
          ...tree,
          Fotos: tree.Fotos.map((photo) => `${API_BASE_URL}/${photo}`),
        }));
        setTrees(treesWithFullImageURLs);
      })
      .catch((error) => console.error("Error fetching tree data:", error));
  }, []);

  useEffect(() => {
    let view: any = null;

    const handleResize = () => {
      if (view && view.resize) {
        view.resize();
      }
    };

    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Extent",
        "esri/geometry/Point",
        "esri/PopupTemplate",
        "esri/widgets/Popup",
      ],
      { css: true }
    )
      .then(
        ([
          Map,
          MapView,
          Graphic,
          GraphicsLayer,
          SimpleMarkerSymbol,
          Extent,
          Point,
          PopupTemplate,
          Popup,
        ]) => {
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

          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          let xmin = Infinity,
            ymin = Infinity,
            xmax = -Infinity,
            ymax = -Infinity;

          trees.forEach((tree) => {
            const x = parseFloat(tree.POINT_X.replace(",", "."));
            const y = parseFloat(tree.POINT_Y.replace(",", "."));

            if (!isNaN(x) && !isNaN(y)) {
              const point = new Point({
                x,
                y,
                spatialReference: { wkid: 102100 },
              });

              const graphic = new Graphic({
                geometry: point,
                attributes: tree,
                symbol: new SimpleMarkerSymbol({
                  color: [228, 45, 3, 0.5],
                  outline: {
                    color: [17, 78, 1, 0.2],
                    width: 1,
                  },
                  size: 8,
                }),
              });

              graphic.popupTemplate = new PopupTemplate({
                title: "{Nomecomum}",
                content: (feature) => {
                  const attributes = feature.graphic.attributes as Tree;
                  const photos = attributes.Fotos.map((photo, index) => {
                    return `<img src="${photo}" alt="Photo ${
                      index + 1
                    }" class="max-w-full rounded-lg mb-2" />`;
                  }).join("");

                  return `
                    <div class="p-2">
                      <table class="table-auto w-full h-full text-sm text-left text-gray-700 ">
                        <tbody>
                          <tr class="border-b border-gray-600">
                            <td class="font-medium border-b border-gray-600 py-2">Espécie</td>
                            <td class="py-2">${attributes.Especie}</td>
                          </tr>
                          <tr class="border-b border-gray-600">
                            <td class="font-medium border-b border-gray-600 py-2">Nome</td>
                            <td class="py-2">${attributes.Nomecomum}</td>
                          </tr>
                          <tr class="border-b border-gray-600">
                            <td class="font-medium border-b border-gray-600 py-2">Estado</td>
                            <td class="py-2">${attributes.Estado_fit}</td>
                          </tr>
                          <tr class="border-b border-gray-600">
                            <td class="font-medium border-b border-gray-600 py-2">Altura (m)</td>
                            <td class="py-2">${attributes.Altura_v2}</td>
                          </tr>
                          <tr class="border-b border-gray-600">
                            <td class="font-medium border-b border-gray-600 py-2">DAP (cm)</td>
                            <td class="py-2">${attributes.DAP_v2}</td>
                          </tr>
                         <tr class="border-b border-gray-600">
                            <td class="font-medium border-b border-gray-600 py-2">Idade (anos)</td>
                            <td class="py-2">${attributes.idade_apro_v2}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="mt-4">
                        <h4 class="font-semibold mb-2">Fotos:</h4>
                        <div class="flex flex-wrap">
                          ${photos}
                        </div>
                      </div>
                    </div>
                  `;
                },
              });

              graphicsLayer.add(graphic);

              // Update the extent boundaries
              if (point.x < xmin) xmin = point.x;
              if (point.x > xmax) xmax = point.x;
              if (point.y < ymin) ymin = point.y;
              if (point.y > ymax) ymax = point.y;
            }
          });

          if (trees.length > 0) {
            const extent = new Extent({
              xmin,
              ymin,
              xmax,
              ymax,
              spatialReference: { wkid: 102100 },
            });
            view.goTo(extent);
          }

          // Popup for the view
          view.popup = new Popup({
            autoOpenEnabled: false,
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: false,
              breakpoint: false,
            },
            content: "<div class='custom-popup'></div>",
          });

          view.on("click", (event) => {
            view.hitTest(event).then((response) => {
              if (response.results.length > 0) {
                const graphic = response.results[0].graphic;
                if (graphic && graphic.popupTemplate) {
                  view.popup.open({
                    features: [graphic],
                    location: event.mapPoint,
                  });
                }
              }
            });
          });

          window.addEventListener("resize", handleResize);

          return () => {
            window.removeEventListener("resize", handleResize);

            if (view) {
              view.container = null;
            }
          };
        }
      )
      .catch((err) => console.error("Failed to load ArcGIS API", err));

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [apiKey, trees]);

  return (
    <div
      id="mapViewDiv"
      className="h-full md:h-screen w-full md:w-full relative"
      style={{ ...style, maxHeight: "65vh" }}
    />
  );
};

export default EsriMap;
