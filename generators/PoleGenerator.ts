import { Pole } from "../entities/Pole.js";
import { Entity } from "../entities/Entity.js";

interface EntityGenerator {
  (numberOfentities: number): Entity[];
}

export class PolesGenerator {
  generate(numOfPoles: number): Pole[] {
    let poles: Pole[] = [];
    for (let i = 0; i < numOfPoles; i++) {
      poles.push(new Pole(300, 100, "blue", 0.3));
    }
    return poles;
  }
}
