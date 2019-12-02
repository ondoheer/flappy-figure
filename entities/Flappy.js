import { state } from "../state.js";
import { CONFIG } from "../config.js";
export class Flappy {
    constructor(height, width, color, speed) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.maxJumpHeight = 75;
        this.place(CONFIG.canvas.width / 2 - this.width / 2, 350);
        this._state = {
            isJumping: false,
            lastJumpPosition: this.y
        };
    }
    place(x, y) {
        this.x = x;
        this.y = y;
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
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(ctx, progress) {
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