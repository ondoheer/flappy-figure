import { Flappy } from "./entities/Flappy.js";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(htmlTag: string) {
    this.canvas = this.createCanvas(htmlTag);

    this.ctx = this.canvas.getContext("2d");
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
  init(): void {}

  /**
   * Takes care of all the updates
   */
  update() {}

  /**
   * Draws all of the entities
   */
  draw() {
    const flappy = new Flappy(150, 350, 30, 30, "red", 0, "left");
    flappy.draw(this.ctx);
  }
}

const game = new Game("game");

game.draw();
