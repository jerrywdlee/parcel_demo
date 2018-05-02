const socket = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const PORT = 2048;

const io = socket.listen(server);

io.sockets.on('connection', function (client) {
  console.log("New client ! " + client.id);
  client.emit('text', 'wow. such event. very real time.');
  client.on('message', function (data) {
    console.log('Message received ' + data.message);
    io.sockets.emit('message', { message: data.message });
  });

  let emmiter = setInterval(function () {
    client.emit('notification', {text: 'Notification!!', timestamp: (new Date()).toISOString()});
    console.log('Send notification', 'Notification!!');
  }, 5000);

  client.on('disconnect', function () {
    console.log('socket disconnected');
    clearInterval(emmiter)
  });

});

server.listen(PORT);
console.log(`server on ${PORT}`);