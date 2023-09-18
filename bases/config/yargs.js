const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Base of the multiplication table',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    describe: 'Limit of the multiplication table',
  })
  .option('d', {
    alias: 'display',
    type: 'boolean',
    default: false,
    describe: 'Display the table',
  })
  .check((argv) => {
    if (isNaN(argv.b)) {
      throw 'Base must be a number';
    }
    return true;
  })
  .argv;

module.exports = argv;