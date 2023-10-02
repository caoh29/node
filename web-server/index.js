require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;


app.use(express.static('template'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/template/index.html');
});

app.get('/elements', (req, res) => {
  res.sendFile(__dirname + '/template/elements.html');
});

app.get('/generic', (req, res) => {
  res.sendFile(__dirname + '/template/generic.html');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});