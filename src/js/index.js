'use strict';

import $ from 'jquery';
import io from 'socket.io-client';

console.log("hello world");
console.log(`jQuery Version: ${$.fn.jquery}`);

const socket = io.connect('http://localhost:2048');
socket.on('connect', function () {
  console.log(`Session: ${socket.io.engine.id}`);

  socket.on('text', function (text) {
    console.log(text);
  });

  socket.on('notification', function (msg) {
    console.log(msg);
    $('.ol').append(`<li>${msg.text} ${msg.timestamp}</li>`)
  });
});