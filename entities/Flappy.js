export class Flappy {
    constructor(x, y, height, width, color, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() { }
}
//# sourceMappingURL=Flappy.js.map