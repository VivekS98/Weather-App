import { MapPosition } from "@/utils/common.types";
import { FC, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

// This component is used in switching the locations on Shift + Click on the map
const MapEventHandeler: FC<MapPosition> = ({ position, setPosition }) => {
  const MAP = useMap();

  useEffect(() => {
    map.flyTo(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const map = useMapEvents({
    click: (e) => {
      if (e.originalEvent.shiftKey) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });
  return null;
};

export default MapEventHandeler;
