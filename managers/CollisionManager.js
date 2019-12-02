export class CollisionManager {
    constructor(canvas, flappy, poles) {
        this.canvas = canvas;
        this.flappy = flappy;
        this.poles = poles;
    }
    checkCollision() {
        this.checkFloorCollision();
        this.checkPolesCollision();
    }
    checkFloorCollision() {
        if (this.flappy.y + this.flappy.height > this.canvas.height) {
            this.flappy.die();
        }
    }
    checkPolesCollision() {
        for (let i = 0; i < this.poles.length; i++) {
            const pole = this.poles[i];
            console.log(`poleX ${pole.x}`);
            if (this.flappy.x <
                pole.x + pole.width
            // &&
            // flappy.x + flappy.width > pole.x &&
            // flappy.y < pole.y + pole.height &&
            // flappy.y + flappy.height > pole.y
            ) {
                console.log("hit me");
                this.flappy.die();
            }
        }
    }
}
//# sourceMappingURL=CollisionManager.js.map