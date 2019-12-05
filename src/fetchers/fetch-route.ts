import { MapLocation } from "../types";

interface Waypoint {
  name: string;
  distance: number;
  location: MapLocation;
  waypoint_index: number;
  trips_index: 0;
}

interface Leg {
  summary: string;
  weight: number;
  duration: number;
  steps: any[];
  distance: number;
}

interface Geometry {
  coordinates: number[][];
  type: string;
}

interface Trip {
  geometry: Geometry;
  legs: Leg[];
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
}

interface Route {
  code: string;
  waypoints: Waypoint[];
  routes: Trip[];
}

const api =
  "pk.eyJ1IjoiaGVhcnRpc3RpemlvIiwiYSI6ImNrM3JlbGJrMTA5NmozY3BzaHM4ZHNuNXMifQ.e0ggjo3DcGdZJZYKOaZbGA";

const assembleQueryUrl = (stops: string[]) =>
  `https://api.mapbox.com/directions/v5/mapbox/driving/${stops.join(
    "%3B"
  )}.json?&geometries=geojson&access_token=${api}`;

export const fetchRoute = async (stops: string[]): Promise<Route> =>
  (await fetch(assembleQueryUrl(stops))).json();
