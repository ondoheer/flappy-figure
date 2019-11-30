export class Flappy {
    constructor(x, y, height, width, color, speed) {
        this.x = x;
        this.y = y;
        this.baseXAxis = x;
        this.baseYAxis = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.maxJumpHeight = 100;
        this._state = {
            isJumping: false,
            lastJumpPosition: y
        };
    }
    jump() {
        if (!this.reachedMaxJump()) {
            this._state.isJumping = true;
            this._state.lastJumpPosition = this.y;
            this.yVelocity = -this.speed;
        }
    }
    reachedMaxJump() {
        // starts y: 350
        // lastJumpPosition: 350
        // maxJumHeight: 100
        console.log(`${this.y}  ${this._state.lastJumpPosition - this.maxJumpHeight}`);
        return this.y <= this._state.lastJumpPosition - this.maxJumpHeight;
    }
    fall() {
        this._state.isJumping = false;
        this.yVelocity = this.speed;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.reachedMaxJump()) {
            console.log("reached max height");
            this.fall();
        }
        if (!this.reachedMaxJump() && !this._state.isJumping) {
            this.jump();
        }
        this.y += this.yVelocity;
        this.x += this.xVelocity;
    }
}
//# sourceMappingURL=Flappy.js.map