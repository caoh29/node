// const { displayMenu, askForTask } = require('./helpers/messages');
const { inquirerMenu } = require('./helpers/inquirer');
const main = async () => {
  let option = "";
  do {
    // displayMenu();
    // option = await askForTask();
    option = await inquirerMenu();
    console.log({ option });
  } while (option !== "5");
}

main();