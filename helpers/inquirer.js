const inquirer = require("inquirer");
const colors = require("colors");
const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "¿Qué desea hacer ?",
    choices: [
      {
        value: 1,
        name: `${"1".green}. Buscar ciudad `,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir `,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===================".green);
  console.log("Seleccione una opción");
  console.log("===================".green);
  const opt = await inquirer.prompt(menuOpts);
  return opt.option;
};
const pause = async (message) => {
  const pauseOpts = [
    {
      type: "input",
      name: "option",
      message,
    },
  ];
  await inquirer.prompt(pauseOpts);
};
const inputText = async (message) => {
  console.clear();
  const inputOpts = [
    {
      type: "input",
      name: "option",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Digite un valor";
        } else {
          return true;
        }
      },
    },
  ];
  const { option } = await inquirer.prompt(inputOpts);
  return option;
};
const listPlaces = async (list = []) => {
  console.clear();
  let choicesOpt = list.map((key, index) => {
    return {
      value: key.id,
      name: `${index + 1}. ${key.nombre}`,
    };
  });
  choicesOpt.unshift({
    value: 0,
    name: `0. Cancelar`,
  });
  const listOpts = [
    {
      type: "list",
      name: "option",
      message: "Selecciona un lugar",
      choices: choicesOpt,
    },
  ];
  const opt = await inquirer.prompt(listOpts);
  return opt.option;
};
const listCheck = async (list = []) => {
  console.clear();
  const checkOpts = [
    {
      type: "checkbox",
      name: "option",
      message: "Selecciones",
      choices: (choicesOpt = list.map((key, index) => {
        return {
          value: key.id,
          name: `${index + 1}. ${key.description}`,
          checked: key.date === null ? false : true,
        };
      })),
    },
  ];
  const opt = await inquirer.prompt(checkOpts);
  return opt.option;
};
const confirm = async (message) => {
  const confirmOpts = [
    {
      type: "confirm",
      name: "option",
      message,
    },
  ];
  const ok = await inquirer.prompt(confirmOpts);
  return ok.option;
};
module.exports = {
  inquirerMenu,
  pause,
  inputText,
  listPlaces,
  confirm,
  listCheck,
};
