var socketIO = require('socket.io');

module.exports = function (httpServer) {
  var io = socketIO(httpServer);
  var connections = [];
  io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);
    io.sockets.emit('users_count', connections.length);

    // Disconnect
    socket.on('disconnect', function (data) {

      connections.splice(connections.indexOf(socket), 1);
      io.sockets.emit('users_count', connections.length);
      console.log('Disconnected: %s sockets connected', connections.length);

    });

    //send message
    socket.on('send message', function (data) {
      io.sockets.emit('new message', data);
    });
  });
};