import { Flappy } from "./entities/Flappy.js";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastRender: number;
  constructor(htmlTag: string) {
    this.canvas = this.createCanvas(htmlTag);
    this.ctx = this.canvas.getContext("2d");
    this.lastRender = 0;
  }
  private createCanvas(htmlTag: string): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;
    canvas.id = "mundo";
    const parent = document.getElementById(htmlTag);
    parent.appendChild(canvas);
    return canvas;
  }
  /**
   * Initializes the controls and loop
   */
  init(): void {
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Takes care of all the updates
   */
  private update(progress: number): void {}

  /**
   * Draws all of the entities
   */
  private draw(): void {
    const flappy = new Flappy(150, 350, 30, 30, "red", 0);
    flappy.draw(this.ctx);
  }

  private loop(timestamp: number): void {
    let progress = timestamp - this.lastRender;

    this.update(progress);
    this.draw();

    this.lastRender = timestamp;
    const requestId = window.requestAnimationFrame(this.loop.bind(this));
    /**
     *
    if (this.state.gameOver) {
      this.gameOver();
      window.cancelAnimationFrame(requestId);
    } else if (this.winCondition()) {
      this.gameWon();
      window.cancelAnimationFrame(requestId);
    }
     Stops the game if it has ended
     */
  }
}

const game = new Game("game");

game.init();
