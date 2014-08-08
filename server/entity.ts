import Game = require('./game');
class Entity {
  
  x: number;
  y: number;
  
  width: number = 20;
  height: number = 20;
  
  speed: number = 5;
  
  id: string;
  name: string;
  
  io: any;
  
  constructor(x:number, y:number, id:string, io:any) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.io = io;
  }
  
  moveTo(x:number, y:number) {
    this.x = x;
    this.y = y;
  }
  
  move(directions) {
    if(directions.indexOf('up') > -1) this.y -= this.speed;
    if(directions.indexOf('down') > -1) this.y += this.speed;
    if(directions.indexOf('left') > -1) this.x -= this.speed;
    if(directions.indexOf('right') > -1) this.x += this.speed;
    this.io.sockets.emit('player moved', {x: this.x, y: this.y, id: this.id});
    console.log('player moved: ('+this.x+','+this.y+')')
  }
  
  setName(n) {
    this.name = n;
  }
  
  update() {
    
  }
  
  packet() {
    return {};
  }
}

export = Entity;