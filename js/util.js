function getPositiveRandomInteger(min, max) {
  const minValue = Math.min(Math.abs(min), Math.abs(max));
  const maxValue = Math.max(Math.abs(min), Math.abs(max));
  const resultValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

  return resultValue;
}

function getPositiveRandomFloat(min, max, digits = 1) {
  const minValue = Math.min(Math.abs(min), Math.abs(max));
  const maxValue = Math.max(Math.abs(min), Math.abs(max));
  const resultValue = (Math.random() * (maxValue - minValue + 1)) + minValue;

  return +resultValue.toFixed(digits);
}

function getPositiveRandomUniqueInteger(min, max) {
  const usedNumbers = [];

  return function() {
    let uniqueInteger = getPositiveRandomInteger(min, max);

    if (usedNumbers.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);

      return null;
    }

    while (usedNumbers.includes(uniqueInteger)) {
      uniqueInteger = getPositiveRandomInteger(min, max);
    }

    usedNumbers.push(uniqueInteger);

    return uniqueInteger;
  }
}

function getRandomArrayElement(array) {
  return array[getPositiveRandomInteger(0, array.length - 1)];
}

function showSuccessMessage() {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  document.body.append(successMessage)
}

function showErrorMessage() {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);

  document.body.append(errorMessage)
}

const TYPES = {
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
}

const DEFAULT_FIELDS_VALUES = {
  title: '',
  type: 'flat',
  price: '1000',
  timeIn: '12:00',
  timeOut: '12:00',
  rooms: '1',
  guests: '1',
  features: [
    'washer',
    'wifi',
  ],
  description: '',
}

export {
  getPositiveRandomInteger, 
  getPositiveRandomFloat, 
  getPositiveRandomUniqueInteger, 
  getRandomArrayElement, 
  showSuccessMessage,
  showErrorMessage, 
  TYPES,
  DEFAULT_FIELDS_VALUES,
};