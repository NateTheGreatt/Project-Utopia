class Player {
  x: Number;
  y: Number;
  id: String;
  
  constructor(x:Number, y:Number, id:String) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
  
  moveTo(x:Number, y:Number) {
    this.x = x;
    this.y = y;
  }
}

export = Player;