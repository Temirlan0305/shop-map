import React, { useEffect, useRef, useState } from "react";
import { loadModules } from 'esri-loader';
import { shopsData } from "../../data/shopsData";
import styles from "./Arcgis.module.scss"


const ArcgisMap = ({ setSelectedShop }) => {
   const blockRef = useRef(null);
   const [popup, setPopup] = useState(null);
   const [clickedPolygon, setClickedPolygon] = useState(null);
   useEffect(() => {
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/layers/GraphicsLayer', 'esri/widgets/Popup'])
         .then(([Map, MapView, Graphic, GraphicsLayer, Popup]) => {
            const map = new Map({
               basemap: 'topo-vector',
            });

            const view = new MapView({
               container: blockRef.current,
               map: map,
               center: [71.415324, 51.106914],
               zoom: 14,
            });
            const graphicsLayer = new GraphicsLayer();

            map.add(graphicsLayer);

            shopsData.forEach((shop) => {
               const polygonGeometry = {
                  type: 'polygon',
                  rings: [
                     [shop.lng - 0.001, shop.lat - 0.001],
                     [shop.lng - 0.001, shop.lat + 0.001],
                     [shop.lng + 0.001, shop.lat + 0.001],
                     [shop.lng + 0.001, shop.lat - 0.001],
                     // Ваши координаты полигона здесь, например, shop.lat, shop.lng и т.д.
                  ],
               };
               const polygonGraphic = new Graphic({
                  geometry: polygonGeometry,
                  symbol: {
                     type: 'simple-fill',
                     color: [255, 0, 0, 0.5],
                     outline: {
                        color: [255, 0, 0, 1],
                        width: 2,
                     },
                  },
                  attributes: {
                     Name: `${shop.name}`,
                     Description: `
                     <div>${shop.address}</div>
                     <div>${shop.contacts}</div>
                     <div>${shop.description}</div>
                     <div>
                        <h3>Координаты</h3>
                        <span style='margin-bottom:10px;'>${shop.lat}, ${shop.lng}</span>
                        <div>
                        ${shop.photos.map((img) => `<img src='${img}' style="width: 100px;height:100px;object-fit:cover;"></img>`)
                        }
                        </div>
                     </div>
                     `,
                     object: { id: shop.id, name: shop.name, address: shop.address, contacts: shop.contacts, lat: shop.lat, lng: shop.lng }
                  },
                  popupTemplate: {
                     title: "{Name}",
                     content: "{Description}",
                  }
               });
               graphicsLayer.add(polygonGraphic);
            });
            view.on('click', (event) => {
               view.hitTest(event).then((response) => {
                  const clickedGraphics = response.results.filter((result) => {
                     return result.graphic.layer === graphicsLayer;
                  });
                  if (clickedGraphics.length > 0) {
                     const clickedPolygon = clickedGraphics[0].graphic;
                     const attributes = clickedPolygon.attributes;
                     console.log("Clicked Polygon Attributes:", attributes);
                     setSelectedShop(attributes.object); // Передача выбранного магазина в родительский компонент
                  }
               });
            });

         })
         .catch((error) => console.error('Ошибка загрузки модулей ArcGIS', error));
   }, []);

   return (
      <>
         <div ref={blockRef} id="mapContainer" style={{ height: '70vh', width: '100vw' }} />
      </>
   );
};


export default ArcgisMap;