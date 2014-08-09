module ProjectUtopia.Entity {
  export class Entity extends Phaser.Sprite {
    
    id: string;
    name: string;
    
    game: Phaser.Game;
    
    facing: string;

    prevX: number;
    prevY: number;
    
    up: number;
    down: number;
    left: number;
    right: number;
    
    moved: number;
    
    speed: number = 5;
    
    fps: number = 15;
    
    constructor(game:Phaser.Game, x:number, y:number, id:string, name:string = 'Entity') {
      super(game,x,y,'entity');
      this.game = game;
      this.id = id;
      this.name = name;
      this.exists = false; // start dead in the pool
      this.width = 64;
      this.height = 64;
      
      this.moved = 0;
      
      this.animations.add('walkUp', [0,1,2,3,4,5,6,7,8], this.fps, true);
      this.animations.add('walkLeft', [9,10,11,12,13,14,15,16,17], this.fps, true);
      this.animations.add('walkDown', [18,19,20,21,22,23,24,25,26], this.fps, true);
      this.animations.add('walkRight', [27,28,29,30,31,32,33,34,35], this.fps, true);
      this.animations.add('idleUp', [0], this.fps, true);
      this.animations.add('idleDown', [18], this.fps, true);
      this.animations.add('idleLeft', [9], this.fps, true);
      this.animations.add('idleRight', [27], this.fps, true);
      
    }
    
    update() {
      if(this.moved == 0) {
        if(this.facing == 'up') this.animations.play('idleUp');
        if(this.facing == 'down') this.animations.play('idleDown');
        if(this.facing == 'left') this.animations.play('idleLeft');
        if(this.facing == 'right') this.animations.play('idleRight');
      }
      
      if(this.moved > 0) {
        if(this.facing == 'up') this.animations.play('walkUp');
        if(this.facing == 'down') this.animations.play('walkDown');
        if(this.facing == 'left') this.animations.play('walkLeft');
        if(this.facing == 'right') this.animations.play('walkRight');
        this.moved--;
      }
      
      // don't let this number get too high or else it will continue the walking
      // animation even though the sprite isn't moving
      if(this.moved > 6) this.moved = 6;
    }
    
    moveTo(x:number, y:number) {
      // add 3 to moved because the client FPS is faster than the server's
      // so it will deduct from moved a lot faster
      this.moved += 3;
      this.x = x;
      this.y = y;
    }
    
    move(direction) {
      if(direction.up) {
        this.facing = 'up';
      }
      if(direction.down) {
        this.facing = 'down';
      }
      if(direction.left) {
        this.facing = 'left';
      }
      if(direction.right) {
        this.facing = 'right';
      }
    }
  }
}