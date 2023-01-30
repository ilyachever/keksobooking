import { contentDisable, contentEnable } from "./state.js"
import { setAddressCoordinates } from "./form-data.js";
import renderCard from "./card.js";

const mapContainer = document.querySelector('#map-canvas');

const DEFAULT_CITY = {
  lat: 35.69034,
  lng: 139.75175,
};

const DEFAULT_ZOOM = 10;

const ICON_MAIN = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const ICON_DEFAULT = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// ========== Настройки OpenStreetMaps  ==========

const openStreetMap = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  settings: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

// ========== Настройки карты ==========
const map = L.map(mapContainer);

function addMap() {
  map
    .on('load', contentEnable, setAddressCoordinates(DEFAULT_CITY))
    .setView(DEFAULT_CITY, DEFAULT_ZOOM);

  // openStreetMap
  L.tileLayer(openStreetMap.url, openStreetMap.settings).addTo(map);

  // Главная метка
  const mainMarker = L.marker(
    DEFAULT_CITY,
    {
      draggable: true,
      icon: ICON_MAIN,
    },
  ).addTo(map);
  mainMarker
    .addTo(map)
    .on('moveend', onCoordinatesChange);
}

addMap()

// ========== Настройки отображения меток ==========

const defaultMarkerGroup = L.layerGroup().addTo(map)

function setMarkers(data) {
  const defaultMarker = L.marker(
    data.location,
    {
      draggable: false,
      icon: ICON_DEFAULT,
    }
  )

  defaultMarker
    .addTo(defaultMarkerGroup)
    .bindPopup(renderCard(data), {
      keepInView: true,
    })
}

// ========== Дополнительные функции ==========

function onCoordinatesChange(e) {
  let { lat, lng } = e.target.getLatLng();
  lat = +lat.toFixed(5);
  lng = +lng.toFixed(5);

  const currentCoordinates = {
    lat,
    lng
  };

  setAddressCoordinates(currentCoordinates);
}
