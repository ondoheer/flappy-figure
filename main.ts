import { Flappy } from "./entities/Flappy.js";
import { keydown } from "./controls.js";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastRender: number;
  entities: {
    character: Flappy;
    poles: any[];
  };

  constructor(htmlTag: string) {
    this.canvas = this.createCanvas(htmlTag);
    this.ctx = this.canvas.getContext("2d");
    this.lastRender = 0;
    this.entities = {
      character: new Flappy(150, 350, 30, 30, "red", 3),
      poles: []
    };
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
    // Simple controls
    window.addEventListener("keydown", e => {
      this.handleInput(e);
    });

    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }
  handleInput(e): void {
    switch (e.keyCode) {
      case 32:
        this.entities.character.jump();
        break;
      case 13:
        break;

      default:
        break;
    }
  }

  /**
   * Takes care of all the updates
   */
  private update(progress: number): void {
    this.entities.character.update();
  }

  /**
   * Draws all of the entities
   */
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.entities.character.draw(this.ctx);
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
