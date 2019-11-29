import { Entity } from "./Entity.js";

export class Flappy implements Entity {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  speed: number;
  xVelocity: number;
  yVelocity: number;

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
    this.speed = speed;
    this.xVelocity = 0;
    this.yVelocity = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {}
}
