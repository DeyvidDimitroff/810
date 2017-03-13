var socketIO = require('socket.io');

module.exports = function (httpServer) {
  var io = socketIO(httpServer);

  io.sockets.on('connection', function (socket) {
    socket.on('create', function (room) {
      socket.join(room);
    });

    socket.on('send message', function (data) {
      console.log(socket.rooms);
      Object.keys(socket.rooms).forEach(function (room) {
        io.sockets.in(room).emit('new message', data);
      });
    });
  });
};