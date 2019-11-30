import { Flappy } from "./entities/Flappy.js";
import { Pole } from "./entities/Pole.js";
import { gameOver } from "./scenes/gameOver.js";
import { state } from "./state.js";
class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastRender: number;
  state: any;
  entities: {
    character: Flappy;
    poles: {
      speed: number;
      items: any[];
    };
  };

  constructor(htmlTag: string) {
    this.canvas = this.createCanvas(htmlTag);
    this.ctx = this.canvas.getContext("2d");
    this.lastRender = 0;
    this.entities = {
      character: new Flappy(150, 350, 30, 30, "red", 0.3),
      poles: {
        speed: 5,
        items: [new Pole(300, 100, "blue", 0.3)]
      }
    };
    this.state = state;
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
  private drawScore(): void {
    this.ctx.font = "20px serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Score: ${state.score}`, this.canvas.width - 120, 50);
  }
  private handleInput(e): void {
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
    this.entities.character.update(this.ctx, progress);
  }

  /**
   * Draws all of the entities
   */
  private draw(): void {
    // clears the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawScore();
    this.entities.character.draw(this.ctx);
    this.entities.poles.items[0].draw(this.ctx);
  }

  private loop(timestamp: number): void {
    let progress = timestamp - this.lastRender;

    this.update(progress);
    this.draw();

    this.lastRender = timestamp;
    const requestId = window.requestAnimationFrame(this.loop.bind(this));

    if (state.lost) {
      gameOver(
        this.ctx,
        "Game Over",
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      window.cancelAnimationFrame(requestId);
    }
  }
}

const game = new Game("game");

game.init();
