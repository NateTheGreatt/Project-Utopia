var Entity = require('./entity');
var Player = require('./player');

[Entity, Player];

var Game = (function () {
    function Game(socketServer) {
        this.io = socketServer;
        this.clients = [];
        this.entities = [];

        this.setEventHandlers();
    }
    Game.prototype.setEventHandlers = function () {
        var game = this;

        game.io.sockets.on('connection', function (client) {
            console.log('Player connected: ' + client.id);
            game.clients.push(client.id);

            client.on('disconnect', function (payload) {
                game.removeClient(payload.id);
                client.broadcast.emit('remove player', { id: client.id });
            });
            client.on('newPlayer', function (payload) {
                var eggBoy = new Entity(payload.x, payload.y, payload.id, game.io);
                game.entities.push(eggBoy);
                client.broadcast.emit('player joined', payload);
            });
            client.on('movePlayer', function (payload) {
                var player = game.entityById(payload.id);
                player.direct(payload);
            });
        });
    };

    Game.prototype.removeClient = function (id) {
        var c;
        for (var i = 0; i < this.clients.length; i++) {
            if (c = this.clients.indexOf(id) > -1) {
                this.clients.splice(c, 1);
            }
        }

        this.removeEntity(id);
    };

    Game.prototype.removeEntity = function (id) {
        var e;
        for (var i = 0; i < this.entities.length; i++) {
            if (e = this.entities.indexOf(id) > -1) {
                this.entities.splice(e, 1);
            }
        }
    };

    Game.prototype.entityById = function (id) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].id == id)
                return this.entities[i];
        }
    };

    Game.prototype.update = function (delta) {
        this.updateEntities();
    };

    Game.prototype.updateEntities = function () {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    };
    return Game;
})();

module.exports = Game;
//# sourceMappingURL=game.js.map
