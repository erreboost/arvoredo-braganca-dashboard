import React, { useEffect, useState } from "react";
import { loadModules } from "esri-loader";
import { API_ENDPOINT } from "../config/config";

interface Tree {
  _id: string;
  Data: string;
  Dicofre: string;
  Localizacao: string;
  Especie: string;
  Nomecomum: string;
  Estado_fit: string;
  Esdado_cal: string;
  Ava_Risco: string;
  Propo_Inte: string;
  Obser: string;
  GlobalID: string;
  raz_calssifica: string;
  agen_bioticos: string;
  Orgaos_afetados: string;
  Grau_de_desfolha: string;
  Sintomas_sinais_desfolhadores: string;
  Grau_de_descoloracao_da_copa: string;
  Deformacao_dos_tecidos: string;
  Alteracao_da_estrutura: string;
  Supressao_parcial_dos_orgaos: string;
  Orificios_perfuracoes: string;
  galerias: string;
  necroses: string;
  serrim: string;
  exsudacao: string;
  novelos_fibra: string;
  Forma_caldeira: string;
  Altura_v2: number;
  capv2: string;
  DAP_v2: number;
  idade_apro_v2: string;
  Especie_Val: number;
  Outro_Nome_Comum: string;
  Outra_Especie: string;
  Codigo: string;
  Outra_Tip_Int: string;
  grupos: string;
  POINT_X: string;
  POINT_Y: string;
  POINT_Z: string;
  Fotos: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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
          Fotos: tree.Fotos.map(
            (photo) => `https://app.grupoerre.pt:5258/${photo}`
          ),
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

                  let content = `
                    <div class="p-4">
                      <table class="table-auto w-full text-sm text-left text-gray-700">
                        <tbody>
                          <tr>
                            <td class="font-medium">Espécie</td>
                            <td>${attributes.Especie}</td>
                          </tr>
                          <tr>
                            <td class="font-medium">Nome</td>
                            <td>${attributes.Nomecomum}</td>
                          </tr>
                          <tr>
                            <td class="font-medium">Estado</td>
                            <td>${attributes.Estado_fit}</td>
                          </tr>
                          <tr>
                            <td class="font-medium">Altura (m)</td>
                            <td>${attributes.Altura_v2}</td>
                          </tr>
                          <tr>
                            <td class="font-medium">DAP (cm)</td>
                            <td>${attributes.DAP_v2}</td>
                          </tr>
                          <tr>
                            <td class="font-medium">Idade (anos)</td>
                            <td>${attributes.idade_apro_v2}</td>
                          </tr>
                        </tbody>
                      </table>
                      <br>
                      <h4 class="font-semibold mb-2">Fotos:</h4>
                      ${photos}
                    </div>
                  `;

                  return content;
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
