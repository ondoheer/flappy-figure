export class Pole {
    constructor(height, width, color, speed) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 0.3;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    slide() {
        this.xVelocity = this.speed;
    }
    update(ctx, progress) {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=Pole.js.map