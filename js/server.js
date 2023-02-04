import { GET_DATA_LINK, POST_DATA_LINK } from "./util.js";
import { filterEnable } from "./state.js";
import { showAlertMessage } from "./util.js";

async function getData(onSuccess, adsQuantity = 5, alertDelay = 3000) {
  try {
    const dataResponse = await fetch(GET_DATA_LINK);
    const data = await dataResponse.json();

    data.slice(0, adsQuantity).forEach((dataItem) => onSuccess(dataItem));
    filterEnable();
  } catch (error) {
    showAlertMessage(`Возникла ошибка загрузки объявлений`, alertDelay);
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
    showAlertMessage(`Возникла ошибка загрузки объявления`, alertDelay);
  }
}

export { getData, sendData }
