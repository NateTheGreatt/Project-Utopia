/// <reference path="./d.ts/node.d.ts" />
/// <reference path="./d.ts/socket.io.d.ts" />
/// <reference path="./d.ts/express.d.ts" />


import express = require('express');
import http = require('http');
import io = require('socket.io');
import Game = require('./server/game');

var app = express();
var server = http.createServer(app);
var socketServer = io.listen(server);

app.use(express.static(__dirname + '/client'));

app.get('/', function(req,res) {
	res.sendfile('client/index.html');
});

var game = new Game(socketServer);

server.listen(process.env.PORT, process.env.IP);

console.log('Server started');



/**
Length of a tick in milliseconds. The denominator is your desired framerate.
e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
*/
var tickLengthMs = 1000 / 30;

/* gameLoop related variables */
// timestamp of each loop
var previousTick = Date.now();
// number of times gameLoop gets called
var actualTicks = 0;

var gameLoop = function () {
  var now = Date.now()

  actualTicks++
  if (previousTick + tickLengthMs <= now) {
    var delta = (now - previousTick) / 1000;
    previousTick = now;

    game.update(delta);

    //console.log('delta', delta, '(target: ' + tickLengthMs +' ms)', 'node ticks', actualTicks);
    actualTicks = 0;
  }

  if (Date.now() - previousTick < tickLengthMs - 16) {
    setTimeout(gameLoop);
  } else {
    setImmediate(gameLoop);
  }
}

// begin the loop !
gameLoop();
console.log('Game loop started');