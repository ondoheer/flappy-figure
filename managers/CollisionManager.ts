import {  Flappy} from "../entities/Flappy.js";
import { Pole } from "../entities/Pole.js";

export class CollisionManager{

    canvas: HTMLCanvasElement;
    flappy: Flappy;
    poles: Pole[];
   
    constructor(canvas: HTMLCanvasElement, flappy:Flappy, poles: Pole[]){
        this.canvas = canvas;
        this.flappy = flappy;
        this.poles = poles;
    }
    checkCollision(){
        this.checkFloorCollision();
        this.checkPolesCollision();
    }

    private checkFloorCollision(){
            if (this.flappy.y + this.flappy.height > this.canvas.height) {
                this.flappy.die();
            }
    }

    private checkPolesCollision():void{
        
        for (let i = 0; i <this.poles.length; i++) {
            const pole = this.poles[i];
            console.log(`poleX ${pole.x}`)
            if (
                this.flappy.x <
                pole.x + pole.width
                // &&
                // flappy.x + flappy.width > pole.x &&
                // flappy.y < pole.y + pole.height &&
                // flappy.y + flappy.height > pole.y
            ) {
                console.log("hit me")
                this.flappy.die()
            }
        }
        
    }
}