import { deleteAdMarkerGroup, setMarkers } from "./map.js";
import { getData } from "./server.js";
import { FILTER_PRICE, FILTER_GUESTS, FILTER_DEFAULT_VALUE, debounce } from "./util.js";

const filter = document.querySelector('.map__filters');
const filterType = filter.querySelector('#housing-type');
const filterPrice = filter.querySelector('#housing-price');
const filterRooms = filter.querySelector('#housing-rooms');
const filterGuests = filter.querySelector('#housing-guests');
const filterFeatures = filter.querySelectorAll('.map__checkbox');


function checkFilterType(dataItem) {
  const value = filterType.value;

  return value === dataItem.offer.type || value === FILTER_DEFAULT_VALUE;
}

function checkFilterPrice(dataItem) {
  const value = filterPrice.value;

  if (value === FILTER_DEFAULT_VALUE) {
    return true;
  }

  if (dataItem.offer.price >= FILTER_PRICE[value].min && dataItem.offer.price < FILTER_PRICE[value].max) {
    return true;
  }
}

function checkFilterRooms(dataItem) {
  const value = filterRooms.value;

  return +value === dataItem.offer.rooms || value === FILTER_DEFAULT_VALUE;
}

function checkFilterGuests(dataItem) {
  const value = filterGuests.value;

  if (value === FILTER_DEFAULT_VALUE) {
    return true;
  }

  if (dataItem.offer.guests >= FILTER_GUESTS[value].min && dataItem.offer.guests <= FILTER_GUESTS[value].max) {
    return true;
  }
}

function checkFilterFeatures(dataItem) {
  const offerFeatures = dataItem.offer.features;
  const checkedValues = [];

  filterFeatures.forEach((feature) => {
    if (feature.checked) {
      checkedValues.push(feature.value);
    }
  })

  if (!checkedValues) {
    return true;
  }

  if (!offerFeatures) {
    return false;
  }

  return checkedValues.every((value) => offerFeatures.includes(value));
}

function renderFiltredOffers() {
  function filterOffers(data) {
    for (let i = 0; i < data.length; i++) {
      if (
        checkFilterType(data[i]) &&
        checkFilterPrice(data[i]) &&
        checkFilterRooms(data[i]) &&
        checkFilterGuests(data[i]) &&
        checkFilterFeatures(data[i])) {
          setMarkers(data[i]);
      }
    }
  }

  deleteAdMarkerGroup();
  getData(debounce(filterOffers));
}

filter.addEventListener('change', renderFiltredOffers)
