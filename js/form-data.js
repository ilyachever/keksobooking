import { TYPES } from "./util.js";

const form = document.querySelector('.ad-form');
const formType = form.querySelector('#type');
const formPrice = form.querySelector('#price');
const formAddress = form.querySelector('#address');
const formTimeIn = form.querySelector('#timein');
const formTimeOut = form.querySelector('#timeout');
const formRoomAmount = form.querySelector('#room_number');
const formRoomCapacity = form.querySelector('#capacity');

const pristine = new Pristine(form,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  }
);

// ========== Адресс ==========

formAddress.readOnly = true;

// ========== Тип жилья ==========

function setPrice() {
  let minPrice = TYPES[this.value].minPrice;

  formPrice.min = minPrice;
  formPrice.placeholder = minPrice;
  formPrice.dataset.pristineMinMessage = `Минимальная цена за ночь: ${formPrice.min}`;
}

formType.addEventListener('change', setPrice);

// ========== Время заезда и выезда ==========

function setTimeIn() {
  formTimeOut.value = formTimeIn.value;
}

function setTimeOut() {
  formTimeIn.value = formTimeOut.value;
}

formTimeIn.addEventListener('change', setTimeIn);
formTimeOut.addEventListener('change', setTimeOut);

// ========== Количество комнат ==========

const capacityOptions = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
}

pristine.addValidator(formRoomAmount, setRoomsCapacity, setRoomsErrorMessage);
pristine.addValidator(formRoomCapacity,setRoomsCapacity, setGuestsErrorMessage);

function setRoomsCapacity() {
  return capacityOptions[formRoomAmount.value].includes(formRoomCapacity.value);
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
  } else if(!(formRoomAmount.value === '100') && formRoomCapacity.value === '0') {
    return ``
  } else {
    return 'Слишком мало комнат для такого количества гостей';
  }
}

function setGuestsErrorMessage() {
  if (formRoomAmount.value === '100' && !(formRoomCapacity.value === '0')) {
    return ``
  } else if(!(formRoomAmount.value === '100') && formRoomCapacity.value === '0') {
    return `Не для гостей предназначено 100 комнат`;
  }  else {
    return 'Слишком много гостей для такого количества комнат';
  }
}

formRoomAmount.addEventListener('change', onRoomsChange);
formRoomCapacity.addEventListener('change', onCapacityChange);

// ========== Обработчик формы ==========

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = pristine.validate();

  if(valid) {
    console.log('Можно отправлять')
  } else {
    console.log('Нельзя отправлять')
  }
});