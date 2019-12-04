import { CollisionManager } from "./managers/CollisionManager.js";
import { gameOver } from "./scenes/gameOver.js";
import { state } from "./state.js";
import { CONFIG } from "./config.js";
import { EntitiesManagerFactory } from "./managers/EntitiesManager.js";
class Game {
    constructor(htmlId) {
        this.htmlId = htmlId;
        this.lastRender = 0;
        this.entities = {
            character: null,
            poles: []
        };
        this.state = state;
    }
    createCanvas(htmlTag) {
        const canvas = document.createElement("canvas");
        canvas.width = CONFIG.canvas.width;
        canvas.height = CONFIG.canvas.height;
        canvas.id = CONFIG.canvas.id;
        const parent = document.getElementById(htmlTag);
        parent.appendChild(canvas);
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    /**
     * Initializes everything
     */
    init() {
        // generate canvas
        this.createCanvas("game");
        // generate entities
        this.entitiesManager = EntitiesManagerFactory.generateEntitiesManager();
        this.entities = this.entitiesManager.instantiateEntities();
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
    drawScore() {
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText(`Score: ${state.score}`, this.canvas.width - 120, 50);
    }
    handleInput(e) {
        switch (e.keyCode) {
            case 32: // space
                this.entities.character.jump();
                break;
            case 13: // enter
                break;
            default:
                break;
        }
    }
    /**
     * Takes care of all the updates
     */
    update(progress) {
        // update Character state
        this.entities.character.update(this.ctx, progress);
        // check for collision
        this.collisionManager.checkCollisions();
        // update poles positions
        for (let i = 0; i < state.shownPoles.length; i++) {
            state.shownPoles[i].update(this.ctx, progress);
        }
        // check if pole was skipped
        if (this.entitiesManager.skippedPole(this.entities.character)) {
            this.updateScore();
        }
        // manage poles
        this.entitiesManager.spawnOrRemoveEntities(this.entities);
    }
    /**
     * Draws all of the entities
     */
    draw() {
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
    loop(timestamp) {
        let progress = timestamp - this.lastRender;
        this.update(progress);
        this.draw();
        this.lastRender = timestamp;
        const requestId = window.requestAnimationFrame(this.loop.bind(this));
        if (state.lost) {
            gameOver(this.ctx, "Game Over", this.canvas.width / 2, this.canvas.height / 2);
            window.cancelAnimationFrame(requestId);
        }
    }
    updateScore() {
        state.score += 1;
    }
}
const game = new Game("game");
game.init();
//# sourceMappingURL=main.js.map