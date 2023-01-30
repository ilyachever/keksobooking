import { getPositiveRandomInteger, getPositiveRandomFloat, getPositiveRandomUniqueInteger, getRandomArrayElement, TYPES } from "./util.js";

const userIdValues = {
  MIN: 1,
  MAX: 10,
}

const userId = getPositiveRandomUniqueInteger(userIdValues.MIN, userIdValues.MAX);

const offerTitles = [
  'Уютное гнездышко для молодоженов',
  'Небольшая лавочка в парке',
  'Чёткая хата',
  'Милое гнездышко для фанатов Анимэ',
  'Маленькая квартирка рядом с парком',
  'Императорский дворец в центре Токио',
  'Милейший чердачок',
  'Хостел «Для друзей»',
  'Стандартная квартира в центре',
  'Тихая квартирка недалеко от метро',
]

const descriptionTitles = [
  "Великолепный таун-хауз в центре Токио",
  "Убойное место",
  "Лучше, чем ничего",
  "Не дороже, чем в Питере",
  "Спасибо, что не в России",
]

const prices = {
  min: 10000,
  max: 100000,
};

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const roomsQuantity = {
  min: 1,
  max: 7,
}

const guestsQuantity = {
  min: 1,
  max: 14,
}

const checkinTime = ['12:00', '13:00', '14:00'];
const checkoutTime = ['12:00', '13:00', '14:00'];

const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const photosList = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
]

const location = {
  MIN_LATITUDE: 35.65000,
  MAX_LATITUDE: 35.70000,
  MIN_LONGITUDE: 139.70000,
  MAX_LONGITUDE: 139.80000,
}

function createAuthorData(index) {
  return {
    avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
  }
}

function createLatitude() {
  return getPositiveRandomFloat(location.MIN_LATITUDE, location.MAX_LATITUDE, 5)
}

function createLongitude() {
  return getPositiveRandomFloat(location.MIN_LONGITUDE, location.MAX_LONGITUDE, 5)
}

function createLocation() {
  return {
    lat: createLatitude(),
    lng: createLongitude(),
  }
}

function createOffer() {
  return {
    title: getRandomArrayElement(offerTitles),
    address: `${createLatitude()}, ${createLongitude()}`,
    price: getPositiveRandomInteger(prices.min, prices.max),
    type: getRandomArrayElement(types),
    rooms: getPositiveRandomInteger(roomsQuantity.min, roomsQuantity.max),
    guests: getPositiveRandomInteger(guestsQuantity.min, guestsQuantity.max),
    checkin: getRandomArrayElement(checkinTime),
    checkout: getRandomArrayElement(checkoutTime),
    features: featuresList.slice(0, getPositiveRandomInteger(0, featuresList.length )),
    description: getRandomArrayElement(descriptionTitles),
    photos: photosList.slice(0, getPositiveRandomInteger(0, photosList.length)),
  }
}

function createDataObject() {
  return {
    author: createAuthorData(userId()),
    offer: createOffer(),
    location: createLocation(),
  }
}

createDataObject();

export { createDataObject }
