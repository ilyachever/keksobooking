import "./form-data.js"
import "./map.js"
import { addMap, setMarkers } from "./map.js"
import { getData } from "./server.js"
import { contentDisable } from "./state.js"

contentDisable()
addMap();
getData(setMarkers)

