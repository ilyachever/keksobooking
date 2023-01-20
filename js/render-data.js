import { data, apart } from "./mock.js";

// Found and create card
const card = document.getElementById('card').content;
const templateCard = card.cloneNode(true);

// Found HTML elements
const offerTitle = templateCard.querySelector('.popup__title');
const offerAddress = templateCard.querySelector('.popup__text--address');
const offerPrice = templateCard.querySelector('.popup__text--price');
const offerType = templateCard.querySelector('.popup__type');
const offerCapacity = templateCard.querySelector('.popup__text--capacity');
const offerTime = templateCard.querySelector('.popup__text--time');
const offerFeaturesContainer = templateCard.querySelector('.popup__features');
const offerFeaturesList = templateCard.querySelectorAll('.popup__feature');
const offerDescription = templateCard.querySelector('.popup__description');
const offerPhotosContainer = templateCard.querySelector('.popup__photos');
const offerAvatar = templateCard.querySelector('.popup__avatar');

// Create a card
offerTitle.textContent = isOk(data.offer.title, offerTitle);
offerAddress.textContent = isOk(data.offer.address, offerAddress);
offerPrice.textContent = `${isOk(data.offer.price, offerPrice)} ₽/ночь`;
offerType.textContent = isOk(getApart(data.offer.type), offerType);
offerCapacity.textContent = `${isOk(data.offer.rooms, offerCapacity)} комнаты для ${isOk(data.offer.guests, offerCapacity)} гостей`;
offerTime.textContent = `Заезд после ${isOk(data.offer.checkin, offerTime)}, выезд до ${isOk(data.offer.checkout, offerTime)}`;
getFeatures(data.offer.features);
offerDescription.textContent = isOk(data.offer.description, offerDescription);
offerPhotosContainer.innerHTML = isOk(getPhotos(data.offer.photos), offerPhotosContainer);
offerAvatar.src = isOk(data.author.avatar, offerAvatar)

// Utils
function getApart(item) {
  if (apart[item]) return apart[item];
}

function getFeatures(features) {
  if (!features.length) {
    offerFeaturesContainer.remove();
  }

  const modifiers = features.map((item) => `popup__feature--${item}`);

  offerFeaturesList.forEach((item) => {
    const currentClass = item.classList[1];
    
    if (!modifiers.includes(currentClass)) {
      item.remove();
    }
  })
}

function getPhotos(photos) {
  if (!photos.length) {
    offerPhotosContainer.remove();
  }

  const photosList = photos.map((photo) => `<img src=${photo} class="popup__photo" width="45" height="40" alt="Фотография жилья">`)

  return [...photosList].join('');
}

function isOk(condition, parentElement) {
  if (condition) {
    return condition;
  } else {
    parentElement.remove();
  }
}

