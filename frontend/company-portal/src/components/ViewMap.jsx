import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { PrimaryIcon, SecondaryIcon } from "./CustomLeafletIcons";
import { POLYLINE_COLORS } from "../constants/global";

// Component to adjust map view based on markers
const ChangeView = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((location) => [
          parseFloat(location.latitude),
          parseFloat(location.longitude),
        ])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const ViewMap = ({ locations, mainLatitude, mainLongitude }) => {
  const checkIsMain = (currLatitude, currLongitude) => {
    if (currLatitude === mainLatitude && currLongitude === mainLongitude) {
      return true;
    }
    return false;
  };

  const lines = locations.flatMap((loc1, i) =>
    locations.slice(i + 1).map((loc2) => [
      [loc1.latitude, loc1.longitude],
      [loc2.latitude, loc2.longitude],
    ])
  );

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "600px", width: "100%" }}
    >
      <ChangeView locations={locations} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.location_id}
          position={[
            parseFloat(location?.latitude),
            parseFloat(location?.longitude),
          ]}
          icon={
            checkIsMain(
              parseFloat(location?.latitude),
              parseFloat(location?.longitude)
            )
              ? PrimaryIcon
              : SecondaryIcon
          }
        >
          <Popup>
            <div>
              <h3>{location?.name}</h3>
              <p>{location?.address}</p>
            </div>
          </Popup>
          {lines.map((line, index) => (
            <Polyline
              key={index}
              positions={line}
              pathOptions={{ color: POLYLINE_COLORS[index] }}
            />
          ))}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ViewMap;