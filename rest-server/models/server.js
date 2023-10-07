const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;

    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
    // Iniciar el servidor
    this.listen();
  }

  middlewares() {
    this.app.use(express.json());
    // CORS
    this.app.use(cors());
    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        msg: 'pgl GET',
      });
    });

    this.app.put('/api', (req, res) => {
      res.json({
        msg: 'pgl PUT',
      });
    });

    this.app.delete('/api', (req, res) => {
      res.json({
        msg: 'pgl DELETE',
      });
    });

    this.app.post('/api', (req, res) => {
      res.json({
        msg: 'pgl POST',
      });
    });
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server listening on http://localhost:${this.PORT}/api`);
    });
  }
}

module.exports = Server;