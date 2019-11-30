export const KEY_MAP = {
    32: "JUMP",
    13: "SELECT" // enter
};
export const JUMP_PRESSED = "JUMP_PRESSED";
export const SELECT_PRESSED = "SELECT_PRESSED";
export const MOUSE_CLICKED = "MOUSE_CLICKED";
/** Basic input handlers */
export function keydown(event) {
    return `${KEY_MAP[event.keyCode]}_PRESSED`;
}
export function keyup(event) {
    return `${KEY_MAP[event.keyCode]}_RELEASED`;
}
export function mouseclick(event) {
    return MOUSE_CLICKED;
}
//# sourceMappingURL=controls.js.map