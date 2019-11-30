export const KEY_MAP = {
  32: "JUMP", // space
  13: "SELECT" // enter
};

export const JUMP_PRESSED = "JUMP_PRESSED";
export const SELECT_PRESSED = "SELECT_PRESSED";
export const MOUSE_CLICKED = "MOUSE_CLICKED";

/** Basic input handlers */
export function keydown(event: KeyboardEvent): string {
  return `${KEY_MAP[event.keyCode]}_PRESSED`;
}
export function keyup(event: KeyboardEvent): string {
  return `${KEY_MAP[event.keyCode]}_RELEASED`;
}

export function mouseclick(event: MouseEvent): string {
  return MOUSE_CLICKED;
}
