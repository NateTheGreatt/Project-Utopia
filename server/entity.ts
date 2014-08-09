import Game = require('./game');
class Entity {
  
  x: number;
  y: number;
  
  width: number;
  height: number;
  
  speed: number = 50;
  
  facing: string;
  
  id: string;
  name: string;
  
  pendingInputs: any[];
  lastProcessedInput: number;
  
  io: any;
  
  constructor(x:number, y:number, width:number, height:number, id:string, io:any) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
    this.io = io;
    console.log('Entity '+id+' entered the world at ('+x+','+y+')');
    
    this.pendingInputs = [];
  }
  
  moveTo(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
  
  addInput(input) {
    this.pendingInputs.push(input);
  }
  
  applyInput(input) {
    this.lastProcessedInput = input.sequenceNumber;
    var distance = this.speed*input.deltaTime;
    if(input.up) {
      this.facing = 'up';
      this.y -= distance;
    }
    if(input.down) {
      this.facing = 'down';
      this.y += distance;
    }
    if(input.left) {
      this.facing = 'left';
      this.x -= distance;
    }
    if(input.right) {
      this.facing = 'right';
      this.x += distance;
    }
    // console.log(this.x, this.y);
  }
  
  processInputs() {
    while(true) {
      var input = this.pendingInputs.pop();
      // TODO: verify input before applying
      if(input == undefined) break;
      else this.applyInput(input);
    }
  }
  
  setName(n) {
    this.name = n;
  }
  
  update() {
    this.processInputs();
    this.worldBounds();
    this.sendWorldState();
    // this.applyMovement();
  }
  
  sendWorldState() {
    //console.log(this.packet());
    // TODO: detect if any inputs were processed during this game loop before sending packet
    this.io.sockets.emit('player moved', this.packet());
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
    var packet = {
      x: this.x,
      y: this.y,
      id: this.id,
      sequenceNumber: this.lastProcessedInput,
      direction: {
        up: false,
        down: false,
        left: false,
        right: false
      }
    };
    if(this.facing == 'up') packet.direction.up = true;
    if(this.facing == 'down') packet.direction.down = true;
    if(this.facing == 'left') packet.direction.left = true;
    if(this.facing == 'right') packet.direction.right = true;
    return packet;
  }
}

export = Entity;