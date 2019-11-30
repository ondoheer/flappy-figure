import { Entity } from "./Entity.js";
import { state } from "../state.js";

export class Flappy implements Entity {
  x: number;
  y: number;

  maxJumpHeight: number;
  height: number;
  width: number;
  color: string;
  speed: number;
  xVelocity: number;
  yVelocity: number;
  _state: { isJumping: boolean; lastJumpPosition: number };

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
    speed: number
  ) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = 0.3;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.maxJumpHeight = 100;
    this._state = {
      isJumping: false,
      lastJumpPosition: y
    };
  }
  jump(): void {
    if (!this.reachedMaxJump()) {
      this._state.isJumping = true;
      this._state.lastJumpPosition = this.y;
      this.yVelocity = -this.speed;
    }
  }

  reachedMaxJump(): boolean {
    return this.y <= this._state.lastJumpPosition - this.maxJumpHeight;
  }

  fall(): void {
    this._state.isJumping = false;
    this.yVelocity = this.speed;
  }

  die(): void {
    state.lost = true;
  }
  checkCollision(ctx: CanvasRenderingContext2D): void {
    // check if hit the ground
    if (this.y + this.height > ctx.canvas.height) {
      this.die();
    }
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update(ctx, progress): void {
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
