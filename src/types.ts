export interface MapLocation {
  lat: number;
  lon: number;
}

export interface Stop {
  name: string;
  location: MapLocation;
}
