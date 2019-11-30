import { Pole } from "../entities/Pole.js";
export class PolesGenerator {
    generate(numOfPoles) {
        let poles = [];
        for (let i = 0; i < numOfPoles; i++) {
            poles.push(new Pole(300, 100, "blue", 0.3));
        }
        return poles;
    }
}
//# sourceMappingURL=PoleGenerator.js.map