var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Entity = require('./entity');

var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.apply(this, arguments);
    }
    return Player;
})(Entity);

module.exports = Player;
//# sourceMappingURL=player.js.map
