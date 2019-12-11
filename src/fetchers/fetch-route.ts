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
  trips: Trip[];
}

const api =
  "pk.eyJ1IjoiaGVhcnRpc3RpemlvIiwiYSI6ImNrM3JlbGJrMTA5NmozY3BzaHM4ZHNuNXMifQ.e0ggjo3DcGdZJZYKOaZbGA";

const assembleQueryUrl = (stops: string[], type: string) =>
  `https://api.mapbox.com/optimized-trips/v1/mapbox/${type}/${stops.join(
    ";"
  )}?overview=full&steps=true&geometries=geojson&source=first&access_token=${api}`;

const cs = (stops: string[], type: string) =>
  `https://api.mapbox.com/directions/v5/mapbox/${type}/${stops.join(
    "%3B"
  )}.json?&geometries=geojson&access_token=${api}`;

export const fetchRoute = async (
  stops: string[],
  type: string
): Promise<Route> => (await fetch(assembleQueryUrl(stops, type))).json();
