import { Flappy } from "./entities/Flappy.js";
import { CollisionManager } from "./managers/CollisionManager.js";
import { gameOver } from "./scenes/gameOver.js";
import { state } from "./state.js";
import { PolesGenerator } from "./generators/PoleGenerator.js";

class Game {
  htmlId: string
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastRender: number;
  state: any;
  entities: {
    character: Flappy;
    poles: any[]
  };
  collisionManager: CollisionManager

  constructor(htmlId: string) {

    this.htmlId = htmlId;
    this.lastRender = 0;
    this.entities = {
      character: null,
      poles: []
    };
    this.state = state;

  }
  private createCanvas(htmlTag: string): void {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 600;
    canvas.id = "mundo";
    const parent = document.getElementById(htmlTag);
    parent.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }
  /**
   * Initializes everything
   */
  init(): void {
    // generate canvas
    this.createCanvas("game");
    // generate entities
    this.entities.character = new Flappy(
      this.canvas.width / 2 - 15,
      350,
      30,
      30,
      "red",
      0.3
    );
    this.entities.poles = PolesGenerator.generate(1);
    // start collision manager 
    // this should be dependency injected but it's not
    this.collisionManager = new CollisionManager(this.canvas, this.entities.character, state.shownPoles);
    // Simple controls
    window.addEventListener("keydown", e => {
      this.handleInput(e);
    });
    // Draw the elements
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
    // check for collision
    this.collisionManager.checkCollisions();

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
  /**
   * 
   * @param timestamp The game loop
   */
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
  /**
   * Poles Logic
   */
  private removePole(): void {
    for (let i = 0; i < state.shownPoles.length; i++) {
      const pole = state.shownPoles[i];
      if (pole.x > this.canvas.width) {
        this.entities.poles.unshift(state.shownPoles.pop());
        this.entities.poles[0].reconfigure();
      }
    }
  }
  private spawnPole(): void {
    if (state.shownPoles.length === 0) {
      state.shownPoles.unshift(this.entities.poles.pop());
    }
  }

  /**
   * Score logic
   * @param flappy 
   */
  private skippedPole(flappy: Flappy): void {
    for (let i = 0; i < state.shownPoles.length; i++) {
      if (flappy.x < state.shownPoles[i].x && !state.shownPoles[i].jumped) {
        this.updateScore();
        state.shownPoles[i].jumped = true;
      }
    }
  }

  private updateScore(): void {
    state.score += 1;
  }
}

const game = new Game("game");

game.init();
