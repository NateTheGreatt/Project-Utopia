import Game = require('./game');
class Entity {
  
  x: number;
  y: number;
  
  width: number;
  height: number;
  
  speed: number = 3;
  
  xMove: number;
  yMove: number;
  
  id: string;
  name: string;
  
  io: any;
  
  constructor(x:number, y:number, width:number, height:number, id:string, io:any) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
    this.io = io;
    console.log('Entity '+id+' entered the world at ('+x+','+y+')');
    
    this.xMove = 0;
    this.yMove = 0;
  }
  
  moveTo(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
  
  direct(directions) {
    if(directions.up) this.yMove--;
    if(directions.down) this.yMove++;
    if(directions.left) this.xMove--;
    if(directions.right) this.xMove++;
  }
  
  setName(n) {
    this.name = n;
  }
  
  update() {
    this.applyMovement();
  }
  
  applyMovement() {
    var data = {
      x: 0,
      y: 0,
      id: this.id,
      direction: {
        up: false,
        down: false,
        left: false,
        right: false,
      }
    };
    var changed = false;
    
    // up
    if(this.yMove < 0) {
      this.y -= this.speed;
      this.yMove++;
      changed = true;
      data.direction.up = true;
    } else if(this.yMove > 0) { // down
      this.y += this.speed;
      this.yMove--;
      changed = true;
      data.direction.down = true;
    }
    
    // left
    if(this.xMove < 0) {
      this.x -= this.speed;
      this.xMove++;
      changed = true;
      data.direction.left = true;
    } else if(this.xMove > 0) { // right
      this.x += this.speed;
      this.xMove--;
      changed = true;
      data.direction.right = true;
    }
    
    this.worldBounds();
    
    if(changed) {
      //console.log(this.id, this.x, this.y);
      data.x = this.x;
      data.y = this.y;
      this.io.sockets.emit('player moved', data);
    }
  }
  
  worldBounds() {
    if(this.x+this.width > 640) {
      this.x = 640 - this.width;
    }
    if(this.x <= 0) {
      this.x = 0;
    }
    if(this.y+this.height > 480) {
      this.y = 480 - this.height;
    }
    if(this.y <= 0) {
      this.y = 0;
    }
  }
  
  packet() {
    return {};
  }
}

export = Entity;