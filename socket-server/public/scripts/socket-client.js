const online = document.getElementById('online');
const offline = document.getElementById('offline');
const input = document.getElementById('input');
const btn = document.getElementById('btn');

const socketClient = io();

socketClient.on('connect', () => {
  offline.style.display = 'none';
  online.style.display = 'block';
});

socketClient.on('disconnect', () => {
  online.style.display = 'none';
  offline.style.display = 'block';
});


btn.addEventListener('click', () => {
  socketClient.emit('input-message', input.value, (data) => {
    input.value = data;
  });
  console.log(`Message sent from client with value: ${input.value}`);
});

socketClient.on('output-message', (payload) => {
  console.log(`Message received from the server with value: ${payload}`);
});