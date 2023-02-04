import { FORM_TYPES } from "./util.js";

// Found template of the card
const templateCard = document.getElementById('card').content.querySelector('.popup');

function renderCard({author, offer}) {
  const card = templateCard.cloneNode(true);

  // Found HTML elements
  const offerTitle = card.querySelector('.popup__title');
  const offerAddress = card.querySelector('.popup__text--address');
  const offerPrice = card.querySelector('.popup__text--price');
  const offerType = card.querySelector('.popup__type');
  const offerCapacity = card.querySelector('.popup__text--capacity');
  const offerTime = card.querySelector('.popup__text--time');
  const offerFeaturesContainer = card.querySelector('.popup__features');
  const offerFeaturesList = card.querySelectorAll('.popup__feature');
  const offerDescription = card.querySelector('.popup__description');
  const offerPhotosContainer = card.querySelector('.popup__photos');
  const offerAvatar = card.querySelector('.popup__avatar');

  // Create a card
  offerTitle.textContent = isDataReceived(offer.title, offerTitle);
  offerAddress.textContent = isDataReceived(offer.address, offerAddress);
  offerPrice.textContent = `${isDataReceived(offer.price, offerPrice)} ₽/ночь`;
  offerType.textContent = isDataReceived(getApart(offer.type), offerType);
  offerCapacity.textContent = `${isDataReceived(offer.rooms, offerCapacity)} комнаты для ${isDataReceived(offer.guests, offerCapacity)} гостей`;
  offerTime.textContent = `Заезд после ${isDataReceived(offer.checkin, offerTime)}, выезд до ${isDataReceived(offer.checkout, offerTime)}`;
  getFeatures(offer.features);
  offerDescription.textContent = isDataReceived(offer.description, offerDescription);
  offerPhotosContainer.innerHTML = isDataReceived(getPhotos(offer.photos), offerPhotosContainer);
  offerAvatar.src = isDataReceived(author.avatar, offerAvatar);

  // Utils
  function getApart(item) {
    if (FORM_TYPES[item].ru) return FORM_TYPES[item].ru;
  }

  function getFeatures(features) {
    if (!features) {
      offerFeaturesContainer.remove();
      return;
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
    if (!photos) {
      offerPhotosContainer.remove();
      return;
    }

    const photosList = photos.map((photo) => `<img src=${photo} class="popup__photo" width="45" height="40" alt="Фотография жилья">`)

    return [...photosList].join('');
  }

  function isDataReceived(condition, parentElement) {
    if (condition) {
      return condition;
    } else {
      parentElement.remove();
    }
  }

  return card;
}

export default renderCard;
