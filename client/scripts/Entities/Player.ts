module ProjectUtopia.Entity {
  export class Player extends Entity {
    
    upKey: any;
    downKey: any;
    leftKey: any;
    rightKey: any;

    prevX: number;
    prevY: number;


    constructor(game: Phaser.Game, x: number, y: number) {
      if(this.getHtmlName()) var name = this.getHtmlName();
      else var name = 'player' 
      super(game, x, y, Game.socket.io.engine.id, name);
      
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

      this.exists = true;
      game.add.existing(this);

      Game.socket.emit('newPlayer', this.packet());
    }

    update() {
      this.controls();

      var htmlName = this.getHtmlName();
      if(htmlName != this.name) this.name = htmlName;


      this.prevX = this.x;
      this.prevY = this.y;

      super.update();
    }

    getHtmlName() {
      return (<HTMLInputElement>document.getElementById('name')).value;
    }

    controls() {

      if(this.upKey.isDown || this.downKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {
        Game.socket.emit('movePlayer', {
          id: this.id,
          up: this.upKey.isDown,
          down: this.downKey.isDown,
          left: this.leftKey.isDown,
          right: this.rightKey.isDown
        });
      }

      if(this.game.input.mousePointer.isDown) {

      }
      

    }

    packet() {
      return {x: this.x, y: this.y, id: Game.socket.io.engine.id, name: this.name};
    }
  }
}