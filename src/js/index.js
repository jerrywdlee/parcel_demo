'use strict'

import $ from 'jquery'
import io from 'socket.io-client'

console.log("hello world")
console.log(`jQuery Version: ${$.fn.jquery}`)

const socket = io.connect('http://localhost:2048')
const CONNECTION = {
  socket: socket,
  online: false,
  rtt: Infinity
}

calcLatency(CONNECTION)

socket.on('connect', () => {
  console.log(`Session: ${socket.io.engine.id}`)
  CONNECTION.online = true
  socket.emit('__ping', Date.now())
  socket.emit('message', { message: 'msg' });
})

socket.on('text', (text) => {
  console.log(text)
})

socket.on('notification', (msg) => {
  // console.log(msg)
  $('.ol').append(`<li>${msg.text} ${msg.timestamp}</li>`)
})

setInterval(() => {
  $('.delay').text(CONNECTION.rtt)
  $('.status').text(CONNECTION.online ? 'Online': 'Offline')
}, 500);

function calcLatency (connection, cycleTime = 1000) {
  setInterval(() => {
    // const socket = connection.socket
    let timeoutFlag = false
    // console.log(connection);
    if (!timeoutFlag && socket) {
      socket.emit('__ping', Date.now())
      timeoutFlag = true
      socket.on('__pong', timestamp => {
        connection.rtt = Date.now() - parseInt(timestamp)
        timeoutFlag = false
      })
    } else {
      connection.online = false
      timeoutFlag = false
    }
  }, cycleTime)
}

