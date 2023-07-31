import React from "react";
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import { shopsData } from "../../data/shopsData";
import styles from './ShopMap.module.scss'
import 'leaflet/dist/leaflet.css';


const ShopMap = ({ selectedShop, setSelectedShop }) => {
   const position = [51.100498, 71.406595]
   return (
      <MapContainer center={position} zoom={13} style={{ width: '100vw', height: '80vh', }}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {shopsData.map(shop => (
            <Polygon
               key={shop.id}
               positions={[[shop.lat, shop.lng], [shop.lat + 0.003, shop.lng], [shop.lat, shop.lng + 0.003]]}
               eventHandlers={{
                  click: () => { setSelectedShop(shop) },
               }}
            >
               <Popup>
                  <div>
                     <h3>{shop.name}</h3>
                     <p>{shop.address}</p>
                     <p>{shop.contacts}</p>
                     <p>{shop.description}</p>
                     <div className={styles.rootImage} >
                        {shop.photos.map((photo, index) => (
                           <img key={index} src={photo} alt={`Photo ${index + 1}`} />
                        ))}
                     </div>
                  </div>
               </Popup>
            </Polygon>
         ))}
      </MapContainer>
   );
};

export default ShopMap;