module ProjectUtopia.Entity {
  export class Entity extends Phaser.Sprite {
    
    id: string;
    name: string;
    
    game: Phaser.Game;
    
    constructor(game:Phaser.Game, x:number, y:number, id:string, name:string = 'Entity') {
      super(game,x,y,'entity');
      this.game = game;
      this.id = id;
      this.name = name;
      this.exists = false; // start dead in the pool
    }
    
    update() {
      
    }
  }
}