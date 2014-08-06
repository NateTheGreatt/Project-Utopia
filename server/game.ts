/// <reference path="./player.ts" />

import Player = require('./player');

export class Game {
    players: Player[];
    io: any; 
    
    
    constructor(socketServer) {
      this.io = socketServer;
      this.players = [];
      this.setEventHandlers();
    }
    
    setEventHandlers() {
      var game = this;
      
      this.io.sockets.on('connection', function (client) {
        console.log('Player connected: ' + client.id);
      
        client.on('disconnect', function(payload) {
       
        });
        client.on('newPlayer', function(payload) {
          var eggBoy: Player = new Player(payload.x, payload.y, <String>payload.id);
          game.players.push(eggBoy);
          client.emit('player joined', payload);
        });
        client.on('movePlayer', function(payload) {
          console.log(game.players[0]);
          var player = <Player>game.players[0];
          player.moveTo(payload.x, payload.y);
          client.emit('player moved', {x: player.x, y: player.y});
        });

      });
    }
    
  }
  

