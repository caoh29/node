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
        const cityData = await finds.getCityData(city);
        const weatherData = await finds.getWeatherData(city);

        const info = {
          ...cityData,
          ...weatherData
        };

        const {
          name,
          latitude,
          longitude,
          country,
          population,
          temp,
          min_temp,
          max_temp,
          feels_like,
          humidity,
          wind_speed,
          wind_degrees
        } = info;

        console.log("\n        City Data       ");
        console.log('==========================');
        console.log(`City: ${name}`);
        console.log(`Country: ${country}`);
        console.log(`Population: ${population}`);
        console.log(`Lat: ${latitude}°`);
        console.log(`Long: ${longitude}°`);
        console.log(`Temperature: ${temp} °C`);
        console.log(`Min Temperature: ${min_temp} °C`);
        console.log(`Max Temperature: ${max_temp} °C`);
        console.log(`Feels Like: ${feels_like} °C`);
        console.log(`Humidity: ${humidity} φ`);
        console.log(`Wind Speed: ${wind_speed} km/h`);
        console.log(`Wind Degrees: ${wind_degrees}°`);
        break;
      
      case "2":
        const cities = await finds.getHistory();
        console.log("\n        History       ");
        console.log('==========================');
        if (cities.length === 0) {
          console.log("No cities searched yet");
          break;
        }
        cities.forEach((city, index) => {
          console.log(`${index + 1}. ${city}`);
        });
        break;
    }
    if (opt !== "0") await pause();
  } while (opt !== "0");
}


main();