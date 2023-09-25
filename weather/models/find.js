require('dotenv').config()
const axios = require('axios');

class Finds {

  constructor() {
    this.city = "";
    this.history = [];
  }

  getHistory = async () => {
    return this.history;
  }

  getCityData = async (city) => {
    if (city.length === 0) return null;
    this.history.push(city);
    this.city = city;
    try {
      const res = await axios.get(`https://api.api-ninjas.com/v1/city?name=${city}`, {
        headers: {
          'X-Api-Key': `${process.env.API_KEY}`,
        }
      });
      
      const cityData = res.data[0];
      return cityData;
    } catch (error) {
      return `${error}`;
    }
  }

  getWeatherData = async (city) => {
    if (city.length === 0) return null;
    try {
      const res= await axios.get(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
        headers: {
          'X-Api-Key': `${process.env.API_KEY}`,
        }
      });
      const weatherData = res.data;
      return weatherData;
    } catch (error) {
      return `${error}`;
    }
  }
}

module.exports = Finds;