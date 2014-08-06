var Player = require('./player');

var Game = (function () {
    function Game(socketServer) {
        this.io = socketServer;
        this.players = [];
        this.setEventHandlers();
    }
    Game.prototype.setEventHandlers = function () {
        var game = this;

        this.io.sockets.on('connection', function (client) {
            console.log('Player connected: ' + client.id);

            client.on('disconnect', function (payload) {
            });
            client.on('newPlayer', function (payload) {
                var eggBoy = new Player(payload.x, payload.y, payload.id);
                game.players.push(eggBoy);
                client.emit('player joined', payload);
            });
            client.on('movePlayer', function (payload) {
                console.log(game.players[0]);
                var player = game.players[0];
                player.moveTo(payload.x, payload.y);
                client.emit('player moved', { x: player.x, y: player.y });
            });
        });
    };
    return Game;
})();
exports.Game = Game;
//# sourceMappingURL=game.js.map
