import { Entity } from "./Entity.js";

export class Pole implements Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  yVelocity: number;
  xVelocity: number;

  constructor(height: number, width: number, color: string, speed: number) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = 0.3;
    this.xVelocity = 0;
    this.yVelocity = 0;
  }

  slide(): void {
    this.xVelocity = this.speed;
  }
  update(ctx: CanvasRenderingContext2D, progress: number): void {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
