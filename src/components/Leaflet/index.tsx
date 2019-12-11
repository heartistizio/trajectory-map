import React from "react";
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "./Leaflet.scss";
import { LatLngTuple, Icon } from "leaflet";
import { Stop } from "../../types";

export interface LeafletProps {
  zoom?: number;
  position: LatLngTuple;
  routes?: LatLngTuple[];
  locations?: Stop[];
}

const hotelIcon = new Icon({
  iconUrl: "./stop.svg",
  iconRetinaUrl: "./stop.svg",
  iconSize: [20, 20]
});

const stopIcon = new Icon({
  iconUrl: "./dot.svg",
  iconRetinaUrl: "./dot.svg",
  iconSize: [20, 20]
});

const Leaflet: React.FC<LeafletProps> = ({
  zoom,
  routes,
  position = [50.049683, 19.944544],
  locations
}: LeafletProps) => (
  <Map center={position} zoom={zoom} maxZoom={20}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locations &&
      locations.map(({ name, location: { lat, lon } }, index) =>
        index === 0 || index === locations.length ? (
          <Marker
            key={`marker-${name}-${index}`}
            position={[lat, lon]}
            name={name}
            icon={hotelIcon}
          >
            <Popup>{name}</Popup>
          </Marker>
        ) : (
          <Marker
            key={`marker-${name}-${index}`}
            position={[lat, lon]}
            name={name}
            icon={stopIcon}
          >
            <Popup>{name}</Popup>
          </Marker>
        )
      )}
    {routes && <Polyline positions={routes} color="blue" weight={4} />}
  </Map>
);

export default Leaflet;
