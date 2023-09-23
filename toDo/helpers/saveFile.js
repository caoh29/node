const fs = require('fs');

const FILE_PATH = './db/data.json';

const saveToDB = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data));
}

const readFromDB = () => {
  if (!fs.existsSync(FILE_PATH)) {
    return null;
  }

  const data = fs.readFileSync(FILE_PATH, { encoding: 'utf-8' });
  return JSON.parse(data);
}

module.exports = {
  saveToDB,
  readFromDB
}