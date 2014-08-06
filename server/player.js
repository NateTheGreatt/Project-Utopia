var Player = (function () {
    function Player(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }
    Player.prototype.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Player;
})();

module.exports = Player;
//# sourceMappingURL=player.js.map
