import { addMap, setMarkers } from "./map.js";
import { getData } from "./server.js";
import { formDisable, filterDisable } from "./state.js";

// Выключение полей фильтрации и формы до загрузки карты
formDisable();
filterDisable();

// Добавление карты
addMap();

// Отрисовка меток
getData(setMarkers, 5);

