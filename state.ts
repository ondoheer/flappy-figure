import { Pole } from "./entities/Pole.js";

interface State {
  score: number;

  lost: boolean;
  shownPoles: Pole[];
}

export const state: State = {
  score: 0,

  lost: false,
  shownPoles: []
};
