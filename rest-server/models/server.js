const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/utils');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.PATH = '/api';
    // Connect to DB
    this.connectDB();
    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
    // Iniciar el servidor
    this.listen();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Parse and lecture of body for PUT, POST, etc
    this.app.use(express.json());
    // CORS
    this.app.use(cors());
    // Public Directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.PATH + '/users', require('../routes/users'));
    this.app.use(this.PATH + '/roles', require('../routes/roles'));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server listening on http://localhost:${this.PORT}${this.PATH}`);
    });
  }
}

module.exports = Server;