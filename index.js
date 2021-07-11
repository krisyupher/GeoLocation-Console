const colors = require("colors");
const {
  inputText,
  inquirerMenu,
  pause,
  listPlaces,
} = require("./helpers/inquirer");
const Busquedas = require("./Models/busquedas");

const main = async () => {
  let opcion = 0;
  const busqueda = new Busquedas();
  do {
    opcion = await inquirerMenu();
    switch (opcion) {
      case 1:
        const lugar = await inputText("Ciudad a buscar: ");
        const listLugares = await busqueda.ciudad(lugar);
        const id = await listPlaces(listLugares);
        const PlaceSelect = listLugares.find((l) => l.id === id);
        busqueda.agregarHistorial(PlaceSelect.nombre);
        const dataCity = await busqueda.climaLupar(
          PlaceSelect.lat,
          PlaceSelect.lng
        );
        console.log("Ciduad: ", PlaceSelect.nombre);
        console.log("Latitud: ", PlaceSelect.lat);
        console.log("Longitudon: ", PlaceSelect.lng);
        console.log("Teperatura: ", dataCity.temp);
        console.log("Tem Mínima: ", dataCity.temMin);
        console.log("Tem Máxima: ", dataCity.temMax);
        console.log("Cómo está el clima: ", dataCity.desc);
        break;
      case 2:
        busqueda.historial.forEach((element, index) => {
          console.log(`${colors.green(index + ".")} ${element}`);
        });
        break;
      case 0:
        console.log("3");
        break;

      default:
        break;
    }
    await pause("Enter para continuar");
  } while (opcion !== 0);
};
main();
