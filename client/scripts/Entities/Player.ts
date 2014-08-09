module ProjectUtopia.Entity {
  export class Player extends Entity {
    
    upKey: any;
    downKey: any;
    leftKey: any;
    rightKey: any;


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
        
        if(this.upKey.isDown) {
          // this.animations.play('walkUp');
          this.facing = 'up';
        }
        else if(this.downKey.isDown) {
          // this.animations.play('walkDown');
          this.facing = 'down';
        }
        else if(this.leftKey.isDown) {
          // this.animations.play('walkLeft');
          this.facing = 'left';
        }
        else if(this.rightKey.isDown) {
          // this.animations.play('walkRight');
          this.facing = 'right';
        }
      } else {
        /*if(this.facing == 'up') this.animations.play('idleUp');
        if(this.facing == 'down') this.animations.play('idleDown');
        if(this.facing == 'left') this.animations.play('idleLeft');
        if(this.facing == 'right') this.animations.play('idleRight');*/
      }

      if(this.game.input.mousePointer.isDown) {

      }
      

    }

    packet() {
      return {x: this.x, y: this.y, width: this.width, height: this.height, id: Game.socket.io.engine.id, name: this.name};
    }
  }
}