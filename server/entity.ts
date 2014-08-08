import Game = require('./game');
class Entity {
  
  x: number;
  y: number;
  
  width: number = 20;
  height: number = 20;
  
  speed: number = 5;
  
  up: number;
  down: number;
  left: number;
  right: number;
  
  id: string;
  name: string;
  
  io: any;
  
  constructor(x:number, y:number, id:string, io:any) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.io = io;
    console.log('Entity '+id+' entered the world at ('+x+','+y+')');
    
    this.up = 0;
    this.down = 0;
    this.left = 0;
    this.right = 0;
  }
  
  moveTo(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
  
  direct(directions) {
    if(directions.up) this.up++;
    if(directions.down) this.down++;
    if(directions.left) this.left++;
    if(directions.right) this.right++;
  }
  
  setName(n) {
    this.name = n;
  }
  
  update() {
    this.applyMovement();
  }
  
  applyMovement() {
    var changed = false;
    if(this.up > 0) {
      this.y -= this.speed;
      this.up--;
      changed = true;
      console.log('up');
    }
    if(this.down > 0) {
      this.y += this.speed;
      this.down--;
      changed = true;
      console.log('down');
    }
    if(this.left > 0) {
      this.x -= this.speed;
      this.left--;
      changed = true;
      console.log('left');
    }
    if(this.right > 0) {
      this.x += this.speed;
      this.right--;
      changed = true;
      console.log('right');
    }
    if(changed) {
      console.log(this.id, this.x, this.y);
      this.io.sockets.emit('player moved', {x: this.x, y: this.y, id: this.id});
    }
  }
  
  packet() {
    return {};
  }
}

export = Entity;