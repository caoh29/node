require('dotenv').config();
const Server = require('./models/server');
// const { dbDisconnect } = require('./db/utils');

async function main() {
  try {
    const server = new Server();
  }
  catch (err) {
    console.log(err);
  }
  // finally {
  //   await dbDisconnect();
  // }
}

main();