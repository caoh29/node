const socketController = (socket) => {
  socket.on('input-message', (payload, callback) => {
    // Line 4 sends the same as line 5 but to all the clients except the sender
    // socket.broadcast.emit('output-message', payload);
    socket.emit('output-message', payload);
    callback('Mensaje recibido');
  });
}

module.exports = { socketController };