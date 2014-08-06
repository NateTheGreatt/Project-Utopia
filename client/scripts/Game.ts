/// <reference path="./reference.ts"/>

module ProjectUtopia {
  export class Game extends Phaser.Game {
    
    // static so that the variable is globally available within the Rosemary module
    static socket: any;
    
    constructor(socket) {
      super(640, 480, Phaser.AUTO, 'game-div');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('world', State.World);
      
      Game.socket = socket;
      Game.socket.on('connect', function(){ 
        console.log('Socket Connected with sessionId: '+Game.socket.io.engine.id)
      });
      Game.socket.on('disconnect', function(){
        console.log('Socket disconnected')
      });
      
      // Game.socket.emit('newPlayer', {x: 12, y: 15, id: Game.socket.io.engine.id});

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var socketio = io.connect('https://project-utopia-c9-natethegreatt.c9.io');
  var game = new ProjectUtopia.Game(socketio);
}