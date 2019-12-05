import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchRoute } from "./fetchers/fetch-route";
import { fetchPath } from "./fetchers/fetch-path";
import Leaflet from "./components/Leaflet";
import "leaflet/dist/leaflet.css";

const App: React.FC = () => {
  const [stops, setStops] = useState();
  const [routes, setRoutes] = useState();
  // haaack
  const [didFetch, setDidFetch] = useState(false);
  const [profile, setProfile] = useState("religious");

  const fetchApi = async () => {
    const paths = await fetchPath(profile);

    const routes = await fetchRoute(
      paths.map(
        path =>
          `${path.location.lon.toFixed(2)}%2C${path.location.lat.toFixed(2)}`
      )
    );

    setStops(paths);

    setRoutes(routes.routes[0].geometry.coordinates.map(([a, b]) => [b, a]));
  };

  useEffect(() => {
    if (!didFetch) {
      fetchApi();
      setDidFetch(true);
    }
  }, [didFetch]);

  const changeProfile = (profile: string) => {
    setProfile(profile);
    fetchApi();
  };

  return (
    <div className="App">
      <button onClick={() => changeProfile("tourist")}>Tourist</button>
      <button onClick={() => changeProfile("religious")}>Religious</button>
      <button onClick={() => changeProfile("food")}>Food fanatic</button>
      <button onClick={() => changeProfile("guest")}>Guest</button>
      <Leaflet
        zoom={11}
        position={stops && [stops[0].location.lat, stops[0].location.lon]}
        routes={routes}
        locations={stops}
      />
    </div>
  );
};

export default App;
