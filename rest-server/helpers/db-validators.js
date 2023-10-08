const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`${role} doesn't exists in the system`);
  }
};

const isValidEmail = async (email = '') => {
  const existsEmail = await User.checkEmail(email);
  if (existsEmail) {
    throw new Error(`${email} already exists in the system`);
  }
}
module.exports = { isValidRole, isValidEmail };