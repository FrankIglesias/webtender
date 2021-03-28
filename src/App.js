import { useEffect } from 'react';
import './App.scss';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import places from  './constants';
import { findPlace } from './services/places';

function markerBuilder(map, place) {
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage =
    'url(https://www.pinclipart.com/picdir/middle/205-2057349_cocktail-icon-free-download-png-cocktail-word-svg.png)';
  new mapboxgl.Marker(el)
    .setLngLat([place.geometry.location.lng, place.geometry.location.lat])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>${place.name}</h3>`))
    .addTo(map);
}

function App() {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPS_API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-58.3816, -34.6037],
      zoom: 11,
    });
    Promise.all(places.map(findPlace)).then(places => {
      places.map((place) => markerBuilder(map,  place.data.candidates[0]));
    });
  }, []);
  return (
    <div className='App'>
      <div className='map' id='map'></div>
    </div>
  );
}

export default App;
