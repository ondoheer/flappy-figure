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
  jumped: boolean;

  constructor(height: number, width: number, color: string, speed: number) {
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
  place(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  resetPosition(): void {
    this.place(0, 0);
  }
  // Unused because is doesn't recognize it as member of Pole
  static randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateHeight(): number {
    return Pole.randomRange(250, 450);
  }
  reconfigure(): void {
    this.resetPosition();
    this.height = Pole.generateHeight();
    this.speed += 0.01;
    this.slide();
    this.jumped = false;
  }
  slide(): void {
    this.xVelocity = this.speed;
  }
  update(ctx: CanvasRenderingContext2D, progress: number): void {
    this.x += this.xVelocity * progress;
    this.y += this.yVelocity * progress;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
