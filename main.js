define("entities/Entity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor(x, y, width, height, color, speed, direction) {
            this.x = x;
            this.y = y;
            this.yVelocity = 0;
            this.xVelocity = 0;
            this.width = width;
            this.height = height;
            this.color = color;
            this.speed = speed;
            this.direction = direction;
        }
        update() { }
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillCircle(this.x, this.y, this.width, this.height);
        }
    }
    exports.Entity = Entity;
});
define("entities/Flappy", ["require", "exports", "entities/Entity"], function (require, exports, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Flappy extends Entity_1.Entity {
        constructor(x, y, height, width, color, speed, direction) {
            super(x, y, height, width, color, speed, direction);
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    exports.Flappy = Flappy;
});
define("main", ["require", "exports", "entities/Flappy"], function (require, exports, Flappy_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(htmlTag) {
            this.canvas = document.getElementById(htmlTag);
            this.ctx = this.canvas.getContext("2d");
        }
        /**
         * Initializes the controls and loop
         */
        init() { }
        /**
         * Takes care of all the updates
         */
        update() { }
        /**
         * Draws all of the entities
         */
        draw() {
            const flappy = new Flappy_js_1.Flappy(150, 350, 30, 30, "red", 0, "left");
            flappy.draw(this.ctx);
        }
    }
    const game = new Game("mundo");
    game.draw();
});
//# sourceMappingURL=main.js.map