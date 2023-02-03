import { filterEnable } from "./state.js";
import { showAlertMessage, hideAlertMessage } from "./util.js";

const GET_DATA_LINK = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_DATA_LINK = 'https://23.javascript.pages.academy/keksobooking';

async function getData(onSuccess, adsQuantity = 5, alertDelay = 3000) {
  try {
    const dataResponse = await fetch(GET_DATA_LINK);
    const data = await dataResponse.json();

    data.slice(0, adsQuantity).forEach((dataItem) => onSuccess(dataItem));
    filterEnable();
  } catch (error) {
    showAlertMessage(`Возникла ошибка`);
    setTimeout(hideAlertMessage, alertDelay);
  }
}

async function sendData(onSuccess, onError, body, alertDelay = 3000) {
  try {
    const data = await fetch(POST_DATA_LINK,
      {
        method: 'POST',
        body,
      }
    )

    if (data.ok) {
      onSuccess();
    } else {
      onError();
    }
  } catch (error) {
    showAlertMessage(`Возникла ошибка`);
    setTimeout(hideAlertMessage, alertDelay);
  }
}

export { getData, sendData }
