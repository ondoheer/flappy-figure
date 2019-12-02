import { Entity } from "./Entity.js";
import { state } from "../state.js";
import { CONFIG } from "../config.js";

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

  constructor(height: number, width: number, color: string, speed: number) {
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

  place(x: number, y: number): void {
    this.x = x;
    this.y = y;
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

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update(ctx, progress): void {
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
