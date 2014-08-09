var Entity = (function () {
    function Entity(x, y, width, height, id, io) {
        this.speed = 3;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
        this.io = io;
        console.log('Entity ' + id + ' entered the world at (' + x + ',' + y + ')');

        this.xMove = 0;
        this.yMove = 0;
    }
    Entity.prototype.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Entity.prototype.direct = function (directions) {
        if (directions.up)
            this.yMove--;
        if (directions.down)
            this.yMove++;
        if (directions.left)
            this.xMove--;
        if (directions.right)
            this.xMove++;
    };

    Entity.prototype.setName = function (n) {
        this.name = n;
    };

    Entity.prototype.update = function () {
        this.applyMovement();
    };

    Entity.prototype.applyMovement = function () {
        var data = {
            x: 0,
            y: 0,
            id: this.id,
            direction: {
                up: false,
                down: false,
                left: false,
                right: false
            }
        };
        var changed = false;

        if (this.yMove < 0) {
            this.y -= this.speed;
            this.yMove++;
            changed = true;
            data.direction.up = true;
        } else if (this.yMove > 0) {
            this.y += this.speed;
            this.yMove--;
            changed = true;
            data.direction.down = true;
        }

        if (this.xMove < 0) {
            this.x -= this.speed;
            this.xMove++;
            changed = true;
            data.direction.left = true;
        } else if (this.xMove > 0) {
            this.x += this.speed;
            this.xMove--;
            changed = true;
            data.direction.right = true;
        }

        this.worldBounds();
        if (changed) {
            data.x = this.x;
            data.y = this.y;
            this.io.sockets.emit('player moved', data);
        }
    };

    Entity.prototype.worldBounds = function () {
        if (this.x + this.width > 640) {
            this.x = 640 - this.width;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y + this.height > 480) {
            this.y = 480 - this.height;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
    };

    Entity.prototype.packet = function () {
        return {};
    };
    return Entity;
})();

module.exports = Entity;
//# sourceMappingURL=entity.js.map
