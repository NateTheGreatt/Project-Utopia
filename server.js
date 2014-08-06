var express = require('express');
var http = require('http');
var io = require('socket.io');
var utopia = require('./server/game');

var app = express();

var server = http.createServer(app);
var socketServer = io.listen(server);

app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    console.log('hello');
    res.sendfile('client/index.html');
});

var game = new utopia.Game(socketServer);

server.listen(process.env.PORT, process.env.IP);

console.log('Server started');
//# sourceMappingURL=server.js.map
