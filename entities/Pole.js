export class Pole {
    constructor(height, width, color, speed) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 0.3;
        this.xVelocity = speed;
        this.yVelocity = 0;
        this.jumped = false;
    }
    place(x, y) {
        this.x = x;
        this.y = y;
    }
    resetPosition() {
        this.place(0, 0);
    }
    // Unused because is doesn't recognize it as member of Pole
    static randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static generateHeight() {
        return Pole.randomRange(250, 450);
    }
    reconfigure() {
        this.resetPosition();
        this.height = Pole.generateHeight();
        this.speed += 0.01;
        this.slide();
        this.jumped = false;
    }
    slide() {
        this.xVelocity = this.speed;
    }
    update(ctx, progress) {
        this.x += this.xVelocity * progress;
        this.y += this.yVelocity * progress;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=Pole.js.map