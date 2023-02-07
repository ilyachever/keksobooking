import { formButtonEnable } from "./state.js";

// Функции
function showAlertMessage(message, delay = 3000) {
  const alertContainer = document.createElement('div');
  const alertMessage = document.createElement('p');

  alertContainer.setAttribute('id', 'alert-message');
  alertContainer.style.display = `block`;
  alertContainer.style.minWidth = `100%`;
  alertContainer.style.padding = `1rem`;
  alertContainer.style.position = `fixed`;
  alertContainer.style.zIndex = `1000`;
  alertContainer.style.top = '0';
  alertContainer.style.left = '0';
  alertContainer.style.backgroundColor = `tomato`;
  alertContainer.style.color = `#ffffff`;
  alertContainer.style.fontSize = `20px`;
  alertContainer.style.textAlign = `center`;

  alertMessage.style.margin = `0`;
  alertMessage.textContent = `${message}`;

  alertContainer.append(alertMessage);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, delay)
}

function closeMessagePopup(e) {
  const target = document.querySelector('.success') || document.querySelector('.error');

  target.remove();
  e.currentTarget.removeEventListener('click', closeMessagePopup);
  formButtonEnable();
}

function closeMessagePopupByEsc(e) {
  if(e.key === 'Escape') {
    this.remove();
    e.currentTarget.removeEventListener('keydown', closeMessagePopupByEsc);
    formButtonEnable();
  }
}

function showSuccessMessagePopup() {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  document.body.append(successMessage);

  successMessage.addEventListener('click', closeMessagePopup);
  document.addEventListener('keydown', closeMessagePopupByEsc.bind(successMessage));
}

function showErrorMessagePopup() {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  document.body.append(errorMessage);

  errorButton.addEventListener('click', closeMessagePopup);
  errorMessage.addEventListener('click', closeMessagePopup);
  document.addEventListener('keydown', closeMessagePopupByEsc.bind(errorMessage));
}

function debounce (callback, delay = TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), delay);
  };
}

// Константы 

// Фильтр
const FILTER_PRICE = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  }
};

const FILTER_GUESTS = {
  low: {
    min: 1,
    max: 2,
  },
  middle: {
    min: 2,
    max: 5,
  },
  high: {
    min: 5,
    max: 10,
  },
  zero: {
    min: 0,
    max: 0,
  }
};

const FILTER_DEFAULT_VALUE = 'any';

const TIMEOUT_DELAY = 700;

// Форма
const FORM_TYPES = {
  bungalow: {
    ru: 'Бунгало',
    minPrice: 0,
  },
  flat: {
    ru: 'Квартира',
    minPrice: 1000,
  },
  hotel: {
    ru: 'Отель',
    minPrice: 3000,
  },
  house: {
    ru: 'Дом',
    minPrice: 5000,
  },
  palace: {
    ru: 'Дворец',
    minPrice: 10000,
  },
};

const FORM_CAPACITY = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

// Карта
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

// Серверные данные
const GET_DATA_LINK = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_DATA_LINK = 'https://23.javascript.pages.academy/keksobooking';

const ADS_QUANTITY = 15;

export {
  showAlertMessage,
  showSuccessMessagePopup,
  showErrorMessagePopup,
  debounce,
  FILTER_PRICE,
  FILTER_GUESTS,
  FILTER_DEFAULT_VALUE,
  FORM_TYPES,
  FORM_CAPACITY,
  DEFAULT_CITY,
  DEFAULT_ZOOM,
  DEFAULT_ROUND,
  ICON_MAIN,
  ICON_DEFAULT,
  GET_DATA_LINK,
  POST_DATA_LINK,
  ADS_QUANTITY,
}
