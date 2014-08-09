module ProjectUtopia.Entity {
  export class Player extends Entity {
    
    upKey: any;
    downKey: any;
    leftKey: any;
    rightKey: any;
    
    inputSequenceNumber: number;
    pendingInputs: any[];
    
    last_ts: number;


    constructor(game: Phaser.Game, x: number, y: number) {
      if(this.getHtmlName()) var name = this.getHtmlName();
      else var name = 'player' 
      super(game, x, y, Game.socket.io.engine.id, name);
      
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

      this.exists = true;
      //game.worldGroup.add.existing(this);
      
      this.inputSequenceNumber = 0;
      this.pendingInputs = [];
      
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
        this.inputSequenceNumber++;
        
        var dt = this.game.time.elapsed/1000;
        
        var input = {
          id: this.id,
          deltaTime: dt,
          up: false,
          down: false,
          left: false,
          right: false,
          sequenceNumber: this.inputSequenceNumber
        };
        if(this.upKey.isDown) input.up = true;
        if(this.downKey.isDown) input.down = true;
        if(this.leftKey.isDown) input.left = true;
        if(this.rightKey.isDown) input.right = true;
        
        Game.socket.emit('movePlayer', {
          id: this.id,
          input: input
        });
        this.applyInput(input);
        // add to pending to be reconciled
        this.pendingInputs.push(input);
      }

      if(this.game.input.mousePointer.isDown) {

      }
      

    }
    
    processInputs(payload) {
      var j = 0;
      while (j < this.pendingInputs.length) {
        var input = this.pendingInputs[j];
        if(input != undefined) {
          if (input.sequenceNumber <= payload.sequenceNumber) {
            // Already processed. Its effect is already taken into account
            // into the world update we just got, so we can drop it.
            this.pendingInputs.splice(j, 1);
          } else {
            // Not processed by the server yet. Re-apply it.
            this.applyServerInput(input, payload);
            j++;
          }
        }
      }
    }
    
    applyServerInput(input, payload) {
      this.moveTo(payload.x, payload.y);
      if(input.up) {
        this.facing = 'up';
      }
      else if(input.down) {
        this.facing = 'down';
      }
      else if(input.left) {
        this.facing = 'left';
      }
      else if(input.right) {
        this.facing = 'right';
      }
    }
    
    applyInput(input) {
      if(input.up) {
        // this.animations.play('walkUp');
        this.facing = 'up';
        this.y -= this.speed*input.deltaTime;
      }
      else if(input.down) {
        // this.animations.play('walkDown');
        this.facing = 'down';
        this.y += this.speed*input.deltaTime;
      }
      else if(input.left) {
        // this.animations.play('walkLeft');
        this.facing = 'left';
        this.x -= this.speed*input.deltaTime;
      }
      else if(input.right) {
        // this.animations.play('walkRight');
        this.facing = 'right';
        this.x += this.speed*input.deltaTime;
      }
      this.moved += 1;
    }

    packet() {
      return {
        x: this.x, 
        y: this.y, 
        width: this.width, 
        height: this.height, 
        id: this.id, 
        name: this.name
      };
    }
  }
}