const { inquirerMenu, askForInput, pause } = require("./helpers/inquirer");
const Finds = require("./models/find");

const main = async () => {
  const finds = new Finds();
  let opt = "";
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const city = await askForInput("city: ");
        const data = await finds.getData(city);
        const { name, latitude, longitude, country, population, is_capital } = data[0];
        console.log("\n        City Data       ");
        console.log('==========================');
        console.log(`City: ${name}`);
        console.log(`Country: ${country}`);
        console.log(`Population: ${population}`);
        console.log(`Lat: ${latitude}`);
        console.log(`Long: ${longitude}`);
        console.log(`Is Capital: ${is_capital ? "Yes" : "No"}`);
        break;
      case "2":
        console.log("2");
        break;
    }
    if (opt !== "0") await pause();
  } while (opt !== "0");
}


main();