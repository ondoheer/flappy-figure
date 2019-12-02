export class CollisionManager {
    constructor(canvas, flappy, poles) {
        this.canvas = canvas;
        this.flappy = flappy;
        this.poles = poles;
    }
    checkCollisions() {
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
            if (this.flappy.x <
                pole.x + pole.width
                &&
                    this.flappy.x + this.flappy.width > pole.x &&
                this.flappy.y < pole.y + pole.height &&
                this.flappy.y + this.flappy.height > pole.y) {
                this.flappy.die();
            }
        }
    }
}
//# sourceMappingURL=CollisionManager.js.map