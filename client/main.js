var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ProjectUtopia;
(function (ProjectUtopia) {
    (function (_Entity) {
        var Entity = (function (_super) {
            __extends(Entity, _super);
            function Entity(game, x, y, id, name) {
                if (typeof name === "undefined") { name = 'Entity'; }
                _super.call(this, game, x, y, 'entity');
                this.speed = 5;
                this.fps = 15;
                this.game = game;
                this.id = id;
                this.name = name;
                this.exists = false;
                this.width = 64;
                this.height = 64;

                this.moved = 0;

                this.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], this.fps, true);
                this.animations.add('walkLeft', [9, 10, 11, 12, 13, 14, 15, 16, 17], this.fps, true);
                this.animations.add('walkDown', [18, 19, 20, 21, 22, 23, 24, 25, 26], this.fps, true);
                this.animations.add('walkRight', [27, 28, 29, 30, 31, 32, 33, 34, 35], this.fps, true);
                this.animations.add('idleUp', [0], this.fps, true);
                this.animations.add('idleDown', [18], this.fps, true);
                this.animations.add('idleLeft', [9], this.fps, true);
                this.animations.add('idleRight', [27], this.fps, true);
            }
            Entity.prototype.update = function () {
                if (this.moved == 0) {
                    if (this.facing == 'up')
                        this.animations.play('idleUp');
                    if (this.facing == 'down')
                        this.animations.play('idleDown');
                    if (this.facing == 'left')
                        this.animations.play('idleLeft');
                    if (this.facing == 'right')
                        this.animations.play('idleRight');
                    console.log('idle');
                }

                if (this.moved > 0) {
                    if (this.facing == 'up')
                        this.animations.play('walkUp');
                    if (this.facing == 'down')
                        this.animations.play('walkDown');
                    if (this.facing == 'left')
                        this.animations.play('walkLeft');
                    if (this.facing == 'right')
                        this.animations.play('walkRight');
                    this.moved--;
                    console.log('moving');
                }

                if (this.moved > 6)
                    this.moved = 6;
            };

            Entity.prototype.moveTo = function (x, y) {
                this.moved += 3;
                this.x = x;
                this.y = y;
            };

            Entity.prototype.move = function (direction) {
                if (direction.up) {
                    this.facing = 'up';
                }
                if (direction.down) {
                    this.facing = 'down';
                }
                if (direction.left) {
                    this.facing = 'left';
                }
                if (direction.right) {
                    this.facing = 'right';
                }
            };
            return Entity;
        })(Phaser.Sprite);
        _Entity.Entity = Entity;
    })(ProjectUtopia.Entity || (ProjectUtopia.Entity = {}));
    var Entity = ProjectUtopia.Entity;
})(ProjectUtopia || (ProjectUtopia = {}));
var ProjectUtopia;
(function (ProjectUtopia) {
    (function (Entity) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                if (this.getHtmlName())
                    var name = this.getHtmlName();
                else
                    var name = 'player';
                _super.call(this, game, x, y, ProjectUtopia.Game.socket.io.engine.id, name);

                this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
                this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

                this.exists = true;
                game.add.existing(this);

                ProjectUtopia.Game.socket.emit('newPlayer', this.packet());
            }
            Player.prototype.update = function () {
                this.controls();

                var htmlName = this.getHtmlName();
                if (htmlName != this.name)
                    this.name = htmlName;

                _super.prototype.update.call(this);
            };

            Player.prototype.getHtmlName = function () {
                return document.getElementById('name').value;
            };

            Player.prototype.controls = function () {
                if (this.upKey.isDown || this.downKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {
                    ProjectUtopia.Game.socket.emit('movePlayer', {
                        id: this.id,
                        up: this.upKey.isDown,
                        down: this.downKey.isDown,
                        left: this.leftKey.isDown,
                        right: this.rightKey.isDown
                    });

                    if (this.upKey.isDown) {
                        this.facing = 'up';
                    } else if (this.downKey.isDown) {
                        this.facing = 'down';
                    } else if (this.leftKey.isDown) {
                        this.facing = 'left';
                    } else if (this.rightKey.isDown) {
                        this.facing = 'right';
                    }
                } else {
                }

                if (this.game.input.mousePointer.isDown) {
                }
            };

            Player.prototype.packet = function () {
                return { x: this.x, y: this.y, width: this.width, height: this.height, id: ProjectUtopia.Game.socket.io.engine.id, name: this.name };
            };
            return Player;
        })(Entity.Entity);
        Entity.Player = Player;
    })(ProjectUtopia.Entity || (ProjectUtopia.Entity = {}));
    var Entity = ProjectUtopia.Entity;
})(ProjectUtopia || (ProjectUtopia = {}));
var ProjectUtopia;
(function (ProjectUtopia) {
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/preload-bar.png');
            };

            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0xFFFFFF;

                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(ProjectUtopia.State || (ProjectUtopia.State = {}));
    var State = ProjectUtopia.State;
})(ProjectUtopia || (ProjectUtopia = {}));
var ProjectUtopia;
(function (ProjectUtopia) {
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
                this.load.setPreloadSprite(this.preloadBar);

                this.load.image('menu-background', 'assets/images/menu-background.png');
                this.load.spritesheet('entity', 'assets/images/male_walkcycle.png', 64, 64, 36);
            };

            Preload.prototype.create = function () {
                this.game.state.start('menu');
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(ProjectUtopia.State || (ProjectUtopia.State = {}));
    var State = ProjectUtopia.State;
})(ProjectUtopia || (ProjectUtopia = {}));
var ProjectUtopia;
(function (ProjectUtopia) {
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.create = function () {
                var _this = this;
                this.background = this.add.sprite(0, 0, 'menu-background');
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('world');
                });
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(ProjectUtopia.State || (ProjectUtopia.State = {}));
    var State = ProjectUtopia.State;
})(ProjectUtopia || (ProjectUtopia = {}));
var ProjectUtopia;
(function (ProjectUtopia) {
    (function (State) {
        var World = (function (_super) {
            __extends(World, _super);
            function World() {
                _super.apply(this, arguments);
            }
            World.prototype.create = function () {
                this.stage.backgroundColor = 0x000000;
                this.stage.disableVisibilityChange = true;

                this.entityPool = [];
                this.worldGroup = this.game.add.group();
                for (var i = 0; i < 100; i++)
                    this.entityPool.push(new ProjectUtopia.Entity.Entity(this.game, 0, 0, 'entity'));
                this.player = new ProjectUtopia.Entity.Player(this.game, 10, 10);

                this.setEventHandlers();
            };

            World.prototype.update = function () {
                this.scanEntityPool();
            };

            World.prototype.scanEntityPool = function () {
                for (var i = this.entityPool.length - 1; i >= 0; i--) {
                    if (this.entityPool[i].exists)
                        this.spawnEntityFromPool(i);
                }
            };

            World.prototype.spawnEntityFromPool = function (i) {
                this.worldGroup.add(this.entityPool.splice(i, 1)[0]);
            };

            World.prototype.setEventHandlers = function () {
                var main = this;

                ProjectUtopia.Game.socket.on('player joined', function (data) {
                    console.log('Player ' + data.name + ' entered world: (' + data.x + ',' + data.y + ') ' + data.id);

                    for (var i = 0; i < main.entityPool.length; i++) {
                        if (!main.entityPool[i].exists) {
                            console.log('new guy');
                            main.entityPool[i].id = data.id;
                            main.entityPool[i].name = data.name;

                            main.entityPool[i].x = data.x;
                            main.entityPool[i].y = data.y;
                            main.entityPool[i].exists = true;
                            break;
                        }
                    }
                });

                ProjectUtopia.Game.socket.on('player moved', function (data) {
                    if (data.id == ProjectUtopia.Game.socket.io.engine.id) {
                        main.player.moveTo(data.x, data.y);
                    } else {
                        main.worldGroup.forEach(function (ent) {
                            if (data.id == ent.id) {
                                ent.moveTo(data.x, data.y);
                                ent.move(data.direction);
                                ent.name = data.name;
                            }
                        }, 'this', true);
                    }
                });

                ProjectUtopia.Game.socket.on('remove player', function (data) {
                    main.worldGroup.forEach(function (ent) {
                        if (data.id == ent.id) {
                            ent.kill();
                            console.log(ent.name + ' left the server');
                        }
                    }, 'this', true);
                });
            };
            return World;
        })(Phaser.State);
        State.World = World;
    })(ProjectUtopia.State || (ProjectUtopia.State = {}));
    var State = ProjectUtopia.State;
})(ProjectUtopia || (ProjectUtopia = {}));
var ProjectUtopia;
(function (ProjectUtopia) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(socket) {
            _super.call(this, 640, 480, Phaser.CANVAS, 'game-div');

            this.state.add('boot', ProjectUtopia.State.Boot);
            this.state.add('preload', ProjectUtopia.State.Preload);
            this.state.add('menu', ProjectUtopia.State.Menu);
            this.state.add('world', ProjectUtopia.State.World);

            Game.socket = socket;
            Game.socket.on('connect', function () {
                console.log('Socket Connected with sessionId: ' + Game.socket.io.engine.id);
            });
            Game.socket.on('disconnect', function () {
                console.log('Socket disconnected');
            });

            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    ProjectUtopia.Game = Game;
})(ProjectUtopia || (ProjectUtopia = {}));

window.onload = function () {
    var socketio = io.connect('https://project-utopia-c9-natethegreatt.c9.io');
    var game = new ProjectUtopia.Game(socketio);
};
//# sourceMappingURL=main.js.map
