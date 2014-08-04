var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
                    _this.game.state.start('main');
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
        function Game() {
            _super.call(this, 640, 480, Phaser.AUTO, 'game-div');

            this.state.add('boot', ProjectUtopia.State.Boot);
            this.state.add('preload', ProjectUtopia.State.Preload);
            this.state.add('menu', ProjectUtopia.State.Menu);
            this.state.add('world', ProjectUtopia.State.World);

            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    ProjectUtopia.Game = Game;
})(ProjectUtopia || (ProjectUtopia = {}));

window.onload = function () {
    var game = new ProjectUtopia.Game();
};
//# sourceMappingURL=main.js.map
