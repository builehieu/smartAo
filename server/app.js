var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log(socket.id);
  socket.on('data_cambien1', (data) => {
    io.emit('data_cambien1', data);
    console.log('cambien1: ',data);
  });
  socket.on('data_cambien2', (data) => {
    io.emit('data_cambien2', data);
    console.log('cambien2: ',data);
  });
  socket.on('authorization', function(data) {
    console.log('authorization user: ' + data);
    io.sockets.emit('authenticated', data);
  });
});

