var Entity = (function () {
    function Entity(x, y, width, height, id, io) {
        this.speed = 50;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
        this.io = io;
        console.log('Entity ' + id + ' entered the world at (' + x + ',' + y + ')');

        this.pendingInputs = [];
    }
    Entity.prototype.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Entity.prototype.addInput = function (input) {
        this.pendingInputs.push(input);
    };

    Entity.prototype.applyInput = function (input) {
        this.lastProcessedInput = input.sequenceNumber;
        var distance = this.speed * input.deltaTime;
        if (input.up) {
            this.facing = 'up';
            this.y -= distance;
        }
        if (input.down) {
            this.facing = 'down';
            this.y += distance;
        }
        if (input.left) {
            this.facing = 'left';
            this.x -= distance;
        }
        if (input.right) {
            this.facing = 'right';
            this.x += distance;
        }
    };

    Entity.prototype.processInputs = function () {
        while (true) {
            var input = this.pendingInputs.pop();

            if (input == undefined)
                break;
            else
                this.applyInput(input);
        }
    };

    Entity.prototype.setName = function (n) {
        this.name = n;
    };

    Entity.prototype.update = function () {
        this.processInputs();
        this.worldBounds();
        this.sendWorldState();
    };

    Entity.prototype.sendWorldState = function () {
        this.io.sockets.emit('player moved', this.packet());
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
        var packet = {
            x: this.x,
            y: this.y,
            id: this.id,
            sequenceNumber: this.lastProcessedInput,
            direction: {
                up: false,
                down: false,
                left: false,
                right: false
            }
        };
        if (this.facing == 'up')
            packet.direction.up = true;
        if (this.facing == 'down')
            packet.direction.down = true;
        if (this.facing == 'left')
            packet.direction.left = true;
        if (this.facing == 'right')
            packet.direction.right = true;
        return packet;
    };
    return Entity;
})();

module.exports = Entity;
//# sourceMappingURL=entity.js.map
