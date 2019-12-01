import { Flappy } from "./entities/Flappy.js";
import { Pole } from "./entities/Pole.js";
import { gameOver } from "./scenes/gameOver.js";
import { state } from "./state.js";
import { PolesGenerator } from "./generators/PoleGenerator.js";

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
      character: new Flappy(
        this.canvas.width / 2 - 15,
        350,
        30,
        30,
        "red",
        0.3
      ),
      poles: {
        speed: 5,
        items: new PolesGenerator().generate(1)
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

    if (this.checkCollision()) {
      this.entities.character.die();
    }
    // manage poles
    this.spawnPole();
    this.removePole();
    // update poles positions
    for (let i = 0; i < state.shownPoles.length; i++) {
      state.shownPoles[i].update(this.ctx, progress);
    }
    // check if pole was skipped
    this.skippedPole(this.entities.character);
  }

  /**
   * Draws all of the entities
   */
  private draw(): void {
    // clears the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawScore();
    this.entities.character.draw(this.ctx);
    for (let i = 0; i < state.shownPoles.length; i++) {
      state.shownPoles[i].draw(this.ctx);
    }
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
  private removePole(): void {
    for (let i = 0; i < state.shownPoles.length; i++) {
      const pole = state.shownPoles[i];
      if (pole.x > this.canvas.width) {
        this.entities.poles.items.unshift(state.shownPoles.pop());
        this.entities.poles.items[0].reconfigure();
      }
    }
  }
  private spawnPole(): void {
    if (state.shownPoles.length === 0) {
      state.shownPoles.unshift(this.entities.poles.items.pop());
    }
  }
  private updateScore(): void {
    state.score += 1;
  }

  private skippedPole(flappy: Flappy): void {
    for (let i = 0; i < state.shownPoles.length; i++) {
      if (flappy.x < state.shownPoles[i].x && !state.shownPoles[i].jumped) {
        this.updateScore();
        state.shownPoles[i].jumped = true;
      }
    }
  }
  private checkCollision(): boolean {
    const flappy = this.entities.character;
    for (let i = 0; i < this.entities.poles.items.length; i++) {
      const pole = this.entities.poles.items[i];

      if (
        flappy.x <
        pole.x + pole.width
        // &&
        // flappy.x + flappy.width > pole.x &&
        // flappy.y < pole.y + pole.height &&
        // flappy.y + flappy.height > pole.y
      ) {
        return true;
      }
    }
    return false;
  }
}

const game = new Game("game");

game.init();
