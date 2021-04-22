import { useEffect, useState } from 'react';
import  styles from './App.module.scss';
import places from './constants';
import { findPlace } from './services/places';
import cocktailIcon from './cocktail.svg'
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from "mapbox-gl";
import Sidebar from './components/Sidebar';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function App() {
  const [placeList, setPlaceList] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [mapViewport, setMapViewport] = useState({
    height: '100vh',
    width: '100wh',
    longitude: -58.3816,
    latitude: -34.6037,
    zoom: 11,
  });
  const handleClose = () => setSelectedPlace({});
  useEffect(() => {
    Promise.all(places.map(findPlace)).then(results => setPlaceList(results.map(place => place.data.result)))
  }, []);
  return (
    <div>
      <Sidebar place={selectedPlace} close={handleClose} />
      <ReactMapGL
        {...mapViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPS_API_KEY}
        mapStyle='mapbox://styles/mapbox/dark-v10'
        onViewportChange={setMapViewport}
      >
        {placeList.map((place) => (
          <Marker
            offsetTop={-48}
            offsetLeft={-24}
            latitude={place.geometry.location.lat}
            longitude={place.geometry.location.lng}
          >
            <button className={styles.marker} onClick={() => setSelectedPlace(place)}>
              <img
                width='20'
                src={cocktailIcon}
              />
              {mapViewport.zoom > 14 && <span className={styles.barName}>{place.name}</span>}
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
