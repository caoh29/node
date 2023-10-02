const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const obj = {
    name: 'John',
    age: 30
  };
  res.write(JSON.stringify(obj));
  res.end();
}).listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
} )