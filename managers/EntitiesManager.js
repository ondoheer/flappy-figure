import { Flappy } from "../entities/Flappy.js";
import { PolesGenerator } from "../generators/PoleGenerator.js";
import { CONFIG } from "../config.js";
import { state } from "../state.js";
export class EntitiesManagerFactory {
    static generateEntitiesManager() {
        return new EntitiesManager();
    }
}
class PolesManager {
    removePole(poles) {
        for (let i = 0; i < state.shownPoles.length; i++) {
            const pole = state.shownPoles[i];
            if (pole.x > CONFIG.canvas.width) {
                poles.unshift(state.shownPoles.pop());
                poles[0].reconfigure();
            }
        }
    }
    spawnPole(poles) {
        if (state.shownPoles.length === 0) {
            state.shownPoles.unshift(poles.pop());
        }
    }
    skippedPole(flappy) {
        for (let i = 0; i < state.shownPoles.length; i++) {
            if (flappy.x < state.shownPoles[i].x && !state.shownPoles[i].jumped) {
                state.shownPoles[i].jumped = true;
                return true;
            }
        }
        return false;
    }
}
class EntitiesManager extends PolesManager {
    instantiateEntities() {
        const flappy = new Flappy(CONFIG.entities.character.height, CONFIG.entities.character.width, CONFIG.entities.character.color, CONFIG.entities.character.baseSpeed);
        const poles = PolesGenerator.generate(CONFIG.entities.poles.num_poles);
        return { character: flappy, poles: poles };
    }
    spawnOrRemoveEntities(entities) {
        this.spawnPole(entities.poles);
        this.removePole(entities.poles);
    }
}
//# sourceMappingURL=EntitiesManager.js.map