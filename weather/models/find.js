require('dotenv').config()
const axios = require('axios');

class Finds {

  constructor() {
    this.city = "";
    this.history = [];
  }

  getCities = async (city) => {
    if (city.length === 0) return null;
    try {
      // const res = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${city}`);
      const res = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Finds;