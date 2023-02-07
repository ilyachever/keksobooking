import { GET_DATA_LINK, POST_DATA_LINK, ADS_QUANTITY } from "./util.js";
import { filterEnable } from "./state.js";
import { showAlertMessage } from "./util.js";

async function getData(onSuccess, adsQuantity = ADS_QUANTITY) {
  try {
    const dataResponse = await fetch(GET_DATA_LINK);
    let data = await dataResponse.json();

    filterEnable();

    onSuccess(data.slice(0, adsQuantity));

  } catch (error) {
    showAlertMessage(`Возникла ошибка загрузки объявлений`);
  }
}

async function sendData(onSuccess, onError, body) {
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
    showAlertMessage(`Возникла ошибка загрузки объявления`);
  }
}

export { getData, sendData }
