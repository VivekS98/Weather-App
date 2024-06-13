import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapEventHandeler from "./MapEventHandler";
import { MapPosition } from "@/utils/common.types";

interface Props extends MapPosition {
  className?: string;
  zoom: number;
}

const MarkerIcon = new L.Icon({
  iconUrl: "/locationMarker.svg",
  iconSize: [40, 40],
});

// Adding a custom marker icon as the default one wasn't showing up.
L.Marker.prototype.options.icon = MarkerIcon;

const MapDisplay: FC<Props> = ({ className, position, setPosition, zoom }) => {
  return (
    <div className="w-full flex justify-center -z-0">
      <MapContainer
        className={`w-full h-[50vh] rounded-xl ${className}`}
        center={[position?.lat, position?.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <MapEventHandeler position={position} setPosition={setPosition} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapDisplay;
