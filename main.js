import { Flappy } from "./entities/Flappy.js";

class Game {
  constructor(htmlTag) {
    this.canvas = document.getElementById(htmlTag);
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * Initializes the controls and loop
   */
  init() {}

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

const game = new Game("mundo");
game.draw();
