/// <reference path="../vendor/phaser.d.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/World.ts'/>

module ProjectUtopia {
  export class Game extends Phaser.Game {
    constructor() {
      super(640, 480, Phaser.AUTO, 'game-div');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('world', State.World);

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var game = new ProjectUtopia.Game();
}