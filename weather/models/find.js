require('dotenv').config()
const axios = require('axios');

class Finds {

  constructor() {
    this.city = "";
    this.history = [];
  }

  getData = async (city) => {
    if (city.length === 0) return null;
    try {
      const res = await axios.get(`https://api.api-ninjas.com/v1/city?name=${city}`,{
        headers: {
          'X-Api-Key': `${process.env.API_KEY}`,
        }
      });
      return res.data;
    } catch (error) {
      return `${error}`;
    }
  }
}

module.exports = Finds;