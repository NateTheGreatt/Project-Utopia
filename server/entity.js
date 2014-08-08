var Entity = (function () {
    function Entity(x, y, id, io) {
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.x = x;
        this.y = y;
        this.id = id;
        this.io = io;
        console.log('Entity ' + id + ' entered the world at (' + x + ',' + y + ')');

        this.up = 0;
        this.down = 0;
        this.left = 0;
        this.right = 0;
    }
    Entity.prototype.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Entity.prototype.direct = function (directions) {
        if (directions.up)
            this.up++;
        if (directions.down)
            this.down++;
        if (directions.left)
            this.left++;
        if (directions.right)
            this.right++;
    };

    Entity.prototype.setName = function (n) {
        this.name = n;
    };

    Entity.prototype.update = function () {
        this.applyMovement();
    };

    Entity.prototype.applyMovement = function () {
        var changed = false;
        if (this.up > 0) {
            this.y -= this.speed;
            this.up--;
            changed = true;
            console.log('up');
        }
        if (this.down > 0) {
            this.y += this.speed;
            this.down--;
            changed = true;
            console.log('down');
        }
        if (this.left > 0) {
            this.x -= this.speed;
            this.left--;
            changed = true;
            console.log('left');
        }
        if (this.right > 0) {
            this.x += this.speed;
            this.right--;
            changed = true;
            console.log('right');
        }
        if (changed) {
            console.log(this.id, this.x, this.y);
            this.io.sockets.emit('player moved', { x: this.x, y: this.y, id: this.id });
        }
    };

    Entity.prototype.packet = function () {
        return {};
    };
    return Entity;
})();

module.exports = Entity;
//# sourceMappingURL=entity.js.map
