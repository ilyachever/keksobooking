import { DEFAULT_CITY, DEFAULT_ZOOM, DEFAULT_ROUND, ICON_MAIN, ICON_DEFAULT } from "./util.js";
import { filterDisable, formDisable, formEnable } from "./state.js"
import { setAddressCoordinates } from "./form-data.js";
import { getData } from "./server.js";
import renderCard from "./card.js";

const mapContainer = document.querySelector('#map-canvas');

// Настройки OpenStreetMaps 
const openStreetMap = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  settings: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

// Настройки карты
const map = L.map(mapContainer);

// Добавление карты
function addMap() {
  map.on('load', formEnable, setAddressCoordinates(DEFAULT_CITY)).setView(DEFAULT_CITY, DEFAULT_ZOOM);

  // openStreetMap
  L.tileLayer(openStreetMap.url, openStreetMap.settings).addTo(map);
}

function initMap() {
  formDisable();
  filterDisable();
  addMap();
}

// Блокировка формы и фильтров, запуск карты
initMap();

// Главная метка
const mainMarker = L.marker(
  DEFAULT_CITY,
  {
    draggable: true,
    icon: ICON_MAIN,
  },
)

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

mainMarker.addTo(map).on('moveend', onCoordinatesChange);

// Метки объявлений
const adMarkerGroup = L.layerGroup().addTo(map);

function setMarkers(dataItem) {
  const defaultMarker = L.marker(
    dataItem.location,
    {
      draggable: false,
      icon: ICON_DEFAULT,
    }
  )

  defaultMarker.addTo(adMarkerGroup).bindPopup(renderCard(dataItem), {keepInView: true})
}

function deleteAdMarkerGroup() {
  adMarkerGroup.clearLayers();
}

function renderOffers() {
  function render(data) {
    for (let i = 0; i < data.length; i++) {
      setMarkers(data[i]);
    }
  }

  getData(render);
}

// Отрисовка меток
renderOffers();

// Сброс карты
function resetMap() {
  map.setView(DEFAULT_CITY, DEFAULT_ZOOM);
  mainMarker.setLatLng(DEFAULT_CITY);
  deleteAdMarkerGroup();
}

export {
  setMarkers,
  renderOffers,
  resetMap,
  deleteAdMarkerGroup,
}
