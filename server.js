var express = require('express');
var http = require('http');
var io = require('socket.io');
var Game = require('./server/game');

var app = express();
var server = http.createServer(app);
var socketServer = io.listen(server);

app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.sendfile('client/index.html');
});

var game = new Game(socketServer);

server.listen(process.env.PORT, process.env.IP);

console.log('Server started');

var tickLengthMs = 1000 / 30;

var previousTick = Date.now();

var actualTicks = 0;

var gameLoop = function () {
    var now = Date.now();

    actualTicks++;
    if (previousTick + tickLengthMs <= now) {
        var delta = (now - previousTick) / 1000;
        previousTick = now;

        game.update(delta);

        actualTicks = 0;
    }

    if (Date.now() - previousTick < tickLengthMs - 16) {
        setTimeout(gameLoop);
    } else {
        setImmediate(gameLoop);
    }
};

gameLoop();
console.log('Game loop started');
//# sourceMappingURL=server.js.map
