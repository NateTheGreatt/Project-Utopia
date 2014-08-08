var Entity = (function () {
    function Entity(x, y, id, io) {
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.x = x;
        this.y = y;
        this.id = id;
        this.io = io;
    }
    Entity.prototype.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Entity.prototype.move = function (directions) {
        if (directions.indexOf('up') > -1)
            this.y -= this.speed;
        if (directions.indexOf('down') > -1)
            this.y += this.speed;
        if (directions.indexOf('left') > -1)
            this.x -= this.speed;
        if (directions.indexOf('right') > -1)
            this.x += this.speed;
        this.io.sockets.emit('player moved', { x: this.x, y: this.y, id: this.id });
        console.log('player moved: (' + this.x + ',' + this.y + ')');
    };

    Entity.prototype.setName = function (n) {
        this.name = n;
    };

    Entity.prototype.update = function () {
    };

    Entity.prototype.packet = function () {
        return {};
    };
    return Entity;
})();

module.exports = Entity;
//# sourceMappingURL=entity.js.map
