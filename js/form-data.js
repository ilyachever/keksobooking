import { 
  FORM_TYPES, 
  DEFAULT_CITY, 
  FORM_CAPACITY, 
  FILE_TYPES,
  showSuccessMessagePopup, 
  showErrorMessagePopup,
  showAlertMessage 
} from "./util.js";
import { resetMap, renderOffers } from "./map.js";
import { getData, sendData } from "./server.js";
import { formButtonDisable } from "./state.js";

// HTML Элементы
const form = document.querySelector('.ad-form');
const formResetButton = form.querySelector('.ad-form__reset');
const formType = form.querySelector('#type');
const formPrice = form.querySelector('#price');
const formPriceSlider = form.querySelector('.ad-form__slider');
const formAddress = form.querySelector('#address');
const formTimeIn = form.querySelector('#timein');
const formTimeOut = form.querySelector('#timeout');
const formRoomAmount = form.querySelector('#room_number');
const formRoomCapacity = form.querySelector('#capacity');
const filter = document.querySelector('.map__filters');
const avatarImageInput = form.querySelector('.ad-form-header__input');
const avatarImagePreview = form.querySelector('.ad-form-header__preview img');
const apartamentImageInput = form.querySelector('.ad-form__input');
const apartamentImagePreview = form.querySelector('.ad-form__photo');

// Настройка Pristine
const pristine = new Pristine(form,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  }
);

// Аватар
avatarImageInput.addEventListener('change', (e) => {
  const file = e.currentTarget.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    avatarImagePreview.src = URL.createObjectURL(file);
  }
})

// Адресс
function setAddressCoordinates(coordinates) {
  formAddress.value = `${coordinates.lat}, ${coordinates.lng}`;
}

// Тип жилья, Цена за ночь 
function setPrice() {
  let minPrice = FORM_TYPES[this.value].minPrice;

  formPrice.min = minPrice;
  formPrice.placeholder = minPrice;
}

function checkPrice(value) {
  return value && !(value < 0) && parseInt(value) >= parseInt(formPrice.min);
}

function setPriceErrorMessage() {
  return `Минимальная цена за ночь: ${formPrice.min}`;
}

function onPriceChange() {
  pristine.validate(formPrice);
}

pristine.addValidator(formPrice, checkPrice, setPriceErrorMessage, 2);

formType.addEventListener('change', setPrice);
formPrice.addEventListener('change', onPriceChange)

// Слайдер 
noUiSlider.create(formPriceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: formPrice.min,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    },
  }
});

formPriceSlider.noUiSlider.on('update', () => {
  formPrice.value = formPriceSlider.noUiSlider.get();
  pristine.validate(formPrice);
})

formType.addEventListener('change', function () {
  formPriceSlider.noUiSlider.set([formPrice.min, null])
})

formPrice.addEventListener('input', function () {
  formPriceSlider.noUiSlider.set([formPrice.value, null])
})

// Время заезда и выезда 
function setTimeIn() {
  formTimeOut.value = formTimeIn.value;
}

function setTimeOut() {
  formTimeIn.value = formTimeOut.value;
}

formTimeIn.addEventListener('change', setTimeIn);
formTimeOut.addEventListener('change', setTimeOut);

// Количество комнат 
function setRoomsCapacity() {
  return FORM_CAPACITY[formRoomAmount.value].includes(formRoomCapacity.value);
}

function onRoomsChange() {
  pristine.validate(formRoomCapacity);
}

function onCapacityChange() {
  pristine.validate(formRoomAmount);
}

function setRoomsErrorMessage() {
  if (formRoomAmount.value === '100' && !(formRoomCapacity.value === '0')) {
    return `100 комнат не предназначены для гостей`;
  } else if (!(formRoomAmount.value === '100') && formRoomCapacity.value === '0') {
    return ``
  } else {
    return 'Слишком мало комнат для такого количества гостей';
  }
}

function setGuestsErrorMessage() {
  if (formRoomAmount.value === '100' && !(formRoomCapacity.value === '0')) {
    return ``
  } else if (!(formRoomAmount.value === '100') && formRoomCapacity.value === '0') {
    return `Не для гостей предназначено 100 комнат`;
  } else {
    return 'Слишком много гостей для такого количества комнат';
  }
}

pristine.addValidator(formRoomAmount, setRoomsCapacity, setRoomsErrorMessage);
pristine.addValidator(formRoomCapacity, setRoomsCapacity, setGuestsErrorMessage);

formRoomAmount.addEventListener('change', onRoomsChange);
formRoomCapacity.addEventListener('change', onCapacityChange);

// Фотографии Жилья
apartamentImageInput.addEventListener('change', (e) => {
  const file = e.currentTarget.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    apartamentImagePreview.src = URL.createObjectURL(file);
  }
})

// Отправка формы 
function submitForm(e) {
  e.preventDefault();

  let valid = pristine.validate();
  let formData = new FormData(e.currentTarget);

  if (valid) {
    formButtonDisable();
    sendData(showSuccessMessagePopup, showErrorMessagePopup, formData);
    resetForm(e);
    pristine.reset();
  } else {
    showAlertMessage('Форма заполнена не полностью', 3000);
  }
}

form.addEventListener('submit', submitForm)

// Сброс формы 
function resetForm(e) {
  e.preventDefault();

  form.reset();
  filter.reset();
  pristine.reset();
  formPriceSlider.noUiSlider.reset();
  formPrice.min = FORM_TYPES.flat.minPrice;
  setAddressCoordinates(DEFAULT_CITY);
  resetMap();
  getData(renderOffers);
}

formResetButton.addEventListener('click', resetForm)

export { setAddressCoordinates };
