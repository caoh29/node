const { inquirerMenu, askForInput, pause } = require("./helpers/inquirer");
const Finds = require("./models/find");

const main = async () => {
  const finds = new Finds();
  let opt = "";
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const place = await askForInput("City: ");
        const city = await finds.getCities(place);
        console.log("\n        City Data       ");
        console.log('==========================');
        console.log(`City: ${city}`);
        console.log("Lat: ");
        console.log("Long: ");
        console.log("Temperature: ");
        console.log("Min Temp: ");
        console.log("Max Temp: ");
        break;
      case "2":
        console.log("2");
        break;
    }
    if (opt !== "0") await pause();
  } while (opt !== "0");
}


main();