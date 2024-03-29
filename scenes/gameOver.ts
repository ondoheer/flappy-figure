export const gameOver = (
  ctx: CanvasRenderingContext2D,
  text: string = "Game Over",
  x: number,
  y: number
): void => {
  ctx.font = "50px serif";
  ctx.fillStyle = "#f00";
  ctx.fillText(text, x, y);
};
