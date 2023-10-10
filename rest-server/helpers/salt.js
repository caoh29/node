const bcrypt = require('bcryptjs');

const serialize = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  serialize
}