const GET_DATA_LINK = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_DATA_LINK = 'https://23.javascript.pages.academy/keksobooking';

const DISPLAYED_ADS_QUANTITY = 10;

function getData(onSuccess) {
  fetch(GET_DATA_LINK)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`)
    })
    .then((response) => {
      response.slice(0, DISPLAYED_ADS_QUANTITY).forEach((item) => onSuccess(item));
    })
    .catch((error) => {
      console.error(`Ошибка загрузки данных ${error.message}`);
    })
}

function sendData(onSuccess, onFail, body) {
  fetch(POST_DATA_LINK, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }

      onFail();
    })
    .catch((error) => {
      console.error(`Ошибка отправки данных ${error.message}`);
    })
}

export { getData, sendData }
