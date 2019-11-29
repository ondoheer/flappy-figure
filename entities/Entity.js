export class Entity {
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
