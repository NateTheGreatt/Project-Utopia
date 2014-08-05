///<reference path="./d.ts/node.d.ts" />
///<reference path="./d.ts/socket.io.d.ts" />
///<reference path="./d.ts/express.d.ts" />
///<reference path="./d.ts/phaser.d.ts" />

import express = require('express');
import http = require('http');
import io = require('socket.io');
import game = require('./server/game');
import phaser = require('phaser');
var app = express();
var server = http.createServer(app);
var socketServer = io.listen(server); 
var window = {};
 
console.log(Phaser);

app.use(express.static(__dirname + '/client'));

app.get('/', function(req,res) {
	res.sendfile('client/index.html');
})


socketServer.set('log level', 1);
//game.initialize(socketServer);


server.listen(3000);
console.log("Starting server on port 3000");