import { Pole } from "../entities/Pole.js";
import { Entity } from "../entities/Entity.js";

interface EntityGenerator {
  (numberOfEntities: number): Entity[];
}

export class PolesGenerator {
  generate(numOfPoles: number): Pole[] {
    let poles: Pole[] = [];
    for (let i = 0; i < numOfPoles; i++) {
      const pole = new Pole(Pole.generateHeight(), 75, "blue", 0.3);
      pole.place(0, 0);
      poles.push(pole);
    }
    return poles;
  }
}
