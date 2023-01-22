const form = document.querySelector('.ad-form');
const formFields = document.querySelectorAll('.ad-form__element');
const formUploadImageInput = document.querySelector('.ad-form-header__input');
const filter = document.querySelector('.map__filters');
const filterFields = document.querySelectorAll('.map__filter');
const filterFeatures = document.querySelector('.map__features');

function contentDisable() {
  form.classList.add('ad-form--disabled');
  formFields.forEach((field) => field.disabled = true);
  formUploadImageInput.disabled = true;
  filter.classList.add('map__filters--disabled');
  filterFields.forEach((field) => field.disabled = true);
  filterFeatures.disabled = true;
}

function contentEnable() {
  form.classList.remove('ad-form--disabled');
  formFields.forEach((field) => field.disabled = false);
  formUploadImageInput.disabled = false;
  filter.classList.remove('map__filters--disabled');
  filterFields.forEach((field) => field.disabled = false);
  filterFeatures.disabled = false;
}

export { contentDisable, contentEnable }