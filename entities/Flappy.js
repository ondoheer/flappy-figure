import { Entity } from "./Entity.js";
export class Flappy extends Entity {
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
//# sourceMappingURL=Flappy.js.map