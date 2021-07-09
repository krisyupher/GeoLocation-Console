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
        console.log("Ciduad", PlaceSelect.nombre);
        console.log("lat", PlaceSelect.lng);
        console.log("1Lng", PlaceSelect.lat);
        break;
      case 2:
        console.log("2");
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
