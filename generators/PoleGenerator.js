import { Pole } from "../entities/Pole.js";
export class PolesGenerator {
    generate(numOfPoles) {
        let poles = [];
        for (let i = 0; i < numOfPoles; i++) {
            const pole = new Pole(Pole.generateHeight(), 75, "blue", 0.3);
            pole.place(0, 0);
            poles.push(pole);
        }
        return poles;
    }
}
//# sourceMappingURL=PoleGenerator.js.map