//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {loadModules} from 'esri-loader';
import {API_ENDPOINT, API_BASE_URL} from '../config/config';
import {Tree} from '../types/interfaces';
import {useTreeContext} from '../utils/TreeProvider';

interface EsriMapProps {
  apiKey: string;
  style?: React.CSSProperties;
  onZoomChange: (zoom: number) => void;
}

const EsriMap: React.FC<EsriMapProps> = ({apiKey, style, onZoomChange}) => {
  const {trees, setVisibleExtent, setVisibleTrees, treesCached} = useTreeContext();
  const [zoomLevel, setZoomLevel] = useState<number>(12);

  function lonToWebMercatorX(lon) {
    return lon * 20037508.34 / 180;
  }
  
  function latToWebMercatorY(lat) {
    const rad = lat * Math.PI / 180; 
    return Math.log(Math.tan((Math.PI / 4) + (rad / 2))) * 20037508.34 / Math.PI;
  }

  useEffect(() => {
    fetchTreeData();
  }, []);

  const fetchTreeData = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error('Failed to fetch tree data');
      }
      const data = await response.json();
      const treesWithFullImageURLs = data.trees.map((tree: Tree) => ({
        ...tree,
        Fotos: tree.Fotos.map((photo) => `${API_BASE_URL}/${photo}`),
      }));
      setVisibleTrees(treesWithFullImageURLs);
    } catch (error) {
      console.error('Error fetching tree data:', error);
    }
  };

  useEffect(() => {
    let view: any = null;

    const handleResize = () => {
      if (view && view.resize) {
        view.resize();
      }
    };

    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic',
      'esri/layers/GraphicsLayer',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/geometry/Extent',
      'esri/geometry/Point',
      'esri/PopupTemplate',
      'esri/widgets/Popup',
    ])
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
            basemap: 'satellite',
            // spatialReference: { wkid: 4326 },
          });

          view = new MapView({
            container: 'mapViewDiv',
            map,
            zoom: zoomLevel,
            // spatialReference: { wkid: 4326 },    
          });

          // console.log('Maaaaaaap', map)
          // console.log('VIEEEEEEW', view)
          
         
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          let xmin = Infinity,
            ymin = Infinity,
            xmax = -Infinity,
            ymax = -Infinity;

          trees.forEach((tree) => {
            const x = parseFloat(tree.POINT_X_G);
            const y = parseFloat(tree.POINT_Y_G);
            // console.log('Point X',tree.POINT_X_G )
            // console.log('Point Y', tree.POINT_Y_G )

            if (!isNaN(x) && !isNaN(y)) {
              const point = new Point({
                x,
                y,
                // spatialReference: {width: 102100},
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
                title: '{Nomecomum}',
                content: (feature: any) => {
                  const attributes = feature.graphic.attributes as Tree;

                  // Map each photo URL to an <img> tag
                  const photos = attributes.Fotos.map(
                    (photo: string, index: number) => {
                      return `<img src="${photo}" alt="Photo ${
                        index + 1
                      }" class="max-w-full rounded-lg mb-2" />`;
                    }
                  ).join('');

                  // Construct the popup HTML
                  return `
                   <div class="p-4 max-h-96 flex flex-col overflow-visible">
                      <div>
                        <h3 class="text-lg font-semibold mb-2">${attributes.Nomecomum}</h3>
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <p class="text-gray-600 font-medium">Espécie:</p>
                            <p>${attributes.Especie}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">Estado:</p>
                            <p>${attributes.Estado_fit}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">Altura (m):</p>
                            <p>${attributes.Altura_v2}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">DAP (cm):</p>
                            <p>${attributes.DAP_v2}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">Idade (anos):</p>
                            <p>${attributes.idade_apro_v2}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-semibold">Código da Árvore:</p>
                            <p>${attributes.Codigo}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-semibold mb-0">Coordenada X:</p>
                            <p>${attributes.POINT_X_G}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-semibold">Coordenada Y:</p>
                            <p>${attributes.POINT_Y_G}</p>
                          </div>                                        
                        </div>
                      </div>

                      <div class="py-3 flex-grow pb-4">
                        <h4 class="text-lg font-semibold mb-2">Fotos:</h4>
                        <div class="grid grid-cols-2 gap-4">
                          ${photos}
                        </div>
                      </div>
                    </div>
                  `;
                },
              });

              graphicsLayer.add(graphic);

              // Extent boundaries
              if (point.x < xmin) xmin = point.x;
              if (point.x > xmax) xmax = point.x;
              if (point.y < ymin) ymin = point.y;
              if (point.y > ymax) ymax = point.y;
            }
          });

          window.addEventListener('resize', handleResize);

          if (trees && trees.length > 0) {
            const extent = new Extent({
              xmin,
              ymin,
              xmax,
              ymax,
              // spatialReference: {wkid: 4326},
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

            content: (feature: any) => {
              // Your existing content generation logic
              
              const attributes = feature.graphic.attributes as Tree;
              const photos = attributes.Fotos.map(
                (photo: string, index: number) => {
                  return `<img src="${photo}" alt="Photo ${
                    index + 1
                  }" class="max-w-full rounded-lg mb-2" />`;
                }
              ).join('');

              // Construct the popup HTML
              return `
                   <div class="p-4 max-h-96 flex flex-col overflow-visible">
                      <div>
                        <h3 class="text-lg font-semibold mb-2">${attributes.Nomecomum}</h3>
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <p class="text-gray-600 font-medium">Espécie:</p>
                            <p>${attributes.Especie}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">Estado:</p>
                            <p>${attributes.Estado_fit}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">Altura (m):</p>
                            <p>${attributes.Altura_v2}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">DAP (cm):</p>
                            <p>${attributes.DAP_v2}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-medium">Idade (anos):</p>
                            <p>${attributes.idade_apro_v2}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-semibold">Código da Árvore:</p>
                            <p>${attributes.Codigo}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-semibold mb-0">Coordenada X:</p>
                            <p>${attributes.POINT_X_G}</p>
                          </div>
                          <div>
                            <p class="text-gray-600 font-semibold">Coordenada Y:</p>
                            <p>${attributes.POINT_Y_G}</p>
                          </div>                                        
                        </div>
                      </div>

                      <div class="py-3 flex-grow pb-4">
                        <h4 class="text-lg font-semibold mb-2">Fotos:</h4>
                        <div class="grid grid-cols-2 gap-4">
                          ${photos}
                        </div>
                      </div>
                    </div>
                  `;
            },
          });

          view.on('click', (event: any) => {
            view.hitTest(event).then((response: any) => {
              if (response && response.results.length > 0) {
                const graphic = response.results[0].graphic;
                if (graphic && graphic.popupTemplate) {
                  view.popup.open({
                    features: [graphic],
                    location: event.mapPoint,
                  }
                );
                }
              }
            });
          });

          view.watch('extent', (newExtent: any) => {
           
            setVisibleExtent(newExtent);
            if(treesCached) {        
              const visibleTreesFiltered = treesCached.filter((tree: { POINT_X_G: string; POINT_Y_G: string; }) => {
                const x = lonToWebMercatorX(parseFloat(tree.POINT_X_G.replace(',', '.')));
                const y = latToWebMercatorY(parseFloat(tree.POINT_Y_G.replace(',', '.')));
                return (
                  x >= newExtent.xmin &&
                  x <= newExtent.xmax &&
                  y >= newExtent.ymin &&
                  y <= newExtent.ymax
                );
              });
              // console.log('Visible Trees Filtered', visibleTreesFiltered)
              setVisibleTrees(visibleTreesFiltered);
            }
           
          });

          // Zoom level change
          view.watch('zoom', (newZoom: number) => {
            setZoomLevel(newZoom);
            if (onZoomChange) {
              onZoomChange(newZoom);
            }
          });


          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);

            if (view) {
              view.container = null;
            }
          };
        }
      )
      .catch((err) => console.error('Failed to load ArcGIS API', err));
  }, [apiKey, trees, setVisibleExtent, setVisibleTrees, onZoomChange, treesCached]);

  return (
    <div id="mapViewDiv" style={style || {height: '60vh', width: '100%', zIndex: 99999}}></div>
  );
};

export default EsriMap;
