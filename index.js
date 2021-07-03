const { inputText, inquirerMenu } = require("./helpers/inquirer");

const menu = async () => {
  const opcion = await inquirerMenu();
  switch (opcion) {
    case 1:
      console.log("1");
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
};
menu();
