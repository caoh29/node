const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = payload;
    const user = await User.search(_id);
    if (!user) return res.status(401).json({ message: 'Invalid user' });
    req.user = user;
    req.user.auth = true;
    next();
  }
  catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  validateJWT
}