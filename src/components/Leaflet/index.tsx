import React from "react";
import { Map, Marker, TileLayer, Polyline } from "react-leaflet";
import "./Leaflet.scss";
import { LatLngTuple, Icon } from "leaflet";
import { Stop } from "../../types";

export interface LeafletProps {
  zoom?: number;
  position: LatLngTuple;
  routes?: LatLngTuple[];
  locations?: Stop[];
}

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
  <Map center={position} zoom={zoom}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locations &&
      locations.map(({ name, location: { lat, lon } }, index) => (
        <Marker
          className={"marker"}
          key={`marker-${name}-${index}`}
          position={[lat, lon]}
        />
      ))}
    {console.log(routes)}
    {routes && <Polyline positions={routes} color="blue" weight={4} />}
  </Map>
);

export default Leaflet;
