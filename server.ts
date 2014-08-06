/// <reference path="./d.ts/node.d.ts" />
/// <reference path="./d.ts/socket.io.d.ts" />
/// <reference path="./d.ts/express.d.ts" />


import express = require('express');
import http = require('http');
import io = require('socket.io');
import utopia = require('./server/game');

var app = express();
//app.listen(8080);
var server = http.createServer(app);
var socketServer = io.listen(server);
//console.log(Phaser);


app.use(express.static(__dirname + '/client'));

app.get('/', function(req,res) {
  console.log('hello');
	res.sendfile('client/index.html');
});

var game = new utopia.Game(socketServer);

server.listen(process.env.PORT, process.env.IP);

console.log('Server started');

/*socketServer.sockets.on('connect', function(client) {
  console.log('player connected');
})*/