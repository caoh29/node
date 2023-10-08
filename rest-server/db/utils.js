require('dotenv').config();
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

// Database Name
const dbName = 'CafeDB';

async function dbConnection() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
  } catch (e) {
    throw new Error(e);
  }
}

function interactWithDB(dbCollection) {
  // perform actions on the collection object
  return client.db(dbName).collection(dbCollection);
}

async function dbDisconnect() { 
  await client.close();
  console.log('Connection closed'); 
}

module.exports = { 
  dbConnection,
  dbDisconnect,
  interactWithDB
}