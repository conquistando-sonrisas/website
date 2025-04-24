'use client'


import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

import type { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export default function MapWithMarker({ latitud, longitud, popupMessage }: { latitud: number, longitud: number, popupMessage: string }) {

  return (
    <MapContainer center={[latitud, longitud] as LatLngTuple} zoom={14} scrollWheelZoom={false} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
      <TileLayer
        url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
      />
      <Marker position={[latitud, longitud] as LatLngTuple} title={popupMessage}>
        <Popup>{popupMessage}</Popup>
      </Marker>
    </MapContainer>
  )
}