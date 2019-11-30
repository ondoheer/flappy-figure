export interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  yVelocity: number;
  xVelocity: number;

  update(ctx: CanvasRenderingContext2D, progress: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
}
