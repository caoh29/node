const { createTableFile } = require('./helpers/createTableFile');
const argv = require('./config/yargs');

const base = argv.base || 5;
const limit = argv.limit || 10;

createTableFile(base, limit, argv.display)
  .then(fileName => console.log(`${fileName} created`))
  .catch(err => console.log(err));