import { Flappy } from "../entities/Flappy.js";
import { Pole } from "../entities/Pole.js";
import { PolesGenerator } from "../generators/PoleGenerator.js";
import { CONFIG } from "../config.js";
import { state } from "../state.js";

interface GameEntities {
  character: Flappy;
  poles: Pole[];
}

export interface EntitiesManagerInterface {
  instantiateEntities(): GameEntities;
  spawnOrRemoveEntities(entities: GameEntities): void;
  removePole(poles: Pole[]): void;
  spawnPole(poles: Pole[]): void;
  skippedPole(flappy: Flappy): boolean;
}

export class EntitiesManagerFactory {
  static generateEntitiesManager() {
    return new EntitiesManager();
  }
}

class EntitiesManager implements EntitiesManagerInterface {
  instantiateEntities(): GameEntities {
    const flappy = new Flappy(
      CONFIG.entities.character.height,
      CONFIG.entities.character.width,
      CONFIG.entities.character.color,
      CONFIG.entities.character.baseSpeed
    );
    const poles = PolesGenerator.generate(CONFIG.entities.poles.num_poles);
    return { character: flappy, poles: poles };
  }
  spawnOrRemoveEntities(entities: GameEntities): void {
    this.spawnPole(entities.poles);
    this.removePole(entities.poles);
  }

  removePole(poles: Pole[]): void {
    for (let i = 0; i < state.shownPoles.length; i++) {
      const pole = state.shownPoles[i];
      if (pole.x > CONFIG.canvas.width) {
        poles.unshift(state.shownPoles.pop());
        poles[0].reconfigure();
      }
    }
  }
  spawnPole(poles: Pole[]): void {
    if (state.shownPoles.length === 0) {
      state.shownPoles.unshift(poles.pop());
    }
  }

  skippedPole(flappy: Flappy): boolean {
    for (let i = 0; i < state.shownPoles.length; i++) {
      if (flappy.x < state.shownPoles[i].x && !state.shownPoles[i].jumped) {
        state.shownPoles[i].jumped = true;

        return true;
      }
    }
    return false;
  }
}
