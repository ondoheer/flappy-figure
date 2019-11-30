import { state } from "../state.js";
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
        this.maxJumpHeight = 75;
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
        return this.y <= this._state.lastJumpPosition - this.maxJumpHeight;
    }
    fall() {
        this._state.isJumping = false;
        this.yVelocity = this.speed;
    }
    die() {
        state.lost = true;
    }
    checkCollision(ctx) {
        // check if hit the ground
        if (this.y + this.height > ctx.canvas.height) {
            this.die();
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(ctx, progress) {
        this.checkCollision(ctx);
        if (this.reachedMaxJump()) {
            this.fall();
        }
        // comment this block if you don't want it to start falling
        if (!this._state.isJumping) {
            this.fall();
        }
        // update position
        this.y += this.yVelocity * progress;
        this.x += this.xVelocity * progress;
    }
}
//# sourceMappingURL=Flappy.js.map