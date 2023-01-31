import { contentEnable } from "./state.js"
import { setAddressCoordinates } from "./form-data.js";
import renderCard from "./card.js";

const mapContainer = document.querySelector('#map-canvas');

// Настройки по умолчанию

const DEFAULT_CITY = {
  lat: 35.69034,
  lng: 139.75175,
};

const DEFAULT_ZOOM = 10;

const DEFAULT_ROUND = 5;

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

// Добавление карты

function addMap() {
  map
    .on('load', contentEnable, setAddressCoordinates(DEFAULT_CITY))
    .setView(DEFAULT_CITY, DEFAULT_ZOOM);

  // openStreetMap
  L.tileLayer(openStreetMap.url, openStreetMap.settings).addTo(map);
}

// ========== Настройки отображения меток ==========

// Главная метка

const mainMarker = L.marker(
  DEFAULT_CITY,
  {
    draggable: true,
    icon: ICON_MAIN,
  },
)

mainMarker
  .addTo(map)
  .on('moveend', onCoordinatesChange);

// Метки объявлений

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

function deleteMarkerGroup(markerGroup) {
  markerGroup.clearLayers();
}

// ========== Настройки карты ==========

// Сброс карты

function resetMap() {
  map.setView(DEFAULT_CITY, DEFAULT_ZOOM);
  mainMarker.setLatLng(DEFAULT_CITY);
  document.querySelector('#address').placeholder = `${DEFAULT_CITY.lat}, ${DEFAULT_CITY.lng}`;
  deleteMarkerGroup(defaultMarkerGroup);
}

// ========== Дополнительные функции ==========

function onCoordinatesChange(e) {
  let { lat, lng } = e.target.getLatLng();
  lat = +lat.toFixed(DEFAULT_ROUND);
  lng = +lng.toFixed(DEFAULT_ROUND);

  const currentCoordinates = {
    lat,
    lng
  };

  setAddressCoordinates(currentCoordinates);
}

export { addMap, setMarkers, resetMap }
