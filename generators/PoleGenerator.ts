import { Pole } from "../entities/Pole.js";
import { Entity } from "../entities/Entity.js";

interface EntityGenerator {
  (numberOfentities: number): Entity[];
}

export const PolesGenerator: EntityGenerator = (numOfEntities: number) => {
  let poles: Pole[] = [];
  for (let i = 0; i < numOfEntities; i++) {
    poles.push(new Pole(300, 100, "blue", 0.3));
  }
  return poles;
};
