import { Flappy } from "../entities/Flappy.js";
import { Pole } from "../entities/Pole.js";

interface CollisionManagerInterface {
    checkCollisions(): void
}


export class CollisionManager implements CollisionManagerInterface {

    canvas: HTMLCanvasElement;
    flappy: Flappy;
    poles: Pole[];

    constructor(canvas: HTMLCanvasElement, flappy: Flappy, poles: Pole[]) {
        this.canvas = canvas;
        this.flappy = flappy;
        this.poles = poles;
    }
    checkCollisions(): void {
        this.checkFloorCollision();
        this.checkPolesCollision();
    }

    private checkFloorCollision(): void {

        if (this.flappy.y + this.flappy.height > this.canvas.height) {
            this.flappy.die();
        }
    }

    private checkPolesCollision(): void {

        for (let i = 0; i < this.poles.length; i++) {
            const pole = this.poles[i];

            if (
                this.flappy.x <
                pole.x + pole.width
                &&
                this.flappy.x + this.flappy.width > pole.x &&
                this.flappy.y < pole.y + pole.height &&
                this.flappy.y + this.flappy.height > pole.y
            ) {

                this.flappy.die();
            }
        }

    }
}