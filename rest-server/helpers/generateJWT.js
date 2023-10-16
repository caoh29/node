const jwt = require('jsonwebtoken');

const createToken = async (_id = '') => {
  const payload = { _id };
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {createToken};