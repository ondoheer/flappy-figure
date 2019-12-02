import { Flappy } from "../entities/Flappy.js";
import { Pole } from "../entities/Pole.js";

interface GameEntities {
    character: Flappy,
    poles: Pole[]
}

interface EntitiesManagerInterface {
    instantiateEntities(): GameEntities
    spawnEntities(): void;
}

export class EntitiesManager implements EntitiesManagerInterface {
    instantiateEntities(): GameEntities {
        return
    }
    spawnEntities(): void { }
}